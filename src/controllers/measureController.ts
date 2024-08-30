import { Request, Response } from 'express';
import logger from '../utils/logger';

export const uploadMeasure = async (_req: Request, res: Response) => {
  // Lógica para upload de medidas
  res.send('Upload de medida implementado em breve');
};

export const confirmMeasure = async (_req: Request, res: Response) => {
  // Lógica para confirmação de medidas
  res.send('Confirmação de medida implementado em breve');
};

export const listCustomerMeasures = async (req: Request, res: Response) => {
  const { params, query, body } = req;
  logger.warn(JSON.stringify({ params, query, body }, null, 2));
  res.send('Listagem de medidas implementado em breve');
};
