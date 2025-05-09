import { type Paths, searchParameterRefs, jsonResponse, errorResponseRefs, jsonBody, idParameters, schemaRef } from "@apexjs-org/openapi";

const paths: Paths = {}

// Methods for the /users path
paths['/users'] = {
  get: {
    operationId: 'listUsers', // Name of the function that this request should trigger
    summary: 'Finds users.',
    parameters: searchParameterRefs(), // References the q, sort and offset parameters (included in components.parameters, see index.ts below)
    responses: {
      ...errorResponseRefs(), // References the BadRequest, Unauthorized, Forbidden, NotFound and TooManyRequests errors (included in components.responses, see index.ts below)
      '200': jsonResponse(schemaRef('UserList')) // JSON response with a reference to a custom schema (included in components.schemas, see index.ts below)
    }
  },
  post: {
    operationId: 'createUser',
    summary: 'Creates a new user.',
    requestBody: jsonBody(schemaRef('UserCreate')), // JSON body with a reference to a custom schema (included in components.schemas, see index.ts below)
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
    parameters: idParameters(['userId']), // Specifies the userId parameter in this path
    responses: {
      ...errorResponseRefs(),
      '200': jsonResponse(schemaRef('User'))
    }
  },
  patch: {
    operationId: 'updateUser',
    summary: 'Updates a user by id.',
    parameters: idParameters(['userId']),
    requestBody: jsonBody(schemaRef('UserUpdate')),
    responses: {
      ...errorResponseRefs(),
      '200': jsonResponse(schemaRef('User'))
    }
  },
  delete: {
    operationId: 'deleteUser',
    summary: 'Deletes a user by id.',
    parameters: idParameters(['userId']),
    responses: {
      ...errorResponseRefs(),
      '200': jsonResponse() // JSON response without a schema (reference)
    }
  }
};

export const userPaths = paths;