import { Router } from 'express';
import {
  uploadMeasure,
  confirmMeasure,
  listCustomerMeasures,
  testContentGenerator,
} from '../controllers/measureController';
import { validateUploadMeasure } from '../middlewares/measureValidators/uploadMeasure';
import { handleValidationErrors } from '../middlewares/errorHandler';
import { validateConfirmMeasure } from '../middlewares/measureValidators/confirmMeasure';
import { validateListMeasure } from '../middlewares/measureValidators/listMeasure';

const router = Router();

router.post(
  '/upload',
  validateUploadMeasure(),
  handleValidationErrors,
  uploadMeasure,
);

router.patch(
  '/confirm',
  validateConfirmMeasure(),
  handleValidationErrors,
  confirmMeasure,
);

router.get(
  '/:customer_code/list',
  validateListMeasure(),
  handleValidationErrors,
  listCustomerMeasures,
);

router.get('/test/ia', testContentGenerator);

export default router;
