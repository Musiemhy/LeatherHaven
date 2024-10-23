import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CartPage.scss";
import CartItem from "../../components/CartItem/CartItem";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const userId = sessionStorage.getItem("user_id");
  console.log("userId", userId);

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
    let totalItem = 0;
    let totalPrices = 0;

    cartItems.forEach((cartItem) => {
      cartItem.items.forEach((item) => {
        const itemQuantity = parseInt(item.quantity, 10);
        totalItem += itemQuantity;
        const itemPrice = item.product.discount
          ? item.product.discount
          : item.product.price;
        totalPrices += itemQuantity * itemPrice;
      });
    });

    setTotalItems(totalItem);
    setTotalPrice(totalPrices);
  };

  const handleItemUpdate = (cartId, productId, newQuantity, newSize) => {
    setCartItems((prevItems) => {
      const updatedCarts = prevItems.map((cart) => {
        if (cart._id === cartId) {
          return {
            ...cart,
            items: cart.items.map((item) => {
              if (item.product === productId) {
                return { ...item, quantity: newQuantity, size: newSize };
              }
              return item;
            }),
          };
        }
        return cart;
      });

      calculateTotals(updatedCarts);
      return updatedCarts;
    });
  };

  const handleCheckout = async () => {
    try {
      const currentCartItems = [...cartItems];

      await Promise.all(
        currentCartItems.map(async (cartItem) => {
          await Promise.all(
            cartItem.items.map(async (item) => {
              await axios.post("http://localhost:5555/api/updatecart", {
                cartId: cartItem._id,
                itemId: item._id,
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

  const handleItemDelete = async (cartId, deletedItemId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5555/api/deletecart",
        {
          params: { cartId: cartId, itemId: deletedItemId },
        }
      );

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems
            .map((cart) => ({
              ...cart,
              items: cart.items.filter((item) => item._id !== deletedItemId),
            }))
            .filter((cart) => cart.items.length > 0)
        );
        calculateTotals();
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="cartPage">
      <div className="title">
        <h3>Your Items</h3>
      </div>
      <div className="content">
        <div className="cart_items">
          <hr />
          {cartItems.every((cartItem) => cartItem.items.length === 0) ? (
            <p>Cart is Empty!</p>
          ) : (
            cartItems.map((cartItem) => (
              <div key={cartItem._id} className="cart">
                {cartItem.items.map((item) => (
                  <div key={item._id} className="cart-item">
                    <CartItem
                      productId={item.product}
                      quantity={item.quantity}
                      size={item.size}
                      cartId={cartItem._id}
                      itemId={item._id}
                      onQuantityChange={handleItemUpdate}
                    />
                    <span
                      className="delete"
                      onClick={() => handleItemDelete(cartItem._id, item._id)}
                    >
                      X
                    </span>
                  </div>
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
          {cartItems.every((cartItem) => cartItem.items.length === 0) ? (
            <div onClick={() => toast.error("Cart is empty!")}>
              {" "}
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
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
