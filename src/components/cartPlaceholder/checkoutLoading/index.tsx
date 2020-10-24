import React from "react";
// import "./checkoutLoading.scss";

const Checkout_Container_Loader = () => {
  return (
    <article className="responsive Checkout_container_loader">
      <section className="car_info_insurance">
        <div className="Date_container">
          <p className="Gradient"></p>
          <p className="Gradient"></p>
        </div>
        <div className="car_info">
          <div className="car_owner_part">
            <div>
              <h1 className="Gradient"></h1>
              <h4 className="Gradient"></h4>
              <figure className="owner_part Gradient"></figure>
            </div>
            <figure className="car_image Gradient"></figure>
          </div>
          <h2 className="Gradient"></h2>
          <p className="Gradient"></p>
          <h2 className="Gradient"></h2>
          <p className="Gradient"></p>
          <h2 className="Gradient"></h2>
          <p className="Gradient"></p>
        </div>
      </section>
      <section className="payment_info_container">
        <div className="Date_container">
          <p className="Gradient"></p>
          <p className="Gradient"> </p>
        </div>
        <p className="number_of_days Gradient"></p>
        <div className="payment_information">
          <p>
            <span className="Gradient"></span>
            <span className="Gradient"></span>
          </p>
          <p>
            <span className="Gradient"></span>
            <span className="Gradient"></span>
          </p>
          <p className="total_price">
            <span className="Gradient"></span>
            <span className="Gradient"></span>
          </p>
        </div>
        <div className="continue_to_pay Gradient"></div>
      </section>
    </article>
  );
};

export default Checkout_Container_Loader;
