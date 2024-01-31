import { Request, RequestHandler } from 'express';
import FakeCompanyService from '../../lib/fake-company';

import logger from '../../logger';
import requestMiddleware from '../../middleware/request-middleware';

const get: RequestHandler = async (req: Request, res) => {
  const { _quantity } = req.query;
  logger.silly(`Generating ${_quantity} fake companies`);

  const companies = FakeCompanyService.generateFakeData(parseInt(_quantity as string, 10));

  return res.status(200).send({
    companies
  });
};

export default requestMiddleware(get);
