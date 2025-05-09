import { zodToJsonSchema, type JsonSchema7Type } from "zod-to-json-schema";
import { z, type ZodType } from "zod";

export interface Ref {
  '$ref': string;
}

export type SchemaRef = Ref | { 'oneOf': Ref[] };
export type Schema = JsonSchema7Type;

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

export function jsonSchema(schema: ZodType | JsonSchema7Type): Schema {
  return schema instanceof z.ZodType ?
    (zodToJsonSchema(schema, 'schema')?.definitions?.schema || {}) :
    schema;
}

export function jsonSchemas(schemas: { [key: string]: ZodType | JsonSchema7Type }): Schemas {
  return Object.fromEntries(
    Object.entries(schemas).map(([key, schema]) => [key, jsonSchema(schema)])
  )
}

export function errorSchema(): Schema {
  return jsonSchema(Error);
}