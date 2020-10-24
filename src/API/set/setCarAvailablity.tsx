import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_CAR_AVAILABILITY = "/core/rental-car/availability/replace-set";

export const REQUEST_SET_CAR_AVAILABILITY = (
  inputData: ISetCarAvailability
) => {
  const { token, rental_car_id, data } = inputData;
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_CAR_AVAILABILITY,
        {
          data,
          rental_car_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
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

interface ISetCarAvailability {
  token: string;
  rental_car_id: string | number;
  data: string;
}
