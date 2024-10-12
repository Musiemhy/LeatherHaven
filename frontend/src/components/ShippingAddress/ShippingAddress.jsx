import React, { useState, useEffect } from "react";
import "./ShippingAddress.scss";

const ShippingAddress = ({ initialData, onSave }) => {
  const [input, setInput] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    region: initialData?.region || "",
    city: initialData?.city || "",
  });

  useEffect(() => {
    if (initialData) {
      setInput({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        region: initialData.region || "",
        city: initialData.city || "",
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(input);
    }
  };

  return (
    <div className="shippingAddress">
      <h3>Shipping Address</h3>
      <form onSubmit={handleSubmit}>
        <div className="items" id="item1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={input.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="items" id="item2">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={input.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="items" id="item3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <div className="items" id="item4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={input.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="items" id="item5">
          <div id="states">
            <select
              name="region"
              id="state"
              value={input.region}
              onChange={handleChange}
            >
              <option value="" disabled>
                Region
              </option>
            </select>
          </div>
          <div id="cities">
            <select
              name="city"
              id="city"
              value={input.city}
              onChange={handleChange}
            >
              <option value="" disabled>
                City
              </option>
            </select>
          </div>
        </div>
        <div className="items" id="item6">
          <button type="submit">Confirm Address</button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddress;
