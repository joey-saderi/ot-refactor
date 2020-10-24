import React, { useState } from "react";
import Link from "next/link";
import carImage from "../../../../../public/image/car-image-thumbnail.jpg";
import Router from "next/router";
// import "./car.scss";

const Car = ({ data, showLocation, tagClick, language }: ICar) => {
  const [heightController, setheightController] = useState(0);

  const {
    id,
    search_id,
    total_discount_percent,
    has_system_discount,
    media_set,
    car,
    year,
    avg_discounted_price_per_day_name,
    avg_discounted_price_per_day,
    deliver_at_renters_place,
    with_driver,
    is_promoted,
    has_media,
    location,
  } = data;

  let img = has_media ? media_set[0].thumbnail_url : carImage;
  let imageWidth = has_media ? media_set[0].thumbnail_width : null;
  let imageHeight = has_media ? media_set[0].thumbnail_height : null;
  let title = car.brand.name.fa + " " + car.name.fa;
  let link = `/car/${id}?search_id=${search_id}`;
  let price =
    avg_discounted_price_per_day >= 10000000
      ? avg_discounted_price_per_day >= 10100000
        ? avg_discounted_price_per_day_name.slice(0, 4)
        : avg_discounted_price_per_day_name.slice(0, 2)
      : avg_discounted_price_per_day >= 1000000
      ? avg_discounted_price_per_day_name.slice(2, 3) === "۰"
        ? avg_discounted_price_per_day_name.toString().slice(0, 1)
        : avg_discounted_price_per_day_name.toString().slice(0, 3)
      : avg_discounted_price_per_day < 100000
      ? avg_discounted_price_per_day.toString().slice(0, 2)
      : avg_discounted_price_per_day.toString().slice(0, 3);

  let unit =
    avg_discounted_price_per_day >= 1000000
      ? language.search_result_section.car.million
      : language.search_result_section.car.thousand;
  return (
    <div className="carCart HEAP_SearchResult_Card_Car">
      {/* <Link href={link}> */}
      {/* <a className={`CAR_CART_${title}`}> */}
      <div
        className="card_wrapper"
        onClick={() => {
          Router.push(link);
        }}
      >
        <figure>
          {total_discount_percent > 0 && (
            <span className="discount_badge">
              {total_discount_percent}
              {language.search_result_section.car.discount}
            </span>
          )}
          {is_promoted && (
            <span className="Special">
              {language.search_result_section.car.special}
            </span>
          )}
          {has_media ? (
            <img
              style={{
                position: "absolute",
                // control the top position of the image by "setheightController()"
                top: -heightController + "px",
              }}
              src={img}
              className="img-fluid"
              alt={title}
              onLoadCapture={(e) => {
                e.persist();
                // adjust the image at the center of division container
                if (imageHeight > 200) {
                  setheightController(imageHeight - 200);
                }
              }}
            />
          ) : (
            <img
              src={img}
              alt={language.search_result_section.car.default_image}
            />
          )}
          <div className="read_more">
            <span>{language.search_result_section.car.show_details}</span>
          </div>
        </figure>
        <div className="info_box">
          <div className="car_brand">
            <h3>{title}</h3>
            <p>{year.name.fa}</p>
          </div>
          <div className="price">
            <p className="Price_number">{price}</p>
            <p>{`${unit}${language.search_result_section.car.toman_per_day}`}</p>
          </div>
          <ul className="tags_container">
            {deliver_at_renters_place && (
              <li>
                <span className="tags">
                  {language.search_result_section.car.delivar_at_your_palce}
                </span>
              </li>
            )}
            {with_driver && (
              <li>
                <span className="tags">
                  {language.search_result_section.car.with_driver}
                </span>
              </li>
            )}
            {showLocation ? (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  tagClick({
                    type: "location",
                    value: location.parent_id === 1 ? 1 : location.id,
                    name: location.parent_id === 1 ? "تهران" : location.name.fa,
                  });
                }}
              >
                <span className="tags location_tag">
                  {location.parent_id === 1 ? "تهران" : location.name.fa}
                </span>
              </li>
            ) : null}
          </ul>
        </div>
        {/* </a>
      </Link> */}
      </div>
    </div>
  );
};

interface ICar {
  data: any;
  showLocation: boolean;
  tagClick: any;
  language: any;
}

export default Car;
