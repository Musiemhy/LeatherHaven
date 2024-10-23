import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./HeroSection.scss";

const HeroSection = () => {
  return (
    <div className="Herosection">
      <Header />
      <div className="HeroItems">
        <h1>Welcome to LeatherHaven</h1>
        <p>Your one-stop shop for premium leather products</p>
        <Link to="/ProductList">
          <button className="CTA">Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
