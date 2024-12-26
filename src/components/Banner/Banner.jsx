import React from "react";
import "./Banner.css"; // Import the CSS file for styling

const Banner = () => {
  return (
    <div className="banner-container">
      <img
        src='/bn.webp' // Use your image URL here
        alt="Banner"
        className="banner-image"
        width='1600'
        height='588'
      />
      </div>
  );
};

export default Banner;
