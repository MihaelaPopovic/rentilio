import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import "./Navigation.scss";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <p className="logo"> Rentilio </p>
        <ul className="list">
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/rent">
              Rent
            </Link>
          </li>
          <li>
            <Link className="link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
        <div className="mobile">
          <button
            id="hamburger"
            className={isMenuOpen ? "open" : ""}
            onClick={() => {
              setIsMenuOpen(true);
            }}
          >
            <CiMenuFries className="nav-icon" />
          </button>
          <button
            id="close"
            className={isMenuOpen ? "open" : ""}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <AiOutlineClose className="nav-icon" />
          </button>
          <div id="menu" className={isMenuOpen ? "open" : ""}>
            <Link className="link" to="/">
              Home
            </Link>
            <Link className="link" to="/rent">
              Rent
            </Link>
            <Link className="link" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navigation;
