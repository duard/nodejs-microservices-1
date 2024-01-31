import { axiosGet } from '../../lib/use-axios';
import logger from '../../logger';

export async function getRandonCompanyByQuantity(quantity: number): Promise<any> {
  const url = `/companies?_quantity=${quantity}`;
  const baseURL = 'http://localhost:3001';

  try {
    console.log('buscando quantidade de pessoas no service', quantity);

    return await axiosGet<any>(url, baseURL);
  } catch (error) {
    logger.error('Error details:', error);
    throw error;
  }
}
