import { API_VERSION, SERVICE_NAME } from "./version.js";

const ideaSchema = {
  type: "object",
  required: ["id", "title", "tags", "createdAt", "updatedAt"],
  properties: {
    id: { type: "string", format: "uuid" },
    title: { type: "string" },
    summary: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
} as const;

const errorSchema = {
  type: "object",
  required: ["error", "message", "requestId"],
  properties: {
    error: { type: "string" },
    message: { type: "string" },
    requestId: { type: "string" },
    details: { type: "object" },
    retryAfterMs: { type: "integer" },
  },
} as const;

/** OpenAPI 3.0 document for the Ideas HTTP API (served at GET /v1/openapi.json). */
export function openApiDocument(): Record<string, unknown> {
  return {
    openapi: "3.0.3",
    info: {
      title: `${SERVICE_NAME} HTTP API`,
      version: API_VERSION,
      description:
        "Reference Ideas API (mstack repo): validation, rate limits, idempotency (replay; 409 on key+body mismatch), session preferences. Optional file store via IDEAS_STORE_PATH. Source: `src/openapi.ts`.",
    },
    paths: {
      "/health": {
        get: {
          summary: "Liveness",
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["ok", "requestId"],
                    properties: {
                      ok: { type: "boolean" },
                      requestId: { type: "string" },
                    },
                  },
                },
              },
            },
            "429": {
              description: "Rate limited (applies to all routes per client key)",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
          },
        },
      },
      "/v1/openapi.json": {
        get: {
          summary: "OpenAPI document for this API",
          responses: {
            "200": {
              description: "OpenAPI 3.0 JSON",
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
            },
          },
        },
      },
      "/v1/meta": {
        get: {
          summary: "Service metadata",
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: [
                      "product",
                      "service",
                      "apiVersion",
                      "node",
                      "requestId",
                    ],
                    properties: {
                      product: { type: "string" },
                      service: { type: "string" },
                      apiVersion: { type: "string" },
                      node: { type: "string" },
                      requestId: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/v1/ideas": {
        get: {
          summary: "List ideas (cursor pagination)",
          parameters: [
            {
              name: "tag",
              in: "query",
              required: false,
              schema: { type: "string" },
              description: "Filter by tag (case-insensitive)",
            },
            {
              name: "limit",
              in: "query",
              required: false,
              schema: { type: "integer", minimum: 1, maximum: 100, default: 50 },
              description: "Page size (default 50, max 100)",
            },
            {
              name: "cursor",
              in: "query",
              required: false,
              schema: { type: "string" },
              description:
                "Opaque cursor from `nextCursor` of the previous response",
            },
          ],
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["ideas", "requestId"],
                    properties: {
                      ideas: { type: "array", items: ideaSchema },
                      requestId: { type: "string" },
                      nextCursor: { type: "string" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid limit or cursor",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
          },
        },
        post: {
          summary: "Create idea",
          parameters: [
            {
              name: "X-Session-ID",
              in: "header",
              required: false,
              schema: { type: "string" },
            },
            {
              name: "Idempotency-Key",
              in: "header",
              required: false,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title"],
                  properties: {
                    title: { type: "string", minLength: 1, maxLength: 200 },
                    summary: { type: "string", maxLength: 5000 },
                    tags: {
                      type: "array",
                      maxItems: 20,
                      items: { type: "string", minLength: 1, maxLength: 50 },
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["idea", "requestId"],
                    properties: {
                      idea: ideaSchema,
                      requestId: { type: "string" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid JSON",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
            "422": {
              description: "Validation error",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
            "409": {
              description:
                "Idempotency-Key reused with a different request body",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
          },
        },
      },
      "/v1/ideas/{id}": {
        get: {
          summary: "Get one idea",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["idea", "requestId"],
                    properties: {
                      idea: ideaSchema,
                      requestId: { type: "string" },
                    },
                  },
                },
              },
            },
            "404": {
              description: "Not found",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
          },
        },
        patch: {
          summary: "Partial update",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
            {
              name: "X-Session-ID",
              in: "header",
              required: false,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", minLength: 1, maxLength: 200 },
                    summary: { type: "string", maxLength: 5000 },
                    tags: {
                      type: "array",
                      maxItems: 20,
                      items: { type: "string", minLength: 1, maxLength: 50 },
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["idea", "requestId"],
                    properties: {
                      idea: ideaSchema,
                      requestId: { type: "string" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid JSON",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
            "404": {
              description: "Not found",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
            "422": {
              description: "Validation error",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
          },
        },
        delete: {
          summary: "Delete idea",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "204": { description: "No content" },
            "404": {
              description: "Not found",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
          },
        },
      },
      "/v1/session/preferences": {
        patch: {
          summary: "Update session preferences",
          parameters: [
            {
              name: "X-Session-ID",
              in: "header",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    defaultTags: {
                      type: "array",
                      maxItems: 20,
                      items: { type: "string", minLength: 1, maxLength: 50 },
                    },
                    summarizeTitles: { type: "boolean" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["preferences", "requestId"],
                    properties: {
                      preferences: {
                        type: "object",
                        required: ["defaultTags", "summarizeTitles"],
                        properties: {
                          defaultTags: {
                            type: "array",
                            items: { type: "string" },
                          },
                          summarizeTitles: { type: "boolean" },
                        },
                      },
                      requestId: { type: "string" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Missing session or invalid JSON",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
            "422": {
              description: "Validation error",
              content: {
                "application/json": { schema: errorSchema },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Idea: ideaSchema,
        ApiError: errorSchema,
      },
    },
  };
}
