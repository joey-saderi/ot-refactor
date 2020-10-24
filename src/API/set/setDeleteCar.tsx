import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const DELETE_CAR = "/core/rental-car/delete";

export const REQUEST_DELETE_CAR = (data: IDeleteCar) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + DELETE_CAR,
        {
          id: data.id,
        },
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface IDeleteCar {
  id: string;
  token: string;
}
