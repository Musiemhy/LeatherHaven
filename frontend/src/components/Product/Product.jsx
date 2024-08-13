import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product.scss";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5555/getproducts");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Unable to fetch products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="productSection">
      <div className="header">
        <p>New Products</p>
        <button>Shop Now</button>
      </div>
      <div className="productItem">
        {products.map((product) => (
          <div key={product._id} className="product">
            <img src={product.images[0]} alt={product.name} />
            <p className="rating">Rating: {product.rating}</p>
            <p className="name">{product.name}</p>
            <p className="description">{product.description}</p>
            <div className="truePrice">
              <p className="price">{product.price} ETB</p>
              <p className="discount">
                {product.discount ? product.discount : "No discount"} ETB
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
