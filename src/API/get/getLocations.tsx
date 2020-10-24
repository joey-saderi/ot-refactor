import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;

export const REQUEST_GET_LOCATION = (parent_id: IGetLocation = null) => {
  let GET_LOCATIONS = "/core/location/list?limit=500&brief=1";
  // if you need to get districts of a city, pass the parent id
  if (parent_id) {
    GET_LOCATIONS = GET_LOCATIONS + `&parent_id=${parent_id}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_LOCATIONS)
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

interface IGetLocation {
  parent_id?: number;
}
