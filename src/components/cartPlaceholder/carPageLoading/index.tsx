import React from "react";
// import "./carPageLoading.scss";

const CarPageLoading = () => {
  return (
    <>
      <div className="slider Gradient" />
      <article className="responsive Car_page_container_loading">
        <section className="carInfo_container">
          <h1 className="Gradient"></h1>
          <h4 className="Gradient"></h4>
          <h2 className="Gradient"></h2>
          <p className="Gradient"></p>
          <p className="Gradient"></p>
          <h2 className="Gradient"></h2>
          <span className="Gradient"></span>
        </section>

        <section className="onwnerInfo_container">
          <div className="avg_discounted_price_per_day Gradient"></div>

          <figure className="owner_part Gradient"></figure>
          <div className="continue_to_checkout Gradient"></div>
        </section>
      </article>
    </>
  );
};
export default CarPageLoading;
