import { type Schemas } from "./schemas.js";
import { type Responses, type PathResponses } from "./responses.js";
import { type Parameters, type PathParameters } from "./parameters.js";
import { type RequestBody } from "./bodies.js";
import { type SecuritySchemes } from "./securitySchemes.js";

export { jsonBody, jsonContent, type RequestBody } from "./bodies.js";
export { idParameters, searchParameterRefs, searchParameters, type Parameter } from "./parameters.js";
export { jsonResponse, errorResponseRefs, errorResponses, type Response } from "./responses.js";
export { schemaRef, jsonSchema, jsonSchemas, errorSchema, type Schema, type Ref } from "./schemas.js";
export { bearerScheme, openIdScheme, oauth2Scheme, type SecurityScheme } from "./securitySchemes.js";

export interface Info {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: { name?: string; url?: string; email?: string };
  license?: { name: string; url?: string };
}

export interface Server {
  url: string;
  description?: string;
}

export interface Tag {
  name: string;
  description?: string;
  externalDocs?: {
    url: string;
    description?: string;
  };
}

export interface Security {
  [key: string]: string[]  // key = security scheme name
}

export interface Path {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId: string;
  parameters?: PathParameters;
  requestBody?: RequestBody;
  responses: PathResponses;
  externalDocs?: {
    description: string;
    url: string;
  };
  security?: Security[]; // when security = [] then no security is required, otherwise global security is applied
}

export interface Paths {
  [key: string]: { [key: string]: Path | undefined } // key = path name, key = method
}

export interface OpenApi {
  openapi: '3.1.0' | '3.1.1';
  info: Info;
  servers?: Server[];
  tags?: Tag[];
  security?: Security[];
  paths: Paths;
  components?: {
    schemas?: Schemas;
    responses?: Responses; // key = response name
    parameters?: Parameters;
    securitySchemes?: SecuritySchemes
  }
}