import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const ADD_NEW_CAR = "/core/rental-car/new";

export const REQUEST_ADD_NEW_CAR = (info: IAddCar) => {
  return new Promise((resolve, reject) => {
    const { token, data } = info;
    axios
      .post(
        DOMAIN + ADD_NEW_CAR,
        { ...data },
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

interface IAddCar {
  token: string;
  data: any;
}
