import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_FAQ = "/core/faq/list";

export const REQUEST_GET_FAQ = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_FAQ)
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
