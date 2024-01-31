import { Request, Response } from 'express';
import logger from '../../logger';
import { getRandonCompanyByQuantity } from '../../services/companies/company.service';
import { getRandonPersonByQuantity } from '../../services/persons';

const getClientsController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('buscando quantityCompanies');
    const quantityCompanies = parseInt(req.query.quantityCompanies as string, 10) || 1;
    const quantityPersons = parseInt(req.query.quantityPersons as string, 10) || 1;

    const companiesData = await getRandonCompanyByQuantity(quantityCompanies);
    const personsData = await getRandonPersonByQuantity(quantityPersons);

    res.json({ companies: companiesData, persons: personsData });
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getClientsController;
