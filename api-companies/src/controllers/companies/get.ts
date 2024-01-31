// import { Request, RequestHandler } from 'express';
// import FakeCompanyService from '../../lib/fake-company';
// import logger from '../../logger';
// import requestMiddleware from '../../middleware/request-middleware';

// const get: RequestHandler = async (req: Request, res) => {
//   logger.silly('Get api companies');

//   // Generate 20 fake companies
//   const fakeCompanies = FakeCompanyService.generateFakeData(20);

//   return res.status(200).send({
//     'api-companies': 'ok',
//     companies: fakeCompanies
//   });
// };

// export default requestMiddleware(get);

import { Request, RequestHandler } from 'express';
import FakeCompanyService from '../../lib/fake-company';

import logger from '../../logger';
import requestMiddleware from '../../middleware/request-middleware';

const get: RequestHandler = async (req: Request, res) => {
  const { quantity } = req.params;
  logger.silly(`Generating ${quantity} fake companies`);

  const companies = FakeCompanyService.generateFakeData(parseInt(quantity, 10));

  return res.status(200).send({
    companies
  });
};

export default requestMiddleware(get);
