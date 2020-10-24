import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const NEW_CAR_MEDIA = "/core/rental-car/media/new";

export const REQUEST_NEW_CAR_MEDIA = (data: INewCarMedia) => {
  return new Promise((resolve, reject) => {
    const { token, file } = data;

    let form = new FormData();
    let imagedata = file;
    form.append("media", imagedata);

    axios
      .post(DOMAIN + NEW_CAR_MEDIA, form, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.success) {
          resolve(response.data.data);
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};

interface INewCarMedia {
  token: string;
  file: any;
}
