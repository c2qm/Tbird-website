import { createHashRouter } from 'react-router-dom';
import App from '../App';
import Hero from '../screens/Hero';
import Category from '../screens/Category';
import Product from '../screens/Product';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import Wishlist from '../screens/Wishlist';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Hero /> },
      { path: 'category/:categorySlug', element: <Category /> },
      { path: 'category/:categorySlug/:subcategorySlug', element: <Category /> },
      { path: 'product/:productId', element: <Product /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'wishlist', element: <Wishlist /> },
    ],
  },
]);