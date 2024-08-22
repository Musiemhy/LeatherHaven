import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartItem.scss";

const CartItem = ({ productId }) => {
  const [cartItem, setCartItem] = useState([]);
  const [productdetail, setProductdetail] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/getproductsId`,
          {
            params: { productId },
          }
        );
        if (Array.isArray(response.data)) {
          setCartItem(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        setError("Unable to fetch cart items");
        console.log("Error during fetch items: ", error);
      }
    };

    fetchItems();
  }, [productId]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="cartItems">
      {cartItem.length === 0 ? (
        <p>Cart is Empty</p>
      ) : (
        cartItem.map((cartitem) => (
          <div className="cartitem" key={cartitem._id}>
            <img src={cartitem.images[0]} alt={cartitem.name} />
            <div className="detail">
              <p>{cartitem.name}</p>
              {productdetail.map((productdetails) => (
                <div className="choice">
                  <select name="size" id="size" value={selectedOption}>
                    onChange={handleChange}
                    <option value={productdetails.size} disabled>
                      {productdetails.size}
                    </option>
                    <option value="S"> S </option>
                    <option value="M"> M </option>
                    <option value="L"> L </option>
                    <option value="XL"> XL </option>
                  </select>
                  <select name="quantity" id="quantity" value={selectedOption}>
                    onChange={handleChange}
                    <option value={productdetails.quantity} disabled>
                      {productdetails.quantity}
                    </option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              ))}
            </div>
            <p className="price">
              {cartitem.discount ? cartitem.discount : cartitem.price} ETB
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItem;
