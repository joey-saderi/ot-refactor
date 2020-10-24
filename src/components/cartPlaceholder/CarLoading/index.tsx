import React from "react";
// import "./car_cart.scss";

const CarLoading = () => {
  return (
    <div className="car_card_Loading">
      <figure className="Gradient"></figure>
      <div className="info_box">
        <div className="car_brand Gradient"></div>
        <div className="price Gradient"></div>
        <ul className="tags_container">
          <li className="Gradient">
            <span></span>
          </li>
          <li className="Gradient">
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CarLoading;
