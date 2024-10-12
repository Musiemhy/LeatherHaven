import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CartPage.scss";
import CartItem from "../../components/CartItem/CartItem";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { userId } = useParams();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/getcart", {
          params: { userId },
        });

        if (response.data && response.data._id) {
          setCartItems([response.data]);
        } else if (Array.isArray(response.data)) {
          setCartItems(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.log("The error is:", error);
      }
    };

    fetchCarts();
  }, [userId]);

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  const calculateTotals = () => {
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

  const handleCheckout = async () => {
    try {
      await Promise.all(
        cartItems.map(async (cartItem) => {
          await Promise.all(
            cartItem.items.map(async (item) => {
              await axios.post("http://localhost:5555/api/updatecart", {
                cartId: cartItem._id,
                size: item.size,
                quantity: item.quantity,
              });
            })
          );
        })
      );
      window.location.href = "/checkout";
    } catch (error) {
      console.log("Error during checkout: ", error);
    }
  };

  const handleItemDelete = (cartId, deletedItemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cart) => ({
          ...cart,
          items: cart.items.filter((item) => item._id !== deletedItemId),
        }))
        .filter((cart) => cart.items.length > 0)
    );
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
                    key={item._id}
                    productId={item.product}
                    quantity={item.quantity}
                    size={item.size}
                    cartId={cartItem._id}
                    onDelete={handleItemDelete}
                  />
                ))}
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
          <Link to={`/checkout/${userId}`} onClick={handleCheckout}>
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
