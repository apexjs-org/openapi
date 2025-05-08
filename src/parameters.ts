import { z } from "zod";
import { jsonSchema, type Schema, type Ref } from "./schemas.js"

export interface Parameter {
  name: string;
  in?: 'query' | 'path' | 'header' | 'cookie';
  description?: string;
  required?: boolean;
  schema: Schema
}

export interface Parameters {
  [key: string]: Parameter // key = parameter name
}

export type PathParameters = (Ref | Parameter)[];

const id: Parameter = {
  name: 'id',
  in: 'path',
  required: true,
  schema: jsonSchema(z.string().regex(/^[a-zA-Z0-9-_]+$/).max(250))
}

const queryParam: Parameter = {
  name: 'q',
  in: 'query',
  description: 'Parameter to search list results.',
  required: false,
  schema: jsonSchema(z.string().max(250))
}

const sortParam: Parameter = {
  name: 'sort',
  in: 'query',
  description: 'Parameter to sort list results.',
  required: false,
  schema: jsonSchema(z.string().max(250))
}

const offsetParam: Parameter = {
  name: 'offset',
  in: 'query',
  description: 'Parameter to skip list results.',
  required: false,
  schema: jsonSchema(z.number().default(0))
}

export function idParameters(parameterNames: string[]): PathParameters {
  return parameterNames.map(name => ({
    ...id, name
  }))
}

export function searchParameters(): Parameters {
  return {
    queryParam,
    sortParam,
    offsetParam
  }
}

export function searchParameterRefs(): PathParameters {
  return [
    { '$ref': '#/components/parameters/queryParam' },
    { '$ref': '#/components/parameters/sortParam' },
    { '$ref': '#/components/parameters/offsetParam' }
  ];
}