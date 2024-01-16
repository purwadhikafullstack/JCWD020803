import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import RegisterUser from './pages/register-user/Register';
import LoginUser from './pages/login-user/LoginPage';
import { Product } from './pages/product/product';
import { CartItem } from './pages/cart.item/cart.item';
import { Cart } from './pages/cart.page/Cart';
import { CheckoutPage } from './pages/checkout.page/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout-page" element={<CheckoutPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart-detail" element={<CartItem />} />
        <Route path="/home/register-user" element={<RegisterUser />} />
        <Route path="/home/login-user" element={<LoginUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
