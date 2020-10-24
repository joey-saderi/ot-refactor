import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
let GET_MODEL = "/core/car/list?limit=800&brand_id=";

export const REQUEST_GET_CAR_MODEL = (carModel: ICarModel) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_MODEL + carModel)
      .then((response) => {
        if (response.data.success) {
          const data = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.fa,
            value: +value.id,
          }));
          resolve({ data });
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface ICarModel {
  carModel: string;
}
