import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CartPage.scss";
import CartItem from "../../components/CartItem/CartItem";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/getcart", {
          params: { userId },
        });

        if (response.data && response.data._id) {
          setCartItems([response.data]);
          setCartIds([response.data._id]);
          calculateTotals([response.data]);
        } else if (Array.isArray(response.data)) {
          setCartItems(response.data);
          const ids = response.data.map((cart) => cart._id);
          setCartIds(ids);
          calculateTotals(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.log("The error is:", error);
      }
    };

    fetchCarts();
  }, [userId]);

  const calculateTotals = (cartItems) => {
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      cartItem.items.forEach((item) => {
        totalItems += item.quantity;
        totalPrice +=
          item.quantity *
          (item.product.discount ? item.product.discount : item.product.price);
      });
    });

    setTotalItems(totalItems);
    setTotalPrice(totalPrice);
  };

  return (
    <div className="cartPage">
      <div className="title">
        <h3>Your Items</h3>
      </div>
      <div className="content">
        <div className="cart_items">
          <hr />
          {cartItems.length === 0 ? (
            <p>Cart is Empty!</p>
          ) : (
            cartItems.map((cartItem) => (
              <div key={cartItem._id} className="cart">
                {cartItem.items.map((item) => (
                  <CartItem
                    key={item.product}
                    productId={item.product}
                    quantity={item.quantity}
                    size={item.size}
                  />
                ))}
                <hr />
              </div>
            ))
          )}
        </div>
        <div className="summary">
          <div className="summary_text">
            <h4> Order Summary </h4>
            <hr />
            <div className="description">
              <p> Item Total: </p>
              <p> {totalItems} items </p>
            </div>
            <div className="description_total">
              <p> Cart Total: </p>
              <p className="price"> {totalPrice} ETB </p>
            </div>
          </div>
          <Link to={`/checkout/${userId}`}>
            <div className="container">
              <div className="left-side">
                <div className="card">
                  <div className="card-line"></div>
                  <div className="buttons"></div>
                </div>
                <div className="post">
                  <div className="post-line"></div>
                  <div className="screen">
                    <div className="dollar">ETB</div>
                  </div>
                  <div className="numbers"></div>
                  <div className="numbers-line2"></div>
                </div>
              </div>
              <div className="right-side">
                <div className="new">Checkout</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
