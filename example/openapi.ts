import { type OpenApi, bearerScheme, errorResponses, searchParameters, jsonSchemas, errorSchema } from "@apexjs-org/openapi";
import * as schemas from "./schemas.js";
import { userPaths } from "./paths.js";

export const openapi: OpenApi = {
  openapi: '3.1.0',
  info: {
    title: 'API title',
    version: '1.0.0'
  },
  // security: [
  //   { BearerAuth: [] } // Specifies that all paths should use the BearerAuth security scheme, see components.securitySchemes. Specifying security at the path method level is possible as well (to disable global security on path level, use: security: [])
  // ],
  paths: userPaths,
  components: {
    schemas: {
      Error: errorSchema(), // Specifies the Error schema for the error responses, same schema as express-openapi-validator errors
      ...jsonSchemas(schemas) // Converts Zod schemas to JSON schemas
    },
    parameters: searchParameters(), // Specifies the q, sort and offset parameters so that they can be referenced
    securitySchemes: {
      BearerAuth: bearerScheme() // Specifies a bearer security scheme. openIdScheme() and oauth2Scheme() are possible as well
    },
    responses: errorResponses()
  }
}

// console.dir(openapi, { depth: null })