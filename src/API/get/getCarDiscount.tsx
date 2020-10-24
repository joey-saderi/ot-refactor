import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_RENTAL_CAR_DISCOUNTS = "/core/rental-car/discount/list";

export const REQUEST_GET_RENTAL_CAR_DISCOUNTS = (data: IgetCarDiscounts) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_RENTAL_CAR_DISCOUNTS,
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
        const output = {};
        if (response.data.success) {
          resolve(response.data.items);
        } else {
          reject(new Error("Error in loading rental car data!"));
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface IgetCarDiscounts {
  token: string;
  id: any;
}
