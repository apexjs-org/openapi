# Easily create type-safe OpenAPI descriptions

@apexjs-org/openapi is an OpenAPI 3.1+ description library for TypeScript with Zod schema support. Use this package to easily create a type-safe OpenAPI (Swagger) description. Use express-openapi-validator to bring your OpenAPI description to life with automatic validation and request handling.

More info:
- [Swagger OpenAPI guide](https://swagger.io/docs/specification/v3_0/about/)
- [express-openapi-validator](https://www.npmjs.com/package/express-openapi-validator)


## Installation

```sh
npm install @apexjs-org/openapi
```

## Example

Define your API response and request schemas as [Zod schemas](https://www.npmjs.com/package/zod) schemas or [JSON schemas](https://json-schema.org/):
```ts
// schemas.ts
import { z } from "zod";

export const User = z.object({
  id: z.string().regex(/^[a-zA-Z0-9-_]+$/).min(10).max(200),
  email: z.string().email().min(5).max(200),
  name: z.string().regex(/^[a-zA-Z0-9-_ ]+$/).min(2).max(200),
  createdAt: z.optional(z.date()),
});

export const UserList = z.object({
  results: z.array(User),
  totalCount: z.number()
});

export const UserCreate = User.omit({ id: true, createdAt: true });

export const UserUpdate = User.pick({ name: true }).partial();
```

Define your API paths as specified in the OpenAPI 3.1 specification with shorthands:

```ts
// paths.ts
import { type Paths, searchParameterRefs, jsonResponse, errorResponseRefs, jsonBody, idParameters, schemaRef } from "@apexjs-org/openapi";

const paths: Paths = {}

// Methods for the /users path
paths['/users'] = {
  get: {
    operationId: 'listUsers', // Name of the function that this request should trigger
    summary: 'Finds users.',
    parameters: [...searchParameterRefs()], // References the q, sort and offset parameters (included in the components.parameters, see index.ts below)
    responses: {
      ...errorResponseRefs(), // References the BadRequest, Unauthorized, Forbidden, NotFound and TooManyRequests errors (included in the components.responses, see index.ts below)
      '200': jsonResponse(schemaRef('UserList')) // JSON response with a reference to a custom schema (included in the components.schemas, see index.ts below)
    }
  },
  post: {
    operationId: 'createUser',
    summary: 'Creates a new user.',
    requestBody: jsonBody(schemaRef('UserCreate')), // JSON body with a reference to a custom schema (included in the components.schemas, see index.ts below)
    responses: {
      ...errorResponseRefs(),
      '201': jsonResponse(schemaRef('User'), 'created')
    }
  }
};

// Methods for the /users/{userId} path
paths['/users/{userId}'] = {
  get: {
    operationId: 'getUser',
    summary: 'Gets a user by id.',
    parameters: [...idParameters(['userId'])], // Specifies the userId parameter in this path
    responses: {
      ...errorResponseRefs(),
      '200': jsonResponse(schemaRef('User'))
    }
  },
  patch: {
    operationId: 'updateUser',
    summary: 'Updates a user by id.',
    parameters: [...idParameters(['userId'])],
    requestBody: jsonBody(schemaRef('UserUpdate')),
    responses: {
      ...errorResponseRefs(),
      '200': jsonResponse(schemaRef('User'))
    }
  },
  delete: {
    operationId: 'deleteUser',
    summary: 'Deletes a user by id.',
    parameters: [...idParameters(['userId'])],
    responses: {
      ...errorResponseRefs(),
      '200': jsonResponse() // JSON response without a schema (reference)
    }
  }
};

export const userPaths = paths;
```

Define your API as specified in the OpenAPI 3.1 specification. Use the schemas, paths and shorthands:

```ts
// index.ts
import { type OpenApi, bearerScheme, errorResponses, searchParameters, jsonSchemas, errorSchema } from "@apexjs-org/openapi";
import * as schemas from "./schemas.js";
import { userPaths } from "./paths.js";

export const openapi: OpenApi = {
  openapi: '3.1.0',
  info: {
    title: 'API title',
    version: '1.0.0'
  },
  security: [
    { BearerAuth: [] } // Specifies that all paths should use the BearerAuth security scheme, see components.securitySchemes. Specifying security at the path method level is possible as well (to disable security, use: security: [])
  ],
  paths: userPaths,
  components: {
    schemas: {
      Error: errorSchema(), // Specifies the Error schema for the error responses, same schema as express-openapi-validator errors
      ...jsonSchemas(schemas) // Converts the specified Zod schemas to JSON schemas
    },
    parameters: searchParameters(), // Specifies the q, sort and offset parameters so that they can be referenced
    securitySchemes: {
      BearerAuth: bearerScheme() // Specifies a bearer security scheme. openIdScheme() and oauth2Scheme() are possible as well
    },
    responses: errorResponses()
  }
}

// console.dir(openapi, { depth: null })
```

Put your OpenAPI description in [express-openapi-validator](https://www.npmjs.com/package/express-openapi-validator) to bring it to life.