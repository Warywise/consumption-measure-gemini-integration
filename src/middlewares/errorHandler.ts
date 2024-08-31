import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { validationResult } from 'express-validator';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
};
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: errors
        .array()
        .map((error) => error.msg)
        .join(', '),
    });
  }

  next();
};
