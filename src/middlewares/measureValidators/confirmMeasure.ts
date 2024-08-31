import { body, ValidationChain } from 'express-validator';

export const validateConfirmMeasure = (): ValidationChain[] => [
  body('measure_uuid')
    .isUUID()
    .withMessage('measure_uuid deve ser um uuid válido')
    .notEmpty()
    .withMessage('measure_uuid é obrigatório'),
  body('confirmed_value')
    .isInt()
    .withMessage('confirmed_value deve ser um número inteiro')
    .notEmpty()
    .withMessage('confirmed_value é obrigatório'),
];
