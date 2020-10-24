import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
let GET_CAR_PRICE_ESTIMATION = "/core/rent-price-estimation-request/new";

export const REQUEST_GET_CAR_PRICE_ESTIMATION = (data: IEstimation) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_CAR_PRICE_ESTIMATION, {
        price: data.price,
        car_id: data.car_id,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface IEstimation {
  price: string;
  car_id: number;
}
