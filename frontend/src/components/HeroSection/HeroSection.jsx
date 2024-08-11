import React from "react";
import Header from "../../components/Header/Header";
import "./HeroSection.scss";

const HeroSection = () => {
  return (
    <div className="Herosection">
      <Header />
      <div className="HeroItems">
        <h1>Welcome to LeatherHaven</h1>
        <p>Your one-stop shop for premium leather products</p>
        <button className="CTA">Shop Now</button>
      </div>
    </div>
  );
};

export default HeroSection;
