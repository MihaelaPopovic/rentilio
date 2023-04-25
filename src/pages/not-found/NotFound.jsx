import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="wrapper">
      <div className="width-wrapper column">
        <div className="image-wrapper">
          <img
            alt="404"
            draggable="false"
            className="picture"
            src="./404.svg"
          />
        </div>
        <div className="text-wrapper">
          <h2>Whoops! Lost in Space?</h2>
          <p>The page you're looking for isn't found :(</p>
          <p>We suggest you back to home</p>
          <Link to="/">
            <button aria-label="home" className="btn btn-outline">
              Go to home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
