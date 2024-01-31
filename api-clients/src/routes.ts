import { Router } from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import * as ClientController from './controllers/clients/index'; // Update the path accordingly
import * as HealthController from './controllers/health/get';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

const SWAGGER_YAML_FILEPATH = path.join(__dirname, '../openapi.yml');

// api health
router.get('/health', HealthController.default);

// api clients
router.get('/clients', ClientController.get);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  const swaggerYaml = yaml.load(fs.readFileSync(SWAGGER_YAML_FILEPATH, 'utf8')) as Object;
  router.use('/dev/api-docs', swaggerUi.serve as any);
  router.get('/dev/api-docs', swaggerUi.setup(swaggerYaml, swaggerUiOptions) as any);
}

export default router;
