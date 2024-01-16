import axios from 'axios';
import { useEffect, useState } from 'react';

export const CartFunction = () => {
  const [cartData, setCartData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cart/active');
      setCartData(response.data.data);
    } catch (err) {
      console.error('Error in fetchData:', err);
    }
  };

  const handleDeleteItem = async (cartDetailId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/cart/delete-cart-detail/${cartDetailId}`,
      );
      const updatedCartData = cartData.filter(
        (item) => item.Cart_detail.id !== cartDetailId,
      );
      setCartData(updatedCartData);
      localStorage.setItem('cartData', JSON.stringify(updatedCartData));
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAllItems = async () => {
    try {
      await axios.delete('http://localhost:8000/api/cart/delete-all');
      localStorage.removeItem('cartData');
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuantityChange = async (cartDetailId, newQuantity, action) => {
    try {
      await axios.put(
        `http://localhost:8000/api/cart/update-cart/${cartDetailId}`,
        {
          action,
          quantity: newQuantity,
        },
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    cartData,
    fetchData,
    handleDeleteItem,
    deleteAllItems,
    handleQuantityChange,
  };
};
