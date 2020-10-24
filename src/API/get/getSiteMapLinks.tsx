import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_URLS_FOR_SITE_MAP = "/core/landing/list";

export const REQUEST_GET_URLS_FOR_SITE_MAP = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_URLS_FOR_SITE_MAP + "?limit=900")
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
