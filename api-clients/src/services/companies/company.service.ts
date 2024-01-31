import { axiosGet } from '../../lib/use-axios';
import logger from '../../logger';

export async function getRandonCompanyByQuantity(quantity: number): Promise<any> {
  const url = `/companies?_quantity=${quantity}`;
  const baseURL = 'http://api-companies:3000';

  try {
    console.log('buscando quantidade de empresas no service', quantity);

    return await axiosGet<any>(url, baseURL);
  } catch (error) {
    logger.error('Error details:', error);
    throw error;
  }
}
