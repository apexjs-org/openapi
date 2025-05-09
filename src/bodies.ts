import { type Schema, type SchemaRef } from "./schemas.js";

export interface Content {
  [key: string]: { schema: Schema | SchemaRef }; // key = media type
}

export interface RequestBody {
  description?: string;
  required?: boolean;
  content: Content;
}

export function jsonContent(schema: Schema | SchemaRef): Content {
  return {
    'application/json': { schema }
  }
}

export function jsonBody(schema: Schema | SchemaRef, required: boolean = true): RequestBody {
  return {
    required,
    content: jsonContent(schema)
  }
}