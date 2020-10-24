import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_ORDER_CANCEL = "/core/rental-car/order/cancel";
const SET_ORDER_APPROVE = "/core/rental-car/order/approve";
const SET_ORDER_REJECT = "/core/rental-car/order/reject";
const SET_ORDER_PAY = "/core/rental-car/order/pay";
const SET_ORDER_DELIVER = "/core/rental-car/order/deliver";
const SET_ORDER_RETURN = "/core/rental-car/order/return";
const SET_ORDER_RATE = {
  OWNER: {
    USER: "/core/rental-car/review/renter/owner",
    RENT_ORDER: "/core/rental-car/review/renter/rent-order",
  },
  RENTER: {
    USER: "/core/rental-car/review/owner/renter",
    RENT_ORDER: "/core/rental-car/review/owner/rent-order",
  },
};

export const REQUEST_REQUEST_ACTION = (data: InewRentRequest) => {
  return new Promise((resolve, reject) => {
    let ACTION_URL;
    let more;
    let message = "با موفقیت انجام شد";
    switch (data.action) {
      case "approve":
        ACTION_URL = SET_ORDER_APPROVE;
        message =
          "تایید درخواست ثبت شد. در صورتی که مهمان مبلغ اجاره را پرداخت کند، درخواست قطعی می‌شود و از طریق پیامک به اطلاع شما می‌رسد.";
        break;
      case "reject":
        ACTION_URL = SET_ORDER_REJECT;
        message = "رد درخواست اجاره ثبت شد و به اطلاع مهمان می‌رسد.";
        break;
      case "cancel":
        ACTION_URL = SET_ORDER_CANCEL;
        message = "درخواست شما حذف شد";
        break;
      case "pay":
        ACTION_URL = SET_ORDER_PAY;
        break;
      case "deliver":
        ACTION_URL = SET_ORDER_DELIVER;
        message =
          "سفر خوبی را برایتان آرزو می‌کنیم. لطفا در نگهداری خودرو دقت فرمایید. در صورت بروز هرگونه مشکل با مهمان یا اتولی تماس بگیرید.";
        break;
      case "return":
        ACTION_URL = SET_ORDER_RETURN;
        message =
          "امیدواریم تجربه خوبی از اجاره خودروتان داشته باشید. نظرتان در مورد مهمان را با سایر کاربران در میان بگذارید.";
        break;
      // if you want to rate a car, renter or a owner
      //  renter : اجاره گیرنده
      // owner : اجاره دهنده
      case "rate":
        // if you are a renter and wants to rate an owner or a car
        if (data.payload.toRate === "owner") {
          // rate the owner person
          if (data.payload.type === "user") {
            // message = "امتیاز شما برای اجاره دهنده ثبت شد.";
            ACTION_URL = SET_ORDER_RATE.OWNER.USER;
            more = {
              user_profile_id: data.payload.user_profile_id,
              rate: data.payload.rate,
            };
          }
          // rate the order
          if (data.payload.type === "rent-order") {
            // message = "امتیاز شما برای خودرو ثبت شد.";
            ACTION_URL = SET_ORDER_RATE.OWNER.RENT_ORDER;
            more = {
              rent_order_id: data.id,
              rate: data.payload.rate,
              review: data.payload.review,
            };
          }
        }
        // if you are am owner and you wants to rate a renter
        else if (data.payload.toRate === "renter") {
          // rate the renter person
          if (data.payload.type === "user") {
            // message = "امتیاز شما برای اجاره گیرنده ثبت شد.";
            ACTION_URL = SET_ORDER_RATE.RENTER.USER;
            more = {
              user_profile_id: data.payload.user_profile_id,
              rate: data.payload.rate,
              review: data.payload.review,
            };
          }
          // if (data.payload.type === 'rent-order') {
          //   ACTION_URL = SET_ORDER_RATE.OWNER.RENT_ORDER;
          // }
        }
        break;
    }
    axios
      .post(
        DOMAIN + ACTION_URL,
        {
          id: data.id,
          ...more,
        },
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        resolve({ ...response.data, message });
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface InewRentRequest {
  id: string;
  action:
  | "approve"
  | "reject"
  | "pay"
  | "cancel"
  | "deliver"
  | "return"
  | "rate";
  token: string;
  payload?: {
    toRate: "owner" | "renter"; // only in rate action
    type: "user" | "rent-order"; // only in rate action
    user_profile_id?: string | number; // only in rate action
    rate?: number; // only in rate action
    review?: string; // only in rate action
  };
}
