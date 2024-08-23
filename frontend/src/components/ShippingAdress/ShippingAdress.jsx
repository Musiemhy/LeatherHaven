import React from "react";
import "./ShippingAdress.scss";

const ShippingAdress = () => {
  return (
    <div className="shippingAdress">
      <h3> Shipping Adress </h3>
      <form action="">
        <div className="items" id="item1">
          <label htmlFor="fname"> First Name </label>
          <input type="text" id="fname" name="fname" />
        </div>
        <div className="items" id="item2">
          <label htmlFor="lname"> Last Name </label>
          <input type="text" id="lname" name="lname" />
        </div>
        <div className="items" id="item3">
          <label htmlFor="email"> Email </label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="items" id="item4">
          <label htmlFor="phone"> Phone </label>
          <input type="number" id="phone" name="phone" />
        </div>
        <div className="items" id="item5">
          <label htmlFor="adress"> Adress </label>
          <input type="text" id="adress" name="adress" />
        </div>
        <div id="item6">
          <div id="states">
            <select name="state" id="state">
              <option value="" disabled>
                Region
              </option>
            </select>
          </div>
          <div id="cities">
            <select name="city" id="city">
              <option value="" disabled>
                City
              </option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingAdress;
