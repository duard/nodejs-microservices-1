import { Request, Response } from 'express';
import logger from '../../logger';
import { getRandonCompanyByQuantity } from '../../services/companies/company.service';
import { getRandonPersonByQuantity } from '../../services/persons';

interface Person {
  firstname: string;
  lastname: string;
  // Add other person properties as needed
}

interface Company {
  name: string;
  email: string;
  phone: string;
  // Add other company properties as needed
}

interface Client {
  name: string;
  email: string;
  phone: string;
  person: {
    fullName: string;
    // Add other person properties as needed
  };
}

const getClientsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const quantityCompanies = parseInt(req.query.quantityCompanies as string, 10) || 1;

    const companiesData: any = await getRandonCompanyByQuantity(quantityCompanies);

    const clients: any[] = [];

    await Promise.all(companiesData?.companies.map(async (company: Company) => {
      const personsData: any = await getRandonPersonByQuantity(1);
      logger.info(JSON.stringify(personsData));

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
