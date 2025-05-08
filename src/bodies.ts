import { type Schema } from "./schemas.js";

export interface Content {
  [key: string]: { schema: Schema }; // key = media type
}

export interface RequestBody {
  description?: string;
  required?: boolean;
  content: Content;
}

export function jsonContent(schema: Schema): Content {
  return {
    'application/json': { schema }
  }
}

export function jsonBody(schema: Schema, required: boolean = true): RequestBody {
  return {
    required,
    content: jsonContent(schema)
  }
}