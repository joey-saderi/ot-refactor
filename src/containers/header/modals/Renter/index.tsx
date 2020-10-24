import React, { useState, useContext, useEffect } from "react";
// import "./Renter.scss";
import Button from "../../../../components/form/Button";
import modal_context from "../../../../context/Modal_context";
import Toast_context from "../../../../context/Toast_context";
import StarRatings from "react-star-ratings";
import jsCookie from "js-cookie";
import { REQUEST_REQUEST_ACTION } from "../../../../API";
import Router from "next/router";
import car_image from "../../../../../public/image/car-image-thumbnail.jpg";

const Renter = (props: IRenter) => {
  const [rent_search_dump, setRent_search_dump] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [carRate, setCarRate] = useState(0);
  const [ownerRate, setOwnerRate] = useState(0);
  const Modal_context = useContext(modal_context);
  const TOAST_CONTEXT = useContext(Toast_context);

  const token = jsCookie.get("token");

  useEffect(() => {
    setRent_search_dump(props.data.rent_search_dump);
  }, []);

  const setForRequest = async (e, data: any) => {
    e.preventDefault();
    setLoading(true);
    Promise.all([
      // rate the order
      REQUEST_REQUEST_ACTION({
        token,
        id: data.id,
        action: data.action,
        payload: {
          toRate: "owner",
          type: "rent-order",
          rate: carRate,
          review: textareaValue,
        },
      }),
      // rate to the owner
      REQUEST_REQUEST_ACTION({
        token,
        id: data.id,
        action: data.action,
        payload: {
          toRate: "owner",
          type: "user",
          user_profile_id: rent_search_dump.owner.id,
          rate: ownerRate,
        },
      }),
    ])
      .then((response) => {
        console.log(response);
        TOAST_CONTEXT.toast_option({
          message: "با موفقیت انجام شد",
          time: 7,
          autoClose: true,
        });
        setLoading(false);
        Modal_context.modalHandler("SET");
        Router.reload();
      })
      .catch((e) => {
        console.log("!Error", e);
        setLoading(false);
      });
  };

  return (
    <>
      {rent_search_dump && (
        <div className="modal_box_div">
          <form
            className="rate_to_owner_car"
            onSubmit={(e) => {
              setForRequest(e, {
                id: props.data.id,
                action: "rate",
              });
            }}
          >
            {/* a image of the order */}
            <img
              src={
                rent_search_dump.media_set.length > 0
                  ? rent_search_dump.media_set[0].thumbnail_url
                  : car_image
              }
              alt={rent_search_dump.car.name.fa}
            />
            <h3>
              {rent_search_dump.car.brand.name.fa}{" "}
              {rent_search_dump.car.name.fa}
            </h3>
            <p>امتیاز شما به خودرو</p>
            <StarRatings
              rating={carRate}
              starRatedColor="rgb(255, 204, 0)"
              starHoverColor="rgb(255, 204, 0)"
              starDimension="20px"
              starSpacing="5px"
              changeRating={(e) => setCarRate(e)}
              numberOfStars={5}
              name="carRate"
            />
            {/* the owner image */}
            <img
              src={rent_search_dump.owner.thumbnail_url}
              alt={rent_search_dump.owner.name}
            />
            <h3>{rent_search_dump.owner.name}</h3>
            <p>امتیاز شما به میزبان</p>
            <StarRatings
              rating={ownerRate}
              starRatedColor="rgb(255, 204, 0)"
              starHoverColor="rgb(255, 204, 0)"
              starDimension="20px"
              starSpacing="5px"
              changeRating={(e) => setOwnerRate(e)}
              numberOfStars={5}
              name="ownerRate"
            />
            <label>توضیح:</label>
            <textarea
              value={textareaValue}
              onChange={(e) => {
                setTextareaValue(e.target.value);
              }}
              placeholder="(با به اشتراک‌گذاری تجربه‌تان، به کاربران دیگر در انتخاب کمک می‌کنید.)"
            />
            <div className="rate_buttons">
              <Button
                class="Blue_BTN submit_submit HEAP_ModalReviewRenterToOwner_Btn_Submit"
                value="ثبت امتیاز"
                loading={loading}
                click={() => {}}
              />
              <Button
                class="Blue_BTN cancel_submit"
                value="لغو"
                loading={loading}
                click={() => {
                  Modal_context.modalHandler("SET");
                }}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

interface IRenter {
  data: any;
}

export default Renter;
