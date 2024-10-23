import React, { useState, useEffect } from "react";
import "./ShippingAddress.scss";

const regionCityMap = {
  "Addis Ababa": ["Addis Ababa"],
  Afar: ["Asayita", "Awash", "Dubti"],
  Amhara: ["Bahir Dar", "Gondar", "Debre Markos"],
  "Benishangul-Gumuz": ["Asosa", "Bambasi"],
  "Dire Dawa": ["Dire Dawa"],
  Gambela: ["Gambela", "Abobo"],
  Harari: ["Harar"],
  Oromia: ["Adama", "Jimma", "Shashamane"],
  Sidama: ["Hawassa"],
  Somali: ["Jijiga", "Gode"],
  SNNPR: ["Hawassa", "Arba Minch"],
  Tigray: ["Mekelle", "Axum"],
};

const ShippingAddress = ({ initialData, onSave }) => {
  const [input, setInput] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    region: initialData?.region || "",
    city: initialData?.city || "",
  });
  const [isEditable, setIsEditable] = useState(false);

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

  const handleRegionChange = (event) => {
    const { value } = event.target;
    setInput((values) => ({
      ...values,
      region: value,
      city: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(input);
    }
  };

  return (
    <div className="shippingAddress">
      <div className="headbar">
        <h3>Shipping Address</h3>
        <img
          src="/asset/icons8-edit.svg"
          alt="edit"
          onClick={() => setIsEditable(!isEditable)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="items" id="item1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={input.name}
            onChange={handleChange}
            readOnly={!isEditable} // Make input read-only if not editable
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
            readOnly={!isEditable} // Make input read-only if not editable
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
            readOnly={!isEditable} // Make input read-only if not editable
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
            readOnly={!isEditable} // Make input read-only if not editable
            required
          />
        </div>
        <div className="items" id="item5">
          <div id="states">
            <select
              name="region"
              id="state"
              value={input.region}
              onChange={handleRegionChange}
              readOnly={!isEditable} // Make input read-only if not editable
            >
              <option value="" disabled>
                Region
              </option>
              {Object.keys(regionCityMap).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div id="cities">
            <select
              name="city"
              id="city"
              value={input.city}
              onChange={handleChange}
              disabled={!input.region}
              readOnly={!isEditable} // Make input read-only if not editable
            >
              <option value="" disabled>
                City
              </option>
              {regionCityMap[input.region]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="items" id="item6">
          {isEditable && (
            <button type="submit">Confirm Shipping Address</button>
          )}{" "}
          {/* Show button only if editable */}
        </div>
      </form>
    </div>
  );
};

export default ShippingAddress;
