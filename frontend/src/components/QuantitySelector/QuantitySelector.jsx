import React, { useState, useEffect } from "react";
import "./QuantitySelector.scss";

const QuantitySelector = ({
  min,
  max,
  initialValue,
  step,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialValue);

  // Update internal state when initialValue prop changes
  useEffect(() => {
    setQuantity(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <select value={quantity} onChange={handleChange} className="select">
      <option value="" disabled>
        Quantity
      </option>
      {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default QuantitySelector;
