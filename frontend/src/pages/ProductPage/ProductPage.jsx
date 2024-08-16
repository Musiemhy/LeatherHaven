import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.scss";

const ProductPage = () => {
  const { productId } = useParams();
  console.log("Product ID from URL:", productId); // Check if productId is correct
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/getproductsId`,
          {
            params: { productId },
          }
        );

        console.log("API Response Data:", response.data); // Check the response data

        if (response.data && typeof response.data === "object") {
          setProduct(response.data);
        } else {
          console.error("Expected an object but got:", response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [productId]);

  return (
    <div>
      <main className="product-page">
        {!product || product.length === 0 ? (
          <div>Loading products...</div>
        ) : (
          <div key={product._id}>
            <nav className="breadcrumb">
              <a href="/">Home</a> &gt; <a href="/mens">Mens</a> &gt;{" "}
              <a href="/accessories">Accessories</a> &gt; {product.category}
            </nav>
            <div className="mainSection">
              <div className="product-images">
                <img
                  src={product.images[0]}
                  alt="Main product"
                  className="main-image"
                />
                <div className="thumbnail-images">
                  <img src={product.images[0]} alt="Product thumbnail" />
                  <img src={product.images[0]} alt="Product thumbnail" />
                  <img src={product.images[0]} alt="Product thumbnail" />
                  <img src={product.images[0]} alt="Product thumbnail" />
                  <img src={product.images[0]} alt="Product thumbnail" />
                  <img src={product.images[0]} alt="Product thumbnail" />
                  <img src={product.images[0]} alt="Product thumbnail" />
                  <img src={product.images[0]} alt="Product thumbnail" />
                </div>
              </div>
              <div className="product-details">
                <div className="product-info">
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  <div className="reviews">
                    <span>
                      {product.rating}★ {product.numReviews} reviews
                    </span>
                  </div>
                  <div className="price">
                    <span className="original-price">
                      {product.discount === 0 ? "" : `${product.price} ETB`}
                    </span>
                    <span className="discounted-price">
                      {product.discount === 0
                        ? product.price
                        : product.discount}
                      <p> ETB</p>
                    </span>
                    <span className="discount">
                      -{((product.discount / product.price) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <hr />
                  <div className="size-options">
                    <span>Color:</span>
                    <button className="size-option pink"></button>
                    <button className="size-option green"></button>
                    <button className="size-option blue"></button>
                    <button className="size-option green"></button>
                    <button className="size-option blue"></button>
                  </div>
                  {/* From Uiverse.io by dldrs */}
                  <button className="add-to-cart">
                    <div className="default-btn">
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        stroke="#ffffff"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="cart-icon"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span>Add to Cart</span>
                    </div>
                    <div className="hover-btn">
                      <svg
                        viewBox="0 0 320 512"
                        width="12.5"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"
                          fill="#ffffff"
                        ></path>
                      </svg>
                      <span>
                        {product.discount === 0
                          ? product.price
                          : product.discount}
                      </span>
                    </div>
                  </button>
                  <div className="additional-info">
                    <span>
                      <img src="/asset/security.png" alt="SecurePayments" />
                      <p> Secure Payments</p>
                    </span>
                    <span>
                      <img src="/asset/free-delivery.png" alt="FreeShipping" />
                      <p> Free Shipping</p>
                    </span>
                    <span>
                      <img src="/asset/returning.png" alt="FreeReturns" />
                      <p> Free Returns</p>
                    </span>
                    <span>
                      <img
                        src="/asset/credit-card.png"
                        alt="Safety Certified"
                      />
                      <p> Safety Certified</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-tabs">
              <button>Details</button>
              <button>Shipping</button>
              <button>Returns</button>
            </div>
            <div className="product-description">
              <h2>Details</h2>
              <p>{product.description}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductPage;
