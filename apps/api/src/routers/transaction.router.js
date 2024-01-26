// transaction.router.js
import { Router } from 'express';
import { customerProfileUpload } from '../middleware/multer.middleware';
import {
  addToCheckout,
  cancelOrder,
  deleteAllTransaction,
  getAll,
  getByDate,
  getById,
  uploadPaymentProof,
} from '../controllers/transaction.controller';
import { verifyToken } from '../middleware/customer.auth.middleware';

const transactionRouter = Router();
const upload = customerProfileUpload();

transactionRouter.use(verifyToken);
transactionRouter.post('/', addToCheckout);
transactionRouter.get('/', getAll);
transactionRouter.patch(
  '/upload-proof/:transactionId',
  upload.single('paymentProof'),
  uploadPaymentProof,
);
transactionRouter.delete('/', deleteAllTransaction);
transactionRouter.get('/:transactionId', getById);
transactionRouter.get('/date/:date', getByDate);
transactionRouter.patch('/cancel/:transactionId', cancelOrder);

export { transactionRouter };
