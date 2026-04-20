import { z } from "zod";

export const createIdeaBodySchema = z.object({
  title: z.string().min(1).max(200).trim(),
  summary: z.string().max(5000).optional(),
  tags: z.array(z.string().min(1).max(50)).max(20).optional().default([]),
});

export type CreateIdeaBody = z.infer<typeof createIdeaBodySchema>;

export const patchPreferencesSchema = z.object({
  defaultTags: z.array(z.string().min(1).max(50)).max(20).optional(),
  summarizeTitles: z.boolean().optional(),
});

export type PatchPreferencesBody = z.infer<typeof patchPreferencesSchema>;
