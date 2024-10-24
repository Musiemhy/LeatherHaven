import React, { useEffect, useState } from "react";
import axios from "axios";
import ShippingAddress from "../../components/ShippingAddress/ShippingAddress";
import Payment from "../../components/Payment/Payment";
import "./CheckoutPage.scss";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/getcart", {
          params: { userId },
        });

        if (response.data && response.data.items) {
          setCartItems(response.data.items);
        } else {
          console.warn("No cart data found.");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/getuserbyid",
          { params: { userId } }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCart();
    fetchUser();
  }, [userId]);

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  const handleShippingSave = (data) => {
    setShippingData(data);
    toast.success("Shipping address successfully saved.");
  };

  const handlePaymentSave = (data) => {
    setPaymentData(data);
    toast.success("Payment method successfully saved.");
  };

  const calculateTotals = () => {
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalItems += item.quantity;
      totalPrice +=
        item.quantity * (item.product.discount || item.product.price);
    });

    setTotalItems(totalItems);
    setTotalPrice(totalPrice);
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5555/api/addorder", {
        User: userId,
        items: cartItems,
        totalPrice: totalPrice,
        shippingAddress: shippingData,
        payment: paymentData,
      });
      toast.success(
        "Order added successfully, being redirected to chapa payment."
      );

      setCartItems([]);

      await axios.post("http://localhost:5555/api/clearcart", { userId });
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkoutPage">
      <div className="title">
        <h1>Secure Checkout</h1>
        <hr />
      </div>
      <div className="content">
        <div className="contentitems">
          <ShippingAddress initialData={user} onSave={handleShippingSave} />
          <Payment initialData={user} onSave={handlePaymentSave} />
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
              <h3>Items ({totalItems})</h3>
              <hr />
            </div>
            <div className="items">
              {cartItems.map((item) => (
                <div className="cartitem" key={item._id}>
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div className="detail">
                    <p>{item.product.name}</p>
                  </div>
                  <p className="price">
                    {item.product.discount * item.quantity ||
                      item.product.price * item.quantity}{" "}
                    ETB
                  </p>
                  <div className="measurements">
                    {item.size && (
                      <div className="size">
                        SIZE: <p>{item.size}</p>
                      </div>
                    )}
                    <div className="quantity">
                      QUANTITY: <p>{item.quantity}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button type="submit" className="placeOrder" onClick={handleSave}>
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
