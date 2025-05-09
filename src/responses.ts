import { jsonContent, type Content } from "./bodies.js"
import { type Ref, type Schema, type SchemaRef, schemaRef } from "./schemas.js"

export interface Response {
  description: string;
  content: Content;
}

export interface Responses {
  [key: string]: Response // key = response name
}

export interface PathResponses {
  [key: string]: Ref | Response // key = status code
}

const errorContent: Content = jsonContent(schemaRef('Error'));

const BadRequest: Response = {
  description: 'bad request', // 400
  content: errorContent
}

const Unauthorized: Response = {
  description: 'unauthorized', // 401
  content: errorContent
}

const Forbidden: Response = {
  description: 'forbidden', // 403
  content: errorContent
}

const NotFound: Response = {
  description: 'not found', // 404
  content: errorContent
}

const TooManyRequests: Response = {
  description: 'too many requests', // 429
  content: errorContent
}

export function jsonResponse(schema?: Schema | SchemaRef, description: string = 'ok'): Response {
  return {
    description,
    content: jsonContent(schema ? schema : {})
  }
}

export function errorResponses(): Responses {
  return {
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    TooManyRequests
  }
}

export function errorResponseRefs(): PathResponses {
  return {
    '400': { '$ref': '#/components/responses/BadRequest' },
    '401': { '$ref': '#/components/responses/Unauthorized' },
    '403': { '$ref': '#/components/responses/Forbidden' },
    '404': { '$ref': '#/components/responses/NotFound' },
    '429': { '$ref': '#/components/responses/TooManyRequests' }
  }
}