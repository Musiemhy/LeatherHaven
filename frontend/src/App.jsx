import React from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";

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
            <Route path="/product" element={<ProductPage />} />
          </Routes>
        </main>
      )}
      {isHomePage && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
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
