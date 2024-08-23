import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import "./ProductPage.scss";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    if (!selectedOption) {
      alert("Please select a size.");
      return;
    }

    if (quantity < 1) {
      alert("Please select a valid quantity.");
      return;
    }

    try {
      const cartData = {
        user: user_id,
        items: [
          {
            product: product._id,
            size: selectedOption,
            quantity,
          },
        ],
      };

      console.log("Sending Cart Data:", cartData);

      const response = await axios.post(
        "http://localhost:5555/api/addcart",
        cartData
      );

      if (response.status === 201) {
        console.log("Product added to cart successfully");
        navigate(`/cartPage/${productId}`);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/getproductsId`,
          {
            params: { productId },
          }
        );

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

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const calculateDiscountPercentage = () => {
    return ((product.price - product.discount) / product.price) * 100;
  };

  return (
    <div>
      <main className="product-page">
        {!product ? (
          <div>Loading products...</div>
        ) : (
          <div key={product._id}>
            <nav className="breadcrumb">
              <a href="/">Home</a> &gt;{" "}
              <a href="/ProductList">{product.gender}</a> &gt;{" "}
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
                    {product.discount !== 0 && (
                      <span className="discount">
                        -{calculateDiscountPercentage().toFixed(2)}%
                      </span>
                    )}
                  </div>
                  <hr />
                  <div className="choice">
                    <div className="size">
                      <span>Size:</span>
                      <select
                        name="size"
                        id="size"
                        value={selectedOption}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Size
                        </option>
                        <option value="S"> S </option>
                        <option value="M"> M </option>
                        <option value="L"> L </option>
                        <option value="XL"> XL </option>
                      </select>
                    </div>
                    <div className="quantity">
                      <span>Quantity:</span>
                      <QuantitySelector
                        min={1}
                        max={product.stock}
                        initialValue={1}
                        step={1}
                        onQuantityChange={(newQuantity) =>
                          setQuantity(newQuantity)
                        }
                      />
                    </div>
                  </div>
                  <button className="add-to-cart" onClick={handleAddToCart}>
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
