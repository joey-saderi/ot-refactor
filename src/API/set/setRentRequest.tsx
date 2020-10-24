import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_RENT_REQUEST = "/core/rental-car/rent-request/new";

export const REQUEST_SET_RENT_REQUEST = (data: IRentRequest) => {
  let query = "";
  // if incoming data have coupon sent the coupon
  if (data.coupon_code) {
    query = `?coupon_code=${data.coupon_code}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_RENT_REQUEST + query,
        {
          search_id: data.search_id,
          has_insurance: data.has_insurance,
        },
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          resolve(response.data.success);
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface IRentRequest {
  token: string;
  has_insurance: boolean;
  search_id: string;
  coupon_code?: string;
}
