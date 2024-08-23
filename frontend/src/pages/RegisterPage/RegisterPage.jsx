import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

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
        navigate("/login");
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
      <div className="image"></div>
      <div className="data">
        <div className="links">
          <Link to="/login">
            <button> Login </button>
          </Link>
          <Link to="/">
            <button> Home </button>
          </Link>
        </div>
        <h1> Register Page </h1>
        <Link to="/login">
          <span> Already have an account? Go To Login </span>
        </Link>
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
            <div className="label">
              <label htmlFor="password"> Password: </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "#e56d4b",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div className="confirm_password">
            <div className="label">
              <label htmlFor="confirm_password"> Confirm Password: </label>
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  color: "#e56d4b",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                {confirmPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
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
