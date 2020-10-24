import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
// import "./car.scss";
import { IoMdTrash, IoMdCreate } from "react-icons/io";
import Router from "next/router";
import jsCookie from "js-cookie";
import {
  REQUEST_SET_OUT_OF_SERVICE,
  REQUEST_DELETE_CAR,
} from "../../../../API";
import Spinner from "../../../../components/Spinner";
import Toast_context from "../../../../context/Toast_context";
import Modal_context from "../../../../context/Modal_context";
import carThumbnail from "../../../../../public/image/car-image-thumbnail.jpg";

const Car = ({ is_mine, data, getListAgain, language }: ICar) => {
  const [id, setId] = useState(null);
  const [media_set, setMedia_set] = useState(null);
  const [hasMedia, setHasMedia] = useState(true);
  const [car, setCar] = useState(null);
  const [year, setYear] = useState(null);
  const [uncompletedCar, setUncompletedCar] = useState(false);
  const [heightController, setHeightController] = useState(0);
  const [is_out_of_service, setIs_out_of_service] = useState(false);
  const [is_out_of_service_loading, setIs_out_of_service_loading] = useState(
    false
  );
  const MODAL_CONTEXT = useContext(Modal_context);
  const TOAST_CONTEXT = useContext(Toast_context);

  const token = jsCookie.get("token");

  useEffect(() => {
    if (data) {
      /**
       * @cancellation_policy
       * if this value is correct car will be active otherwise tha car
       * is out of service
       */
      setId(data.id);
      if (data.cancellation_policy) {
        // set the data
        setIs_out_of_service(data.is_out_of_service);
      } else if (!data.is_out_of_service) {
        setUncompletedCar(true);
        setIs_out_of_service(false);
        setServiceStatus(data.id);
      } else {
        setUncompletedCar(true);
        setIs_out_of_service(false);
      }
      setYear(data.year);
      if (data.has_media) {
        setMedia_set(data.media_set);
      } else setHasMedia(false);
      setCar(data.car);
    }
  }, [data]);

  const setServiceStatus = async (localId?) => {
    // start showing the spinner
    setIs_out_of_service_loading(true);
    try {
      const service_res: any = await REQUEST_SET_OUT_OF_SERVICE({
        token,
        id: id || localId,
        // send apposite of current status
        value: !is_out_of_service,
      });
      setIs_out_of_service(service_res);
      // show toast
      TOAST_CONTEXT.toast_option({
        message: service_res
          ? `${language.khodro} ${car.name.fa} ${language.nemishe}`
          : `${language.khodro} ${car.name.fa} ${language.mishe}`,
        time: 10,
        autoClose: true,
      });
      // hide the spinner
      setIs_out_of_service_loading(false);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  const deleteTheCar = async () => {
    try {
      const delete_res = await REQUEST_DELETE_CAR({ token, id });
      jsCookie.remove("new_car");
      getListAgain();
    } catch (error) {
      console.log("!Error", error);
    }
  };

  let link = is_mine ? `/car/${id}?owner=true` : `/car/${id}`;
  let hrefProp = is_mine ? `/car/[id]?owner=true` : `/car/[id]`;
  return (
    car && (
      <div className="carcard">
        <Link href={hrefProp} as={link}>
          <a data-test-id="Link" className="HEAP_Profile_Card_Car">
            <figure>
              {hasMedia ? (
                <img
                  style={{
                    position: "absolute",
                    // control the position of the image in its container
                    top: -heightController + "px",
                  }}
                  src={media_set[0].thumbnail_url}
                  className={[
                    "img-fluid",
                    uncompletedCar ? "grey_car" : null,
                  ].join(" ")}
                  alt={`${car.brand.name.fa} ${car.name.fa}`}
                  onLoadCapture={(e) => {
                    e.persist();
                    let imageHeight = media_set[0].thumbnail_height;

                    // just adjust the image if the hieght of it is bigger than 200 pixels
                    if (imageHeight > 200) {
                      setHeightController(imageHeight - 200);
                    }
                  }}
                />
              ) : (
                <img src={carThumbnail} alt={language.default_image} />
              )}
              <div className="read_more">
                <span>{language.details}</span>
              </div>
              {uncompletedCar && is_mine ? (
                <div className="alert_for_car">
                  <p
                    onClick={(e) => {
                      e.preventDefault();
                      Router.push(`/set-car-timing?car_id=${id}&mode=edit`);
                    }}
                  >
                    {language.to_show_this_car}
                    <span>{language.rent_condition}</span>
                    {language.setting}
                  </p>
                </div>
              ) : null}
            </figure>
            <div className="info_box">
              <div className="car_brand">
                <h3 data-test-id="car_brand_h3">{`${car.brand.name.fa} ${car.name.fa}`}</h3>
                <p>{year.name.fa}</p>
              </div>
            </div>
          </a>
        </Link>
        {is_mine && (
          <div className="edit_part">
            <p
              onClick={() => {
                Router.push(`/set-car-timing?car_id=${id}&mode=edit`);
              }}
              className={[
                "HEAP_Profile_Btn_ChangeCarTiming",
                uncompletedCar ? "set_car_timing_btn" : null,
              ].join(" ")}
            >
              {uncompletedCar
                ? language.rent_condition
                : language.edit_time_date}
            </p>
            {uncompletedCar ? null : is_out_of_service_loading ? (
              <Spinner display="inline-block" width={20} color="#4ba3ce" />
            ) : (
              <p
                data-test-id="OUT_OF_SERVICE"
                className="HEAP_Profile_Btn_OutOfService"
                onClick={setServiceStatus}
              >
                {is_out_of_service
                  ? language.active_the_car
                  : language.inactive_the_car}
              </p>
            )}
            <div className="icon_container">
              <span className="HEAP_Profile_Btn_EditCarDetails">
                <IoMdCreate
                  color="#4ba3ce"
                  size="2rem"
                  onClick={() => {
                    Router.push(`/add-car?mode=edit&car_id=${id}`);
                  }}
                />
              </span>
              <span className="HEAP_Profile_Btn_Delete">
                <IoMdTrash
                  onClick={() =>
                    MODAL_CONTEXT.modalHandler("ConfirmDelete", {
                      model: car.name.fa,
                      brand: car.brand.name.fa,
                      id: id,
                    })
                  }
                  color="#4ba3ce"
                  size="2rem"
                />
              </span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

interface ICar {
  is_mine: boolean;
  data: any;
  // update the car list
  getListAgain: any;
  language: any;
}

export default Car;
