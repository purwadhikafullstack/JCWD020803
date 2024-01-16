import { Router } from 'express';
import {
  addToCart,
  deleteAllCarts,
  deleteCartDetail,
  getActive,
  getAllProductsInCart,
  updateCart,
} from '../controllers/cart.controller';

const cartRouter = Router();

cartRouter.get('/', getAllProductsInCart);
cartRouter.get('/active', getActive);
cartRouter.post('/add-to-cart', addToCart);
cartRouter.delete('/delete-all', deleteAllCarts);
cartRouter.delete('/delete-cart-detail/:cartDetailId', deleteCartDetail);
cartRouter.put('/update-cart/:cartDetailId', updateCart);

export { cartRouter };
