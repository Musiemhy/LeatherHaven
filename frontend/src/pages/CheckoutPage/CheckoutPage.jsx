import React, { useEffect, useState } from "react";
import "./CheckoutPage.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import ShippingAdress from "../../components/ShippingAdress/ShippingAdress";
import Payment from "../../components/Payment/Payment";

const CheckoutPage = () => {
  const { cartId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/getcart", {
          params: { cartId },
        });

        if (Array.isArray(response.data)) {
          setCartItems(response.data);

          // Fetch product details based on cart items
          const productIds = response.data.map((item) => item.product);
          const response1 = await axios.get(
            "http://localhost:5555/api/getproducts",
            {
              params: { productIds },
            }
          );

          if (Array.isArray(response1.data)) {
            setProductItems(response1.data);
          } else {
            console.error("Expected an array but got:", response1.data);
          }
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.log("The error is:", error);
      }
    };

    fetchItems();
  }, [cartId]);

  useEffect(() => {
    // Calculate the total price whenever cartItems or productItems change
    const total = cartItems.reduce((acc, cartItem) => {
      const productItem = productItems.find(
        (product) => product._id === cartItem.product
      );
      if (productItem) {
        const price = productItem.discount || productItem.price;
        return acc + price * cartItem.quantity;
      }
      return acc;
    }, 0);

    setTotalPrice(total);
  }, [cartItems, productItems]);

  return (
    <div className="checkoutPage">
      <div className="title">
        <h1>Secure Checkout</h1>
        <hr />
      </div>
      <div className="content">
        <div className="contentitems">
          <ShippingAdress />
          <Payment />
        </div>
        {cartItems.length === 0 ? (
          <div className="orderConfirmationPage">
            <p className="empty">Cart is Empty!</p>
          </div>
        ) : (
          <div className="orderConfirmationPage">
            <div className="heading">
              <h2>Order Summary</h2>
              <hr />
            </div>
            <div className="summary">
              <div className="data">
                <span className="title">Item Total</span>
                <span className="price">{totalPrice} ETB</span>
              </div>
              <div className="data">
                <span className="title">Shipping</span>
                <span className="price">300 ETB</span>
              </div>
              <div className="total">
                <div className="title">
                  <span>Total</span>
                  <p>Includes Shipping and Handling</p>
                </div>
                <span className="price">{totalPrice + 300} ETB</span>
              </div>
            </div>
            <div className="heading">
              <h3>Items({cartItems.length})</h3>
              <hr />
            </div>
            <div className="items">
              {cartItems.map((cartItem) => {
                const productItem = productItems.find(
                  (product) => product._id === cartItem.product
                );

                if (!productItem) return null;

                return (
                  <div className="cartitem" key={cartItem._id}>
                    <img src={productItem.images[0]} alt={productItem.name} />
                    <div className="detail">
                      <p>{productItem.name}</p>
                    </div>
                    <p className="price">
                      {productItem.discount
                        ? productItem.discount
                        : productItem.price}{" "}
                      ETB
                    </p>
                    <div className="measurments">
                      <div className="size">
                        SIZE: <p>{cartItem.size}</p>
                      </div>
                      <div className="quantity">
                        QUANTITY: <p>{cartItem.quantity}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
