import React, { useState, useContext, useEffect } from "react";
// import "./Owner.scss";
import Button from "../../../../components/form/Button";
import modal_context from "../../../../context/Modal_context";
import Toast_context from "../../../../context/Toast_context";
/**
 * React Star Ratings
 *
 * NPM
 * https://www.npmjs.com/package/react-star-ratings
 * GIT
 *
 * https://github.com/ekeric13/react-star-ratings
 */
import StarRatings from "react-star-ratings";
import jsCookie from "js-cookie";
import { REQUEST_REQUEST_ACTION } from "../../../../API";
import Router from "next/router";
import car_image from "../../../../../public/image/car-image-thumbnail.jpg";


const Owner = (props: IRenter) => {
  const [renter, setRenter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [ownerRate, setOwnerRate] = useState(0);
  const Modal_context = useContext(modal_context);
  const TOAST_CONTEXT = useContext(Toast_context);

  const token = jsCookie.get("token");

  useEffect(() => {
    setRenter(props.data.renter);
  }, []);

  const setForRequest = async (e, data: any) => {
    e.preventDefault();
    setLoading(true);
    Promise.all([
      // rate render
      REQUEST_REQUEST_ACTION({
        token,
        id: data.id,
        action: data.action,
        payload: {
          toRate: "renter",
          type: "user",
          user_profile_id: renter.id,
          rate: ownerRate,
          review: textareaValue,
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
      {renter && (
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
            <img src={renter.thumbnail_url ?renter.thumbnail_url : car_image } alt={renter.name} />
            <h3>{renter.name}</h3>
            <p>امتیاز شما به مهمان</p>
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
                class="Blue_BTN submit_submit HEAP_ModalReviewOwnerToRenter_Btn_Submit"
                value="ثبت امتیاز"
                loading={loading}
                click={() => { }}
              />
              <Button
                class="Blue_BTN cancel_submit"
                value="لغو"
                loading={loading}
                click={() => {
                  // close the modal
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

export default Owner;
