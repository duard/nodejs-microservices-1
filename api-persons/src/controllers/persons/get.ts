import { Request, RequestHandler } from 'express';
import FakePersonService from '../../lib/fake-company';

import logger from '../../logger';
import requestMiddleware from '../../middleware/request-middleware';

const get: RequestHandler = async (req: Request, res) => {
  const { quantity } = req.params;
  logger.silly(`Generating ${quantity} fake persons`);

  const persons = FakePersonService.generateFakeData(parseInt(quantity, 10));

  return res.status(200).send({
    persons
  });
};

export default requestMiddleware(get);
