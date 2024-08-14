import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product.scss";

const Product = ({ category, gender }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(category);
        console.log(gender);
        const response = await axios.get(`http://localhost:5555/getproducts`, {
          params: { category, gender },
        });
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        setError("Unable to fetch products");
        console.error("Unable to fetch products: ", error);
      }
    };

    fetchProducts();
  }, [category, gender]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="productItem">
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => (
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
        ))
      )}
    </div>
  );
};

export default Product;
