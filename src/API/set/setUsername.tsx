import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_USERNAME = "/core/user/set-username";

export const REQUEST_SET_USERNAME = (data: ISetUsername) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_USERNAME,
        {
          username: data.username,
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

interface ISetUsername {
  token: string;
  username: string;
}
