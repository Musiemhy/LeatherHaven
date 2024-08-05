import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <img src="" alt="logo" />
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
