import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CartItem.scss";

const CartItem = ({
  productId,
  quantity,
  size,
  cartId,
  onDelete,
  onQuantityChange,
}) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(size);
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    onQuantityChange(cartId, productId, selectedQuantity, e.target.value);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setSelectedQuantity(newQuantity);
    onQuantityChange(cartId, productId, newQuantity, selectedSize);
  };

  const calculatePrice = () => {
    return product.discount
      ? product.discount * selectedQuantity
      : product.price * selectedQuantity;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="cartItem">
      <div className="cartitem-content">
        {product.images && product.images.length > 0 && (
          <img src={product.images[0]} alt={product.name} />
        )}
        <div className="detail">
          <p>{product.name}</p>
          <div className="choice">
            {selectedSize && (
              <div className="choice_items">
                <p>Size: </p>
                <select
                  name="size"
                  value={selectedSize}
                  onChange={handleSizeChange}
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            )}

            <div className="choice_items">
              <p>Quantity: </p>
              <select value={selectedQuantity} onChange={handleQuantityChange}>
                {Array.from({ length: product.stock }, (_, i) => i + 1).map(
                  (qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
        <p className="price">{calculatePrice()} ETB</p>
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
