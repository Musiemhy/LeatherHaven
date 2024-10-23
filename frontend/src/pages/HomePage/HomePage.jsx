import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import Story from "../../components/Story/Story";
import Testimonials from "../../components/Testimonials/Testimonials";
import CTA from "../../components/CTA/CTA";
import Features from "../../components/Features/Features";
import ProductSection from "../../components/ProductSection/ProductSection";
import Footer from "../../components/Footer/Footer";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="Homepage">
      <HeroSection />
      <ProductSection />
      <Story />
      <Testimonials />
      <CTA />
      <Features />
      <Footer />
    </div>
  );
};

export default HomePage;
