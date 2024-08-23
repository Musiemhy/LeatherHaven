import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CartPage.scss";
import CartItem from "../../components/CartItem/CartItem";
import axios from "axios";

const CartPage = () => {
  const [cartIds, setCartIds] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const userId = localStorage.getItem("user_id");

  let productId = [];

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/getcart", {
          params: { userId },
        });
        if (response.data && response.data._id) {
          // Check for object
          setCartItem(response.data);
          onCartNumberChange([response.data._id]); // Wrap in array
        } else {
          console.error("Expected an object but got:", response.data);
        }
      } catch (error) {
        console.log("The error is: ", error);
      }
    };
  }, []);

  const handleCartNumberChange = (newCartIds) => {
    setCartIds((prevCartIds) => [...prevCartIds, ...newCartIds]);
  };

  return (
    <div className="cartPage">
      <div className="title">
        <h3>Your Items</h3>
      </div>
      <div className="content">
        {cartItem.map((cartitem) => (
          <div key={cartitem._id}>
            {cartitem.items.forEach((item) => {
              productId = item.product;
            })}
          </div>
        ))}
        <div className="cart">
          <CartItem
            productId={productId}
            onCartNumberChange={handleCartNumberChange}
          />
          <hr />
        </div>

        <div className="summary">
          <Link to={`/checkout/${cartIds.join(",")}`}>
            <div className="container">
              <div className="left-side">
                <div className="card">
                  <div className="card-line"></div>
                  <div className="buttons"></div>
                </div>
                <div className="post">
                  <div className="post-line"></div>
                  <div className="screen">
                    <div className="dollar"> ETB </div>
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
