import { MeasureType } from '@prisma/client';
import { query, ValidationChain } from 'express-validator';

export const validateListMeasure = (): ValidationChain[] => [
  query('measure_type')
    .optional()
    .isIn(Object.values(MeasureType))
    .withMessage('measure_type deve ser WATER ou GAS'),
];
