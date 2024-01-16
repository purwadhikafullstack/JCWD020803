import Product from '../models/product.model';
import Branch_product from '../models/branch_product.model';

export const getAllProduct = async () => {
  try {
    const response = await Product.findAll({
      include: [{ model: Branch_product }],
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addProduct = async (productData) => {
  try {
    const existingProduct = await Product.findOne({
      where: { product_name: productData.product_name },
    });

    if (existingProduct) {
      await Branch_product.increment('quantity', {
        by: 1,
        where: { ProductId: existingProduct.id },
      });
      return existingProduct;
    } else {
      const newProduct = await Product.create({
        product_name: productData.product_name,
        descriptions: productData.descriptions,
        price: productData.price,
      });

      await Branch_product.create({ quantity: 1, ProductId: newProduct.id });

      return newProduct;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req;
  try {
    const result = await Product.destroy({
      where: { id: productId },
    });
    if (result === 1) {
      res.status(200).send('Delete Success');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};
