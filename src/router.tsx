import { createBrowserRouter } from 'react-router-dom'
import FullWidthLayout from './components/layout/full-width-layout/FullWidthLayout';
import HomePage from './routes/home/HomePage';
import AboutPage from './routes/about/AboutPage';
import ErrorPage from './routes/error/ErrorPage';
import UserPage from './routes/user/UserPage';
import ProductPage from './routes/product/ProductPage';
import CartPage from './routes/cart/CartPage';
import QueryPage from './routes/query/QueryPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FullWidthLayout id="full" />,
    errorElement: <ErrorPage id="error" />,
    children: [
      {
        path: "/",
        element: <HomePage id="home" />,
      },
      {
        path: "/about",
        element: <AboutPage id="about" />
      },
      {
        path: "/user",
        element: <UserPage id="user" />
      },
      {
        path: "/product/:productId",
        loader: ({params: param}) => param.productId ?? "",
        element: <ProductPage id="product" />
      },
      {
        path: "/cart",
        element: <CartPage id="cart" />
      },
      {
        path: "/search",
        element: <QueryPage id="query"/>
      }
    ]
  }
]);