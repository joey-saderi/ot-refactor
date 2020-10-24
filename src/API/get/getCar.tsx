import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_CAR = "/core/rental-car/search-for-rent/get";

export const REQUEST_GET_RENTAL_CAR = (data: IgetCar) => {
  return new Promise((resolve, reject) => {
    let queryString = "";
    // If the data object has Coupon and search id, search by the coupon has priority
    if (data.coupon) {
      queryString =
        queryString + `search_id=${data.search_id}&coupon_code=${data.coupon}`;
    }
    // search id has priority to start date and search by car's id
    else if (data.search_id) {
      queryString = queryString + `search_id=${data.search_id}`;
    } else if (data.start_date) {
      queryString =
        queryString +
        `rental_car_id=${data.id}&start_date=${data.start_date}&end_date=${data.end_date}`;
    } else if (data.id) {
      queryString = queryString + `rental_car_id=${data.id}`;
    }
    axios
      .get(DOMAIN + GET_CAR + "?" + queryString)
      .then((response) => {
        if (response.data.id) {
          resolve(response.data);
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface IgetCar {
  search_id?: string;
  id?: any;
  coupon?: string;
  start_date?: string;
  end_date?: string;
}
