import { MeasureType } from '@prisma/client';
import { body } from 'express-validator';

// const isBase64: CustomValidator = (value: string) => {
//   if (!value) {
//     throw new Error('Base64 string is required');
//   }

//   // Verifica se tem o length correto e não tem caracteres inválidos
//   const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
//   if (!base64Pattern.test(value)) {
//     throw new Error('Invalid Base64 string');
//   }

//   // Verifica se o length é um múltiplo de 4 (requisito para Base64)
//   if (value.length % 4 !== 0) {
//     throw new Error('Invalid Base64 string length');
//   }

//   const mimeTypePattern = /^data:image\/(jpeg|jpg|png|gif);base64,/;
//   if (!mimeTypePattern.test(value)) {
//     throw new Error('Invalid MIME type or not a valid image Base64');
//   }

//   return true;
// };

export const validateUploadMeasure = () => [
  body('image')
    .isBase64()
    .withMessage('image deve ser um base64 válido')
    .notEmpty()
    .withMessage('image é obrigatório'),
  body('customer_code')
    .isString()
    .withMessage('customer_code deve ser uma string')
    .notEmpty()
    .withMessage('customer_code é obrigatório'),
  body('measure_datetime')
    .isISO8601()
    .withMessage('measure_datetime deve ser uma data válida')
    .notEmpty()
    .withMessage('measure_datetime é obrigatório'),
  body('measure_type')
    .isIn(Object.values(MeasureType))
    .withMessage('measure_type deve ser WATER ou GAS')
    .notEmpty()
    .withMessage('measure_type é obrigatório'),
];
