import { Router } from 'express';
import {
  addProduct,
  getAllProduct,
  deleteProduct,
} from '../controllers/product.controller';

const productRouter = Router();

productRouter.get('/', async (req, res) => {
  const result = await getAllProduct();
  res.send(result);
});

productRouter.post('/add', async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await addProduct(productData);
    res.status(200).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

productRouter.delete('/:productId', async (req, res) => {
  try {
    const result = await deleteProduct(req?.params, res);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    return err;
  }
});
export { productRouter };
