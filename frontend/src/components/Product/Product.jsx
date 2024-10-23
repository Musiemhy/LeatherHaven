import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Product.scss";

const Product = ({ category, gender, sorting }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/getproducts",
          {
            params: { category, gender },
          }
        );
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

  // Apply sorting based on price
  const sortedProducts = [...products].sort((a, b) => {
    if (sorting === "ascending") {
      return a.price - b.price;
    } else if (sorting === "descending") {
      return b.price - a.price;
    }
    return 0;
  });

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="productItem">
      {sortedProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        sortedProducts.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <div className="product">
              <img src={product.images[0]} alt={product.name} />
              <p className="rating">Rating: {product.rating}</p>
              <p className="name">{product.name}</p>
              <p className="description">{product.description}</p>
              <div className="truePrice">
                {product.discount ? (
                  <>
                    <p className="price">{product.price} ETB</p>
                    <p className="discount">{product.discount} ETB</p>
                  </>
                ) : (
                  <p className="discount">{product.price} ETB</p>
                )}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Product;
