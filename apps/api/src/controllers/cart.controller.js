import Branch_product from '../models/branch_product.model';
import Cart from '../models/cart.model';
import CartDetail from '../models/cart_detail.model';
import Product from '../models/product.model';

export const getAllProductsInCart = async (req, res) => {
  try {
    const response = await Cart.findAll();

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400), send({ message: err.message });
  }
};

export const getActive = async (req, res) => {
  try {
    const response = await Cart.findAll({
      where: { isActive: true },
      include: [
        {
          model: CartDetail,
          include: [
            {
              model: Product,
              attributes: ['product_name', 'price', 'descriptions'],
            },
          ],
        },
      ],
    });

    res.status(200).send({ data: response, message: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findByPk(productId, {
      include: [{ model: Branch_product }],
    });

    if (!product || product.isDisabled || product.isDeleted) {
      return res.status(404).send('Product not found or product unavailable');
    }

    if (
      product.Branch_products.length === 0 ||
      product.Branch_products[0].quantity <= 0
    ) {
      return res.status(404).send('Product is out of stock');
    }

    let cart = await Cart.findOne({
      where: { isActive: true },
    });

    if (!cart) {
      cart = await Cart.create({ isActive: true });
    }

    let cartDetail = await CartDetail.findOne({
      where: { CartId: cart.id, ProductId: productId },
    });

    if (cartDetail) {
      cartDetail.quantity += 1;
      await cartDetail.save();
    } else {
      cartDetail = await CartDetail.create({
        CartId: cart.id,
        ProductId: productId,
        quantity: 1,
      });
    }

    return res
      .status(200)
      .send({ success: true, message: 'Product added to cart successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { action } = req.body;
    const cartDetailId = req.params.cartDetailId;

    const cartDetail = await CartDetail.findByPk(cartDetailId, {
      include: [{ model: Product }],
    });
    if (!cartDetail) {
      return res.status(404).send({ error: 'Cart detail not found' });
    }

    if (action === 'increment') {
      cartDetail.quantity += 1;
    } else if (action === 'decrement') {
      cartDetail.quantity = Math.max(1, cartDetail.quantity - 1);
    } else {
      return res.status(400).send({ error: 'Invalid action' });
    }

    await cartDetail.save();

    return res
      .status(200)
      .send({ success: true, message: 'Cart updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const deleteCartDetail = async (req, res) => {
  try {
    const cartDetailId = req.params.cartDetailId;
    console.log('Deleting cart item with ID:', cartDetailId);

    const cartDetail = await CartDetail.findByPk(cartDetailId, {
      include: [Cart],
    });

    if (!cartDetail) {
      return res.status(404).send('Cart item not found');
    }

    const cartDetailsCount = await CartDetail.count({
      where: { CartId: cartDetail.CartId },
    });

    if (cartDetailsCount === 1) {
      await cartDetail.Cart.destroy({ where: { id: cartDetail.CartId } });
      await cartDetail.destroy({ where: { id: cartDetailId } });
    } else {
      await cartDetail.destroy({ where: { id: cartDetailId } });
    }

    return res
      .status(200)
      .send({ success: true, message: 'Cart detail deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const deleteAllCarts = async (req, res) => {
  try {
    await CartDetail.destroy({ where: {} });
    await Cart.destroy({ where: {} });

    res.status(200).send('All carts deleted');
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
};
