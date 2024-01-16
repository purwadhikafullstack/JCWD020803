import { useEffect, useState } from 'react';
import { CheckoutList } from '../../components/checkout/checkout-list';
import { Navbar } from '../../components/landing-page/mobile-view/navbar/Navbar';

export const CheckoutPage = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <CheckoutList cartData={cartData} />
    </div>
  );
};
