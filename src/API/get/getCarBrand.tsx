import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
let GET_BRAND = "/core/brand/list?limit=500";

export const REQUEST_GET_CAR_BRAND = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_BRAND)
      .then((response) => {
        if (response.data.success) {
          const carBrands = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.fa,
            value: +value.id,
          }));
          resolve({ carBrands });
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};
