import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const REMOVE_CAR_MEDIA = "/core/rental-car/media/delete";

export const REQUEST_REMOVE_CAR_MEDIA = (data: IRemoveCarMedia) => {
  return new Promise((resolve, reject) => {
    const { token, id } = data;
    axios
      .post(
        DOMAIN + REMOVE_CAR_MEDIA,
        { id: id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        resolve(result);
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface IRemoveCarMedia {
  token: string;
  id: number;
}
