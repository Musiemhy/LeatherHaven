import React, { useEffect, useState } from "react";
import "./OrderConfirmationPage.scss";

const OrderConfirmationPage = (cartId) => {
  const [cartItem, setCartItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("", {
        params: { cartId },
      });
    };
  }, []);

  return (
    <div className="orderConfirmationPage">
      <h2> Order Summary </h2>
      <hr />

      <h3> Items </h3>
      <hr />
    </div>
  );
};

export default OrderConfirmationPage;
