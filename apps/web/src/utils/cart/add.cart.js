import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product');
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return products;
};

export const useCart = () => {
  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:8000/api/cart/add-to-cart', {
        productId: productId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { addToCart };
};
