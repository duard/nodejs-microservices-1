import { Request, RequestHandler } from 'express';

import logger from '../../logger';
import requestMiddleware from '../../middleware/request-middleware';

const get: RequestHandler = async (req: Request, res) => {
  logger.silly('Get api health');

  return res.status(200).send({
    'api-companies': 'ok'
  });
};

export default requestMiddleware(get);
