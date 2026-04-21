import { randomUUID, createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type {
  CreateIdeaBody,
  PatchIdeaBody,
  PatchPreferencesBody,
} from "./schemas.js";

export type Idea = {
  id: string;
  title: string;
  summary?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type SessionPreferences = {
  defaultTags: string[];
  summarizeTitles: boolean;
};

/** Returned when the same Idempotency-Key is reused with a different body. */
export type IdempotencyMismatch = { readonly kind: "idempotency_mismatch" };

export type CreateIdeaResult = Idea | IdempotencyMismatch;

export function isIdempotencyMismatch(
  r: CreateIdeaResult,
): r is IdempotencyMismatch {
  return typeof r === "object" && r !== null && "kind" in r && r.kind === "idempotency_mismatch";
}

/** Stable fingerprint for idempotency (same logical body => same string). */
export function createBodyFingerprint(body: CreateIdeaBody): string {
  const normalized = {
    title: body.title.trim(),
    summary: body.summary?.trim() ?? null,
    tags: [...(body.tags ?? [])].map((t) => t.trim()).sort(),
  };
  return createHash("sha256")
    .update(JSON.stringify(normalized), "utf8")
    .digest("hex");
}

export interface IdeasStore {
  createIdea(
    body: CreateIdeaBody,
    sessionId: string,
    idempotencyKey?: string,
  ): CreateIdeaResult;
  listIdeasPage(
    tag: string | undefined,
    limit: number,
    cursor: string | undefined,
  ): { ideas: Idea[]; nextCursor?: string } | null;
  getIdea(id: string): Idea | undefined;
  updateIdea(
    id: string,
    body: PatchIdeaBody,
    sessionId: string,
  ): Idea | undefined;
  deleteIdea(id: string): boolean;
  patchSessionPreferences(
    sessionId: string,
    body: PatchPreferencesBody,
  ): SessionPreferences;
}

type IdempotencyEntry = { ideaId: string; fingerprint: string };

type CursorPayload = { t: string; i: string };

function defaultPrefs(): SessionPreferences {
  return { defaultTags: [], summarizeTitles: false };
}

function normalizeTitle(title: string, summarize: boolean): string {
  const t = title.trim().replace(/\s+/g, " ");
  if (!summarize) return t;
  if (t.length <= 80) return t;
  return `${t.slice(0, 77)}...`;
}

function encodeIdeaCursor(idea: Idea): string {
  const payload: CursorPayload = { t: idea.createdAt, i: idea.id };
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodeIdeaCursor(cursor: string): CursorPayload | null {
  try {
    const raw = Buffer.from(cursor, "base64url").toString("utf8");
    const p = JSON.parse(raw) as unknown;
    if (
      !p ||
      typeof p !== "object" ||
      typeof (p as CursorPayload).t !== "string" ||
      typeof (p as CursorPayload).i !== "string"
    ) {
      return null;
    }
    return p as CursorPayload;
  } catch {
    return null;
  }
}

function compareIdeasDesc(a: Idea, b: Idea): number {
  const byTime = b.createdAt.localeCompare(a.createdAt);
  if (byTime !== 0) return byTime;
  return b.id.localeCompare(a.id);
}

export class InMemoryIdeasStore implements IdeasStore {
  private readonly ideas = new Map<string, Idea>();
  private readonly idempotency = new Map<string, IdempotencyEntry>();
  private readonly sessions = new Map<string, SessionPreferences>();

  private getOrCreateSession(sessionId: string): SessionPreferences {
    let p = this.sessions.get(sessionId);
    if (!p) {
      p = defaultPrefs();
      this.sessions.set(sessionId, p);
    }
    return p;
  }

  private stripIdempotencyForIdea(ideaId: string): void {
    for (const [key, entry] of this.idempotency) {
      if (entry.ideaId === ideaId) {
        this.idempotency.delete(key);
      }
    }
  }

  private sortedFilteredIdeas(tag?: string): Idea[] {
    const all = [...this.ideas.values()].sort(compareIdeasDesc);
    if (!tag) return all;
    const t = tag.toLowerCase();
    return all.filter((i) => i.tags.some((x) => x.toLowerCase() === t));
  }

  createIdea(
    body: CreateIdeaBody,
    sessionId: string,
    idempotencyKey?: string,
  ): CreateIdeaResult {
    const fp = createBodyFingerprint(body);
    if (idempotencyKey) {
      const existing = this.idempotency.get(idempotencyKey);
      if (existing) {
        if (existing.fingerprint !== fp) {
          return { kind: "idempotency_mismatch" };
        }
        const idea = this.ideas.get(existing.ideaId);
        if (idea) return idea;
        this.idempotency.delete(idempotencyKey);
      }
    }
    const prefs = this.getOrCreateSession(sessionId);
    const tagSet = new Set([...prefs.defaultTags, ...(body.tags ?? [])]);
    const now = new Date().toISOString();
    const idea: Idea = {
      id: randomUUID(),
      title: normalizeTitle(body.title, prefs.summarizeTitles),
      summary: body.summary?.trim() || undefined,
      tags: [...tagSet],
      createdAt: now,
      updatedAt: now,
    };
    this.ideas.set(idea.id, idea);
    if (idempotencyKey) {
      this.idempotency.set(idempotencyKey, { ideaId: idea.id, fingerprint: fp });
    }
    return idea;
  }

  listIdeasPage(
    tag: string | undefined,
    limit: number,
    cursor: string | undefined,
  ): { ideas: Idea[]; nextCursor?: string } | null {
    const list = this.sortedFilteredIdeas(tag);
    let start = 0;
    if (cursor !== undefined && cursor.length > 0) {
      const decoded = decodeIdeaCursor(cursor);
      if (!decoded) return null;
      const idx = list.findIndex(
        (x) => x.createdAt === decoded.t && x.id === decoded.i,
      );
      if (idx === -1) return null;
      start = idx + 1;
    }
    const page = list.slice(start, start + limit);
    const nextCursor =
      start + limit < list.length && page.length > 0
        ? encodeIdeaCursor(page[page.length - 1]!)
        : undefined;
    return { ideas: page, nextCursor };
  }

  getIdea(id: string): Idea | undefined {
    return this.ideas.get(id);
  }

  updateIdea(
    id: string,
    body: PatchIdeaBody,
    sessionId: string,
  ): Idea | undefined {
    const existing = this.ideas.get(id);
    if (!existing) return undefined;
    const prefs = this.getOrCreateSession(sessionId);
    const next: Idea = { ...existing };
    if (body.title !== undefined) {
      next.title = normalizeTitle(body.title, prefs.summarizeTitles);
    }
    if (body.summary !== undefined) {
      const s = body.summary.trim();
      next.summary = s.length ? s : undefined;
    }
    if (body.tags !== undefined) {
      const tagSet = new Set([...prefs.defaultTags, ...body.tags]);
      next.tags = [...tagSet];
    }
    next.updatedAt = new Date().toISOString();
    this.ideas.set(id, next);
    return next;
  }

  deleteIdea(id: string): boolean {
    if (!this.ideas.has(id)) return false;
    this.ideas.delete(id);
    this.stripIdempotencyForIdea(id);
    return true;
  }

  patchSessionPreferences(
    sessionId: string,
    body: PatchPreferencesBody,
  ): SessionPreferences {
    const p = { ...this.getOrCreateSession(sessionId) };
    if (body.defaultTags !== undefined) {
      p.defaultTags = [...body.defaultTags];
    }
    if (body.summarizeTitles !== undefined) {
      p.summarizeTitles = body.summarizeTitles;
    }
    this.sessions.set(sessionId, p);
    return p;
  }

  /** Test / file-store hydration */
  toSnapshot(): PersistedSnapshot {
    return {
      ideas: [...this.ideas.entries()],
      idempotency: [...this.idempotency.entries()],
      sessions: [...this.sessions.entries()],
    };
  }

  static fromSnapshot(data: PersistedSnapshot): InMemoryIdeasStore {
    const s = new InMemoryIdeasStore();
    for (const [k, v] of data.ideas) s.ideas.set(k, v);
    for (const [k, v] of data.idempotency) s.idempotency.set(k, v);
    for (const [k, v] of data.sessions) s.sessions.set(k, v);
    return s;
  }
}

type PersistedSnapshot = {
  ideas: [string, Idea][];
  idempotency: [string, IdempotencyEntry][];
  sessions: [string, SessionPreferences][];
};

/**
 * Demo persistence: JSON file, read-merge-write on each mutation. Not for high concurrency.
 */
export class FileIdeasStore implements IdeasStore {
  private inner: InMemoryIdeasStore;
  constructor(private readonly filePath: string) {
    this.inner = this.load();
  }

  private load(): InMemoryIdeasStore {
    try {
      const raw = readFileSync(this.filePath, "utf8");
      const parsed = JSON.parse(raw) as PersistedSnapshot;
      if (!parsed.ideas || !parsed.idempotency || !parsed.sessions) {
        return new InMemoryIdeasStore();
      }
      return InMemoryIdeasStore.fromSnapshot(parsed);
    } catch {
      return new InMemoryIdeasStore();
    }
  }

  private persist(): void {
    const snap = this.inner.toSnapshot();
    mkdirSync(dirname(this.filePath), { recursive: true });
    writeFileSync(this.filePath, JSON.stringify(snap, null, 0), "utf8");
  }

  createIdea(
    body: CreateIdeaBody,
    sessionId: string,
    idempotencyKey?: string,
  ): CreateIdeaResult {
    const r = this.inner.createIdea(body, sessionId, idempotencyKey);
    if (!isIdempotencyMismatch(r)) {
      this.persist();
    }
    return r;
  }

  listIdeasPage(
    tag: string | undefined,
    limit: number,
    cursor: string | undefined,
  ): { ideas: Idea[]; nextCursor?: string } | null {
    return this.inner.listIdeasPage(tag, limit, cursor);
  }

  getIdea(id: string): Idea | undefined {
    return this.inner.getIdea(id);
  }

  updateIdea(
    id: string,
    body: PatchIdeaBody,
    sessionId: string,
  ): Idea | undefined {
    const r = this.inner.updateIdea(id, body, sessionId);
    if (r !== undefined) this.persist();
    return r;
  }

  deleteIdea(id: string): boolean {
    const r = this.inner.deleteIdea(id);
    if (r) this.persist();
    return r;
  }

  patchSessionPreferences(
    sessionId: string,
    body: PatchPreferencesBody,
  ): SessionPreferences {
    const r = this.inner.patchSessionPreferences(sessionId, body);
    this.persist();
    return r;
  }
}
