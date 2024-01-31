import { Request, Response } from 'express';
import logger from '../../logger';
import { getRandonPersonByQuantity } from '../../services/persons';

const getPersonsController = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('buscando quantityPersons');
    const quantityPersons = parseInt(req.query.quantityPersons as string, 10) || 1;

    const personsData = await getRandonPersonByQuantity(quantityPersons);

    res.json({ persons: personsData });
  } catch (error) {
    logger.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getPersonsController;
