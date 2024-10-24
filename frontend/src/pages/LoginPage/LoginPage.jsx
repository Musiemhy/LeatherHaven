import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const formSubmission = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5555/api/getuser",
        inputs
      );

      if (response.data) {
        sessionStorage.setItem("user_id", response.data._id);
        sessionStorage.setItem("name", response.data.name);
        sessionStorage.setItem("loggedIn", true);
        toast.success("Successfully logged in. Redirecting to the homepage.");
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("The error is: ", error);
      setError("An error occurred during login. Please try again.");
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="loginPage">
      <div className="image"></div>
      <div className="data">
        <div className="links">
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
        <h1>Login Page</h1>
        <Link to="/register">
          <span>Don't have an account? Create an Account</span>
        </Link>
        <form onSubmit={formSubmission}>
          <div className="name">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className="password">
            <div className="label">
              <label htmlFor="password">Password:</label>
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
          {error && <span className="error">{error}</span>}
          <button type="submit"> Login </button>
        </form>
        <Link to="/forgot-password">
          <span> Forgot Password? </span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
