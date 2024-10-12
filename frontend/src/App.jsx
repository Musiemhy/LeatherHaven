import React from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {!isHomePage && !isRegisterPage && !isLoginPage && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <main>
              <Routes>
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/ProductList" element={<ProductListPage />} />
                <Route path="/cartPage/:userId" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
          }
        />
      </Routes>

      {!isHomePage && !isRegisterPage && !isLoginPage && <Footer />}
    </div>
  );
};

const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;
