import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartItem.scss";

const CartItem = ({ productId, quantity, size, cartId, onDelete }) => {
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

  const deleteCart = async () => {
    try {
      await axios.delete("http://localhost:5555/api/deletecart", {
        params: { cartId, itemId: productId },
      });

      onDelete(cartId, productId); // Notify parent about the deletion
    } catch (error) {
      console.error("Error deleting cart item:", error);
      setError("Unable to delete the cart item");
    }
  };

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
              <div className="choice_items">
                <p>Size: </p>
                <select name="size" id="size">
                  <option value={`${size}`}>{size}</option>
                </select>
              </div>
              <div className="choice_items">
                <p>Quantity: </p>
                <select name="" id="">
                  <option value={`${quantity}`}>{quantity}</option>
                </select>
              </div>
            </div>
          </div>
          <p className="price">
            {product.discount
              ? product.discount * quantity
              : product.price * quantity}{" "}
            ETB
          </p>
          <span className="delete" onClick={deleteCart}>
            X
          </span>
        </div>
      )}
      <hr />
    </div>
  );
};

export default CartItem;
