import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_ORDER_REQUESTS = "/core/rental-car/order/list";

export const REQUEST_GET_ORDER_REQUESTS = (data: IgetOrderRequests) => {
  let query = "";
  if (data.status_id) {
    query = `&status_id=${data.status_id}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(
        DOMAIN + GET_ORDER_REQUESTS + `?page=${data.page}&limit=14` + query,
        {
          headers: {
            Authorization: "Bearer " + data.token,
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

interface IgetOrderRequests {
  token: string;
  status_id?: string;
  page: number;
}
