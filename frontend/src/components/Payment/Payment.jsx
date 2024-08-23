import React from "react";
import "./Payment.scss";

const Payment = () => {
  return (
    <div className="payment">
      <h3>Payment</h3>
      <form action="">
        <div className="items" id="item1">
          <label for="first_name">First Name</label>
          <input type="text" id="first_name" name="first_name" value="" />
        </div>
        <div className="items" id="item2">
          <label for="last_name">Last Name</label>
          <input type="text" id="last_name" name="last_name" value="" />
        </div>
        <div className="items" id="item3">
          <label for="phone_number">Phone Number</label>
          <input type="text" id="phone_number" name="phone_number" required />
        </div>
        <div className="items" id="item4">
          <label for="email">Email*(optional)</label>
          <input type="email" id="email" name="email" value="" />
        </div>
        <div id="item5">
          <button type="submit"> Place Order </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
