import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.scss";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const formSubmission = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5555/api/adduser",
        inputs
      );
      if (response.data.message === "registered") {
        alert("Successfully registered. Being redirected to login page.");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log("The error is: ", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="registerPage">
      <div className="data">
        <form onSubmit={formSubmission}>
          <div className="name">
            <label htmlFor="name"> Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className="email">
            <label htmlFor="email"> Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className="phone">
            <label htmlFor="phone"> Phone: </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
            />
          </div>
          <div className="password">
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div className="confirm_password">
            <label htmlFor="confirm_password"> Confirm Password: </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={inputs.confirm_password}
              onChange={handleChange}
            />
          </div>
          <span className="error"> {error} </span>
          <button type="submit"> Register </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
