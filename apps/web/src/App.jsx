import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import RegisterUser from './pages/register-user/Register';
import LoginUser from './pages/login-user/LoginPage';

import { CreatePasswordPage } from './pages/register-user/create-password/Index';
import UserRequired from './pages/required/user.required';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { keepLoginCustomer } from './utils/customer/keep.login.customer';
import { CustomerProfile } from './components/customers/user-profile/Index';
import { VerifyCodePage } from './pages/user-dashboard/profle-detail-page/verification-code/Index';
import ResetPasswordPage from './pages/forgot-password-page/Index';
import NewPasswordPage from './pages/forgot-password-page/new-password-page/Index';
import { CheckoutPage } from './pages/checkout.page/Checkout';
import { Cart } from './pages/cart.page/Cart';
import { Product } from './pages/product/product';
import { OrderHistory } from './components/order-history/order-history';
import { CancelOrder } from './components/cancel-order/cancel-order';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/cancel', element: <CancelOrder /> },
  { path: '/order-history', element: <OrderHistory /> },
  { path: '/product', element: <Product /> },
  { path: '/cart', element: <Cart /> },
  { path: '/cart/checkout-page', element: <CheckoutPage /> },
  { path: '/register-user', element: <RegisterUser /> },
  { path: '/login-user', element: <LoginUser /> },
  { path: '/register-user/verify/:token', element: <CreatePasswordPage /> },
  {
    element: <UserRequired />,
    children: [
      {
        path: '/customer-dashboard/:route/:username',
        element: <CustomerProfile />,
      },
      {
        path: '/customer-dashboard/verification-phone/:verificationId',
        element: <VerifyCodePage />,
      },
    ],
  },
  { path: '/login-user/forgot-password', element: <ResetPasswordPage /> },
  {
    path: '/forgot-password/new-password/:token',
    element: <NewPasswordPage />,
  },
]);

function App() {
  const token = localStorage?.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      keepLoginCustomer(dispatch, token);
    } else {
      return;
    }
  }, [token]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
