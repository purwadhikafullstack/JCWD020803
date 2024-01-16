import { Router } from 'express';
import {
  addToCheckout,
  closePage,
  deleteAllTransaction,
  getAll,
} from '../controllers/transaction.controller';

const transactionRouter = Router();

transactionRouter.get('/', getAll);
transactionRouter.post('/', addToCheckout);
// transactionRouter.post('/close-page', closePage);
transactionRouter.delete('/', deleteAllTransaction);

export { transactionRouter };
