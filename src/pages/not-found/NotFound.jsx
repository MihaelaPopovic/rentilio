import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";
import { Button } from "antd";

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
            <Button type="primary" >Go to home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
