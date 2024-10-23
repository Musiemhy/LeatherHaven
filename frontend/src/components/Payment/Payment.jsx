import React, { useState, useEffect } from "react";
import "./Payment.scss";

const Payment = ({ initialData, onSave }) => {
  const [input, setInput] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (initialData) {
      setInput({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
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
    <div className="payment">
      <div className="headbar">
        <h3>Payment</h3>
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
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={input.phone}
            onChange={handleChange}
            readOnly={!isEditable} // Make input read-only if not editable
            required
          />
        </div>
        <div className="items" id="item3">
          <label htmlFor="email">Email (optional)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            readOnly={!isEditable} // Make input read-only if not editable
          />
        </div>
        <div id="item4">
          {isEditable && (
            <button type="submit">Confirm Payment Information</button>
          )}{" "}
        </div>
      </form>
    </div>
  );
};

export default Payment;
