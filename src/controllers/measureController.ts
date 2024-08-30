import { Request, Response } from 'express';
// import logger from '../utils/logger';
import measureService, {
  ConfirmMeasurePayload,
  CreateMeasurePayload,
} from '../services/measureService';
import { MeasureType } from '@prisma/client';

export const uploadMeasure = async (req: Request, res: Response) => {
  const { error_code, error_description, status_code, data } =
    await measureService.createMeasure(req.body as CreateMeasurePayload);

  if (error_code) {
    return res.status(status_code).json({ error_code, error_description });
  }

  return res.status(status_code).json(data);
};

export const confirmMeasure = async (req: Request, res: Response) => {
  const { error_code, error_description, status_code, data } =
    await measureService.confirmMeasure(req.body as ConfirmMeasurePayload);

  if (error_code) {
    return res.status(status_code).json({ error_code, error_description });
  }

  return res.status(status_code).json(data);
};

export const listCustomerMeasures = async (req: Request, res: Response) => {
  const {
    params: { customer_code },
    query: { measure_type },
  } = req;

  const { error_code, error_description, status_code, data } =
    await measureService.listMeasures({
      customer_code: customer_code,
      measure_type: measure_type as MeasureType,
    });
  
  if (error_code) {
    return res.status(status_code).json({ error_code, error_description });
  }

  return res.status(status_code).json(data);
};
