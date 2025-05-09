import express from 'express';
import bodyParser from 'body-parser';
import { validator, errorHandler, BearerAuth } from './middleware.js';
import { openapi } from './openapi.js';
import * as operations from './operations.js';

const start = async () => {
  try {
    const app = express();

    const securityHandlers = {}; // = no security/authentication, to enable security use { BearerAuth } and uncomment openapi.ts security

    app.use(bodyParser.json());
    app.use(validator(openapi, operations, securityHandlers));
    app.use(errorHandler);

    app.listen(8080, () => console.log('Running...'));
  }
  catch (err) {
    console.log(err);
  }
}

start();
