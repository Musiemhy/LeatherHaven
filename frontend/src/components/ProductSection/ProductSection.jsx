import React from "react";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import "./ProductSection.scss";

const ProductSection = () => {
  return (
    <div className="productSection">
      <div className="header">
        <p>New Products</p>
        <Link to="/ProductList">
          <button>Shop Now</button>
        </Link>
      </div>
      <Product />
    </div>
  );
};

export default ProductSection;
