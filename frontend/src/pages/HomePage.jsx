import React from "react";
import Product from "../components/Product.jsx";
import Header from "../components/Header.jsx";

const HomePage = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to LeatherHaven</h1>
      {/* Display a list of products */}
      <Product />
    </div>
  );
};

export default HomePage;
