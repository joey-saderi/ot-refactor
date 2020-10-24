import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_USER_CARS = "/core/rental-car/list";

export const REQUEST_GET_USER_CARS = (data: IGetUserCars) => {
  let query = "";
  if (data.page) {
    query = `&page=${data.page}`;
  } else {
    query = `&page=1`;
  }
  if (data.is_out_of_service) {
    query += `&owner_user_profile_id=${data.id}&is_out_of_service=${
      data.is_out_of_service === 1 ? true : false
    }`;
  } else {
    query += `&owner_user_profile_id=${data.id}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_USER_CARS + "?limit=14" + query)
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface IGetUserCars {
  id: string;
  is_out_of_service?: number;
  page?: number;
}
