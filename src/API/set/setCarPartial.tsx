import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_CAR_PARTIAL = "/core/rental-car/edit/partial";

export const REQUEST_SET_CAR_PARTIAL = (data: ISetCarPartial) => {
  return new Promise((resolve, reject) => {
    const {
      token,
      id,
      deliver_at_renters_place,
      with_driver,
      max_km_per_day,
      extra_km_price,
      cancellation_policy,
      days_to_get_reminded,
      min_days_to_rent,
      is_out_of_service,
    } = data;
    axios
      .post(
        DOMAIN + SET_CAR_PARTIAL,
        {
          cancellation_policy,
          days_to_get_reminded,
          deliver_at_renters_place,
          with_driver,
          is_out_of_service,
          extra_km_price,
          id,
          max_km_per_day,
          min_days_to_rent,
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

interface ISetCarPartial {
  token: string;
  id: string | number;
  deliver_at_renters_place: number | boolean;
  with_driver: number | boolean;
  max_km_per_day: number;
  extra_km_price: number;
  cancellation_policy: string;
  days_to_get_reminded: number;
  min_days_to_rent: number;
  is_out_of_service: boolean;
}
