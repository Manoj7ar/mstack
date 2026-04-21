import { randomUUID } from "node:crypto";
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

const ideas = new Map<string, Idea>();
const idempotency = new Map<string, Idea>();
const sessions = new Map<string, SessionPreferences>();

function defaultPrefs(): SessionPreferences {
  return { defaultTags: [], summarizeTitles: false };
}

export function getOrCreateSession(sessionId: string): SessionPreferences {
  let p = sessions.get(sessionId);
  if (!p) {
    p = defaultPrefs();
    sessions.set(sessionId, p);
  }
  return p;
}

export function patchSessionPreferences(
  sessionId: string,
  body: PatchPreferencesBody,
): SessionPreferences {
  const p = { ...getOrCreateSession(sessionId) };
  if (body.defaultTags !== undefined) {
    p.defaultTags = [...body.defaultTags];
  }
  if (body.summarizeTitles !== undefined) {
    p.summarizeTitles = body.summarizeTitles;
  }
  sessions.set(sessionId, p);
  return p;
}

function normalizeTitle(title: string, summarize: boolean): string {
  const t = title.trim().replace(/\s+/g, " ");
  if (!summarize) return t;
  if (t.length <= 80) return t;
  return `${t.slice(0, 77)}...`;
}

function stripIdempotencyForIdea(ideaId: string): void {
  for (const [key, idea] of idempotency) {
    if (idea.id === ideaId) {
      idempotency.delete(key);
    }
  }
}

function compareIdeasDesc(a: Idea, b: Idea): number {
  const byTime = b.createdAt.localeCompare(a.createdAt);
  if (byTime !== 0) return byTime;
  return b.id.localeCompare(a.id);
}

function sortedFilteredIdeas(tag?: string): Idea[] {
  const all = [...ideas.values()].sort(compareIdeasDesc);
  if (!tag) return all;
  const t = tag.toLowerCase();
  return all.filter((i) => i.tags.some((x) => x.toLowerCase() === t));
}

type CursorPayload = { t: string; i: string };

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

export function createIdea(
  body: CreateIdeaBody,
  sessionId: string,
  idempotencyKey?: string,
): Idea {
  if (idempotencyKey) {
    const existing = idempotency.get(idempotencyKey);
    if (existing) return existing;
  }
  const prefs = getOrCreateSession(sessionId);
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
  ideas.set(idea.id, idea);
  if (idempotencyKey) {
    idempotency.set(idempotencyKey, idea);
  }
  return idea;
}

export function listIdeas(tag?: string): Idea[] {
  return sortedFilteredIdeas(tag);
}

export function listIdeasPage(
  tag: string | undefined,
  limit: number,
  cursor: string | undefined,
): { ideas: Idea[]; nextCursor?: string } | null {
  const list = sortedFilteredIdeas(tag);
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

export function getIdea(id: string): Idea | undefined {
  return ideas.get(id);
}

export function updateIdea(
  id: string,
  body: PatchIdeaBody,
  sessionId: string,
): Idea | undefined {
  const existing = ideas.get(id);
  if (!existing) return undefined;
  const prefs = getOrCreateSession(sessionId);
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
  ideas.set(id, next);
  return next;
}

export function deleteIdea(id: string): boolean {
  if (!ideas.has(id)) return false;
  ideas.delete(id);
  stripIdempotencyForIdea(id);
  return true;
}
