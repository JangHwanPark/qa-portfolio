import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { healthRouter } from './routes/health.js';
import { usersRouter } from './routes/users.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openapiDoc = YAML.load(path.join(__dirname, '..', 'openapi.yaml'));

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use('/api/health', healthRouter);
  app.use('/api/users', usersRouter);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDoc));

  return app;
}
