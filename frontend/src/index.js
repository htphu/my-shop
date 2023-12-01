import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import DashBoard from './pages/DashBoard/DashBoard';
import ProductVariant from './pages/ProductVariant/ProductVariant';
import AddProductVariant from './pages/AddProductVariant/AddProductVariant';
import UpdateProductVariant from './pages/UpdateProductVariant/UpdateProductVariant';
import Status from './pages/Status/Status';
import AddStatus from './pages/AddStatus/AddStatus';
import UpdateStatus from './pages/UpdateStatus/UpdateStatus';
import Product from './pages/Product/Product';
import AddProduct from './pages/AddProduct/AddProduct';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import User from './pages/User/User';
import AddUser from './pages/AddUser/AddUser';
import UpdateUser from './pages/UpdateUser/UpdateUser';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import Register from './pages/Register/Register';
import HistoryOrder from './pages/HistoryOrder/HistoryOrder';
import Order from './pages/Order/Order';
import UserInfo from './pages/UserInfo/UserInfo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "history-order",
        element: <HistoryOrder />
      },
      {
        path: "chitietsanpham/:id",
        element: <DetailProduct />
      },
      {
        path: "info",
        element: <UserInfo />,
      },
    ]
  },
  {
    path: '/dashboard',
    element: <DashBoard />,
    children: [
      {
        path: "user",
        element: <User />,
      },

      {
        path: "order",
        element: <Order />,
      },
      {
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "update-user/:id",
        element: <UpdateUser />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "product-variant",
        element: <ProductVariant />,
      },
      {
        path: 'add-product-variant',
        element: <AddProductVariant />
      },
      {
        path: 'update-product-variant/:id',
        element: <UpdateProductVariant />
      },
      {
        path: 'status',
        element: <Status />
      },
      {
        path: 'add-status',
        element: <AddStatus />
      },
      {
        path: 'update-status/:id',
        element: <UpdateStatus />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);


