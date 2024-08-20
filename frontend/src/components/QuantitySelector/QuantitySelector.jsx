import React, { useState } from "react";
import "./QuantitySelector.scss";

const QuantitySelector = ({ min, max, initialValue, step }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  return (
    <select value={quantity} onChange={handleChange} className="select">
      {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default QuantitySelector;
