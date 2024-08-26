import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartItem.scss";

const CartItem = ({ productId, quantity, size }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/getproductsId`,
          { params: { productId } }
        );

        if (response.data && response.data._id) {
          setProduct(response.data);
        } else {
          console.error("Expected an object but got:", response.data);
        }
      } catch (error) {
        setError("Unable to fetch product details");
        console.log("Error during fetch: ", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="cartItem">
      {!product ? (
        <p>Loading...</p>
      ) : (
        <div className="cartitem-content">
          <img src={product.images[0]} alt={product.name} />
          <div className="detail">
            <p>{product.name}</p>
            <div className="choice">
              <p>Size: {size}</p>
              <p>Quantity: {quantity}</p>
            </div>
          </div>
          <p className="price">
            {product.discount ? product.discount : product.price} ETB
          </p>
        </div>
      )}
    </div>
  );
};

export default CartItem;
