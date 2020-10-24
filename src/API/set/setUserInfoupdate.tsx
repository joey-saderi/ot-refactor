import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const USER_INFO_UPDATE = "/core/user/update";

export const REQUEST_USER_INFO_UPDATE = (data: IUserInfoUpdate) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + USER_INFO_UPDATE,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          birth_date: data.birth_date,
          company_name: data.company_name,
          is_ok_to_get_emails: false,
        },
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((res) => resolve(res))
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};
interface IUserInfoUpdate {
  first_name: string;
  last_name: string;
  company_name: string;
  // date structure 1399/01/01
  birth_date: string;
  token: string;
}
