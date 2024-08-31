import { Request, Response } from 'express';
// import logger from '../utils/logger';
import measureService, {
  ConfirmMeasurePayload,
  CreateMeasurePayload,
} from '../services/measureService';
import { MeasureType } from '@prisma/client';
import geminiService from '../services/geminiService';
import logger from '../utils/logger';

export const uploadMeasure = async (req: Request, res: Response) => {
  try {
    const { error_code, error_description, status_code, data } =
      await measureService.createMeasure(req.body as CreateMeasurePayload);

    if (error_code) {
      return res.status(status_code).json({ error_code, error_description });
    }

    return res.status(status_code).json(data);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const confirmMeasure = async (req: Request, res: Response) => {
  try {
    const { error_code, error_description, status_code, data } =
      await measureService.confirmMeasure(req.body as ConfirmMeasurePayload);

    if (error_code) {
      return res.status(status_code).json({ error_code, error_description });
    }

    return res.status(status_code).json(data);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listCustomerMeasures = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// apenas para testes da IA
export const testContentGenerator = async (req: Request, res: Response) => {
  const { prompt } = req.query;
  const response = await geminiService.testAIModel(
    (prompt as string) || 'Say hello to the world!',
  );

  return res.status(200).json({ response });
};
