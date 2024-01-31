import { Request, Response } from 'express';
import { wait } from '../../../utils/wait';
import logger from '../../logger';
import { getRandonCompanyByQuantity } from '../../services/companies/company.service';
import { getRandonPersonByQuantity } from '../../services/persons';

const getClientsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const quantityCompanies = parseInt(req.query.quantityCompanies as string, 10) || 1;
    const timeoutInSeconds = 5; // 1 second

    const companiesData: any = await getRandonCompanyByQuantity(quantityCompanies);

    const clients: any[] = [];

    await Promise.all(companiesData?.companies.map(async (company: any) => {
      await wait(timeoutInSeconds);

      const personsData: any = await getRandonPersonByQuantity(1);
      logger.info('=>', JSON.stringify(personsData));

      const person: any = personsData?.persons[0];

      clients.push({
        name: company.name,
        email: company.email,
        phone: company.phone,
        person: {
          fullName: `${person.firstname} ${person.lastname}`
        }
      });
    }));

    res.json({ total: 20, clients });
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getClientsController;
