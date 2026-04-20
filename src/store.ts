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
  const all = [...ideas.values()].sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt),
  );
  if (!tag) return all;
  const t = tag.toLowerCase();
  return all.filter((i) => i.tags.some((x) => x.toLowerCase() === t));
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
