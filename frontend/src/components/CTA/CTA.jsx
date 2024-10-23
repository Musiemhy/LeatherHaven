import React from "react";
import { Link } from "react-router-dom";
import "./CTA.scss";
const CTA = () => {
  return (
    <section className="Cta">
      <h1> Experience the Luxury of Handcrafted Leather </h1>
      <p>
        Discover the elegance and durability that only premium leather can
        provide.
      </p>
      <Link to="/ProductList">
        <button> Shop Now </button>
      </Link>
    </section>
  );
};

export default CTA;
