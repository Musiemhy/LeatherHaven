import React from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductListPage from "./pages/ProductListPage/ProductListPage";

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      {!isHomePage && <Header />}
      {!isHomePage && (
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/ProductList" element={<ProductListPage />} />
          </Routes>
        </main>
      )}
      {isHomePage && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/ProductList" element={<ProductListPage />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
};

const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;
