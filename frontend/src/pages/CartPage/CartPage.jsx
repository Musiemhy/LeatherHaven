import React from "react";
import { useParams } from "react-router-dom";
import "./CartPage.scss";
import CartItem from "../../components/CartItem/CartItem";

const CartPage = () => {
  const { productId } = useParams();

  return (
    <div className="cartPage">
      <div className="title">
        <h3> Your Items </h3>
      </div>
      <div className="content">
        <div className="cart">
          <CartItem productId={productId} />
          <hr />
        </div>
        <div className="summary">
          <div className="summary_text">
            <h4> Order Summary </h4>
            <hr />
            <div className="description">
              <p> Item Total </p>
              <p> </p>
            </div>
            <div className="description_total">
              <p> Cart Total </p>
              <p className="price"> ETB </p>
            </div>
          </div>
          {/* From Uiverse.io by Pawelitto */}
          <div className="container">
            <div className="left-side">
              <div className="card">
                <div className="card-line"></div>
                <div className="buttons"></div>
              </div>
              <div className="post">
                <div className="post-line"></div>
                <div className="screen">
                  <div className="dollar"> ETB </div>
                </div>
                <div className="numbers"></div>
                <div className="numbers-line2"></div>
              </div>
            </div>
            <div className="right-side">
              <div className="new">Checkout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
