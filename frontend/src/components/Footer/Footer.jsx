import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <footer className={isHomePage ? "FooterHome" : "footer"}>
      <p>&copy; 2024 LeatherHaven. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
