import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_ORDER_REQUEST_URL = "/core/rental-car/order/get";

export const GET_ORDER_REQUEST = (data: IgetOrderRequest) => {
  return new Promise((resolve, reject) => {
    const { token, id } = data;
    axios
      .post(
        DOMAIN + GET_ORDER_REQUEST_URL,
        { id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface IgetOrderRequest {
  token: string;
  id: string | string[];
}
