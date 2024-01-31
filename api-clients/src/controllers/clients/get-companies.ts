import { Request, Response } from 'express';
import logger from '../../logger';
import { getRandonCompanyByQuantity } from '../../services/companies/company.service';

const getCompaniesController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('buscando quantityCompanies');
    const quantityCompanies = parseInt(req.query.quantityCompanies as string, 10) || 1;

    const companiesData = await getRandonCompanyByQuantity(quantityCompanies);

    res.json({ companies: companiesData });
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getCompaniesController;
