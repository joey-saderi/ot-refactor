import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_FIRST_LAST_NAME = "/core/user/set-name";

export const REQUEST_SET_FIRST_LAST_NAME = (data: INewRentRequest) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_FIRST_LAST_NAME,
        {
          first_name: data.first_name,
          last_name: data.last_name,
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

interface INewRentRequest {
  token: string;
  first_name: string;
  last_name: string;
}
