import { zodToJsonSchema, type JsonSchema7Type } from "zod-to-json-schema";
import { z, type ZodType } from "zod";

export interface Ref {
  '$ref': string;
}

export type Schema = Ref | { 'oneOf': Ref[] } | JsonSchema7Type;

export interface Schemas {
  [key: string]: Schema // key = schema name
}

const Error = z.object({
  message: z.string(),
  errors: z.optional(z.array(z.object({
    path: z.optional(z.string()),
    message: z.string()
  })))
});

export function schemaRef(schemaName: string): Ref {
  return { '$ref': `#/components/schemas/${schemaName}` }
}
export function jsonSchema(zodSchema: ZodType): JsonSchema7Type {
  return zodToJsonSchema(zodSchema, 'schema')?.definitions?.schema || {};
}

export function jsonSchemas(zodSchemas: { [key: string]: ZodType }): Schemas {
  return Object.fromEntries(
    Object.entries(zodSchemas).map(([key, schema]) => [key, jsonSchema(schema)])
  )
}

export function errorSchema(): Schema {
  return jsonSchema(Error);
}