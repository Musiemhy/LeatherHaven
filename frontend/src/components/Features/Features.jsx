import React from "react";
import "./Features.scss";
const Features = () => {
  return (
    <section className="features">
      <div className="features-item">
        <div className="item1">
          <img src="/asset/craftsmanship.png" alt="item1" />
          <div className="item-text">
            <h4> Unmatched Craftsmanship </h4>
            <p>
              Crafted from the finest leather, ensuring durability and luxury.
            </p>
          </div>
        </div>
        <div className="item2">
          <img src="/asset/time.jpg" alt="item2" />
          <div className="item-text">
            <h4> Style That Endures </h4>
            <p>Designs that never go out of fashion.</p>
          </div>
        </div>
        <div className="item3">
          <img src="/asset/handle-with-care.png" alt="item3" />
          <div className="item-text">
            <h4> Delivered with Care </h4>
            <p>Packaging that protects, service that ensures peace of mind.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
