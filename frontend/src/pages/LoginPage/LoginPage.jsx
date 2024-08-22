import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const formSubmission = async (event) => {
    event.preventDefault();
    setError(null); // Reset error before submission

    try {
      const response = await axios.get("http://localhost:5555/api/getuser", {
        params: inputs,
      });

      if (response.data) {
        localStorage.setItem("user_id", response.data._id);
        alert("Successfully logged in. Redirecting to the homepage.");
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("The error is: ", error);
      setError("An error occurred during login. Please try again.");
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          {error && <span className="error">{error}</span>}
          <button type="submit">Login</button>
        </form>
        <Link to="/forgot-password">
          <span>Forgot Password</span>
        </Link>
        <Link to="/register">
          <span>Don't have an account? Go to Register</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
