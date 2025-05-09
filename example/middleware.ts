import * as OpenApiValidator from 'express-openapi-validator';

// express openapi validator middleware
export function validator(apiSpec: any, operations: any, securityHandlers: any = {}, options: any = {}) {
  return OpenApiValidator.middleware({
    apiSpec,
    validateRequests: { removeAdditional: 'all' },
    operationHandlers: {
      basePath: '/operations',
      resolver: function (basePath, route, apiDoc) {
        const pathKey = route.openApiRoute.substring(route.basePath.length);
        const schema = (apiDoc.paths || {})[pathKey][route.method.toLowerCase()];
        return operations[schema?.operationId];
      }
    },
    validateSecurity: {
      handlers: { ...securityHandlers } // e.g. { BearerAuth: async (req, scopes, schema) => {}}
    },
    ...options
  });
}

// express middleware that handles errors
export function errorHandler(err: any, req: any, res: any, next: any) {
  res.status(err.status || 500).json({
    message: err.status ? err.message : 'internal server error',
    errors: err.status ? err.errors : undefined
  });
}

// security handler for bearerAuth
export async function BearerAuth(req, scopes, schema) {
  // to do: verify user
  // throw Error('You are not signed in');
}