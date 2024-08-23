import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartItem.scss";

const CartItem = ({ productId, onCartNumberChange }) => {
  const [cartItem, setCartItem] = useState(null); // Initially null
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/getproductsId`,
          { params: { productId } }
        );
        if (response.data && response.data._id) {
          // Check for object
          setCartItem(response.data);
          onCartNumberChange([response.data._id]); // Wrap in array
        } else {
          console.error("Expected an object but got:", response.data);
        }
      } catch (error) {
        setError("Unable to fetch cart items");
        console.log("Error during fetch items: ", error);
      }
    };

    fetchItems();
  }, [productId, onCartNumberChange]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="cartItems">
      {!cartItem ? (
        <p>Cart is Empty</p>
      ) : (
        <div className="cartitem" key={cartItem._id}>
          <img src={cartItem.images[0]} alt={cartItem.name} />
          <div className="detail">
            <p>{cartItem.name}</p>
          </div>
          <p className="price">
            {cartItem.discount ? cartItem.discount : cartItem.price} ETB
          </p>
        </div>
      )}
    </div>
  );
};

export default CartItem;
