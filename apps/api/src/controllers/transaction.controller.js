import Transaction_product from '../models/transaction_product.model';
import Transaction from '../models/transaction.model';
import Product from '../models/product.model';
import Branch_product from '../models/branch_product.model';
import Cart from '../models/cart.model';
import Cart_detail from '../models/cart_detail.model';

export const getAll = async (req, res) => {
  try {
    const response = await Transaction.findAll({
      include: [
        {
          model: Transaction_product,
          include: [{ model: Product }],
        },
      ],
    });

    const totalIncome = response.reduce(
      (acc, transaction) => acc + parseFloat(transaction.total || 0),
      0,
    );

    res.status(200).send({
      response,
      totalIncome,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const addToCheckout = async (req, res) => {
  try {
    const activeCarts = await Cart.findAll({
      where: { isActive: true },
      include: [
        {
          model: Cart_detail,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });

    if (!activeCarts || activeCarts.length === 0) {
      return res.status(400).send({ message: 'No active carts found' });
    }

    for (let cart of activeCarts) {
      const product = cart.Cart_detail.Product;
      const productQuantity = await Branch_product.findOne({
        where: { ProductId: product.id },
      });

      if (
        !productQuantity ||
        productQuantity.quantity < cart.Cart_detail.quantity
      ) {
        return res.status(400).send({
          message: `Insufficient quantity for product ${product.product_name} in branch`,
        });
      }
    }

    let totalPrice = 0;

    for (let cart of activeCarts) {
      const product = cart.Cart_detail.Product;
      const productQuantityty = await Branch_product.findOne({
        where: { ProductId: product.id },
      });

      totalPrice += cart.Cart_detail.quantity * product.price;

      await Branch_product.decrement('quantity', {
        by: cart.Cart_detail.quantity,
        where: { id: productQuantityty.id },
      });
    }

    const transaction = await Transaction.create({
      isActive: true,
      status: 'Waiting Payment',
      total: totalPrice,
    });

    for (let item of activeCarts) {
      const product = item.Cart_detail.Product;

      await Transaction_product.create({
        quantity: item.Cart_detail.quantity,
        ProductId: product.id,
        TransactionId: transaction.id,
      });
    }

    // await Cart.update(
    //   { isActive:   },
    //   {
    //     where: {
    //       id: latestTransactionIds,
    //     },
    //   },
    // );
    res.status(200).send({ message: 'Transaction Success', data: transaction });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const deleteAllTransaction = async (req, res) => {
  try {
    await Transaction.destroy({ where: {} });
    await Transaction_product.destroy({ where: {} });
    res.status(200).send('All transaction deleted');
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
};
