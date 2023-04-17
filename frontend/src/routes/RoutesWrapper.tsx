import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../views/Home/HomePage";
import Cart from "../views/Cart/Cart";
import ERootWrapper from "../components/ERootWrapper";
import Products from "../views/Products/Products";
import Login from "../views/Authorization/Login/Login";
import Registration from "../views/Authorization/Registration/Registration";
import Checkout from "../views/Checkout/Checkout";
import Dashboard from "../views/Dashboard/Dashboard";
import ERootAdminWrapper from "../components/ERootAdminWrapper";
import UsersControl from "../views/UsersControl/UsersControl";
import CategoriesControl from "../views/CategoriesControl/CategoriesControl";
import ProductsControl from "../views/ProductsControl/ProductsControl";
import { PrivateRoute } from "./PrivateRoute";
import ProductDetail from "../views/ProductDetail/ProductDetail";

const RoutesWrapper: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="/" element={<ERootWrapper />}>
        <Route path="home" element={<HomePage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="checkout/:session_id" element={<Checkout />} />
        <Route path="category" element={<Products />} />
        <Route path="/category/:productId" element={<ProductDetail />} />
      </Route>
      <Route path="/admin" element={<Navigate to="dashboard" />} />
      <Route path="/admin" element={<ERootAdminWrapper />}>
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute>
              <UsersControl />
            </PrivateRoute>
          }
        />
        <Route
          path="categories"
          element={
            <PrivateRoute>
              <CategoriesControl />
            </PrivateRoute>
          }
        />
        <Route
          path="products"
          element={
            <PrivateRoute>
              <ProductsControl />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default RoutesWrapper;
