import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_RENTAL_CAR_SET_CAR_TIMING = "/core/rental-car/get";

export const REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING = (data: IgetCar) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_RENTAL_CAR_SET_CAR_TIMING,
        {
          // this value is needed to show this is my car and I can edit this
          is_mine: 1,
          id: data.id,
        },
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          resolve(response.data.data);
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface IgetCar {
  token: string;
  id: any;
}
