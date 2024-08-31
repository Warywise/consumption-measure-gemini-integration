import { Router } from 'express';
import {
  uploadMeasure,
  confirmMeasure,
  listCustomerMeasures,
  testContentGenerator,
} from '../controllers/measureController';

const router = Router();

router.post('/upload', uploadMeasure);
router.patch('/confirm', confirmMeasure);
router.get('/:customer_code/list', listCustomerMeasures);
router.get('/test/ia', testContentGenerator);

export default router;
