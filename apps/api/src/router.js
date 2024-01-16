import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { adminRouter } from './routers/admin.router';
import { customerRouter } from './routers/customer.route';
import { cartRouter } from './routers/cart.router';
import { productRouter } from './routers/product.router';
import { transactionRouter } from './routers/transaction.router';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/admin', adminRouter);
router.use('/customer', customerRouter);
router.use('/cart', cartRouter);
router.use('/product', productRouter);
router.use('/transaction', transactionRouter);

// add another router here ...

export default router;
