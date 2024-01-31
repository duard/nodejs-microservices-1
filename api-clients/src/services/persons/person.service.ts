import { axiosGet } from '../../lib/use-axios';
import logger from '../../logger';

export async function getRandonPersonByQuantity(quantity: number): Promise<any> {
  const url = `/persons?_quantity=${quantity}`;
  const baseURL = 'http://api-persons:3002';

  try {
    return await axiosGet<any>(url, baseURL);
  } catch (error) {
    logger.error('Error details:', error);
    throw error;
  }
}
