import React from 'react';
import { Navbar } from '../../components/landing-page/mobile-view/navbar/Navbar';
import { ProductListCheckout } from '../../components/cart/product-list-checkout';
import { Coupon } from '../../components/cart/coupon';
import { Struk } from '../../components/cart/struk';

export const Cart = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="w-[86vw] m-auto">
        <header className="font-semibold text-2xl mt-10 xl:mt-[10vh]">
          Shopping Cart
        </header>
        <section className="relative w-full h-auto pb-20">
          <ProductListCheckout />
          <Coupon />
          <Struk fetchCartData={() => fetchData()} />
        </section>
      </div>
    </>
  );
};
