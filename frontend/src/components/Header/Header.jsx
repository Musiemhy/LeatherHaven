import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Header.scss";
import CartIcon from "../../assets/CartIcon";
import Profile from "../Dropdown/Profile";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const hasLoggedIn = sessionStorage.getItem("loggedIn");
  const name = sessionStorage.getItem("name");
  const userId = sessionStorage.getItem("userId");
  const [isClicked, setIsClicked] = useState(false);

  // useEffect(() => {
  //   if (!hasLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [hasLoggedIn, navigate]);

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      sessionStorage.clear();
      toast.info("You have been logged out due to inactivity.");
      navigate("/login");
    }, 30 * 60 * 1000);

    return () => clearTimeout(logoutTimer);
  }, [navigate]);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <header className={isHomePage ? "HeaderHome" : "header"}>
        <img src="/asset/logo.webp" alt="logo" />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {hasLoggedIn ? (
            <Link to="/cartPage">
              <CartIcon />
            </Link>
          ) : (
            <div onClick={() => toast.info("Please log in to view your cart.")}>
              <CartIcon />
            </div>
          )}

          {hasLoggedIn ? (
            <div className="profile">
              <button className="button" onClick={toggleClick}>
                <div className="bgContainer">
                  <span>{name}</span>
                  <span>{name}</span>
                </div>
              </button>
            </div>
          ) : (
            <Link to="/login">
              <div className="profile">
                <button className="button">
                  <div className="bgContainer">
                    <span>LOGIN</span>
                    <span>LOGIN</span>
                  </div>
                  <div className="arrowContainer">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 45 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M43.7678 20.7678C44.7441 19.7915 44.7441 18.2085 43.7678 17.2322L27.8579 1.32233C26.8816 0.34602 25.2986 0.34602 24.3223 1.32233C23.346 2.29864 23.346 3.88155 24.3223 4.85786L38.4645 19L24.3223 33.1421C23.346 34.1184 23.346 35.7014 24.3223 36.6777C25.2986 37.654 26.8816 37.654 27.8579 36.6777L43.7678 20.7678ZM0 21.5L42 21.5V16.5L0 16.5L0 21.5Z"
                        fill="white"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </Link>
          )}
        </nav>
      </header>
      {isClicked &&
        ReactDOM.createPortal(
          <div
            className={hasLoggedIn ? "profile-detail" : "profile-detail-home "}
          >
            <Profile />
          </div>,
          document.getElementById("profile-portal")
        )}
    </>
  );
};

export default Header;
