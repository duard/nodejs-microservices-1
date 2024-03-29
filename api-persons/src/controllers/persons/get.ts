import { Request, RequestHandler } from 'express';
import FakePersonService from '../../lib/fake-person';

import logger from '../../logger';
import requestMiddleware from '../../middleware/request-middleware';

const get: RequestHandler = async (req: Request, res) => {
  const { _quantity } = req.query;
  logger.silly(`Generating ${_quantity} fake persons`);

  const persons = FakePersonService.generateFakeData(parseInt(_quantity as string, 10));

  return res.status(200).send({
    persons
  });
};

export default requestMiddleware(get);
