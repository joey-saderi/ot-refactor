import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" }); 

const UrlChecker = (props) => {
  let data = null;
  const {
    location_id,
    location_name,
    start_date,
    end_date,
    price_order,
    page,
    min_price,
    max_price,
    deliver_at_renters_place,
    with_driver,
    body_style_id,
    brand_id,
    car_id,
  } = props;
  data = {
    location_id: location_id ? +location_id : null,
    location_n: location_name ? location_name : "tehran",
    start_date: start_date
      ? (start_date as string).replace(/-/g, "/")
      : setStartSate(),
    end_date: end_date ? (end_date as string).replace(/-/g, "/") : setEndSate(),
    price_order: price_order ? (price_order as string) : "-price",
    page: page ? +page : 1,
    min_price: min_price ? +min_price : 0,
    max_price: max_price ? +max_price : 10000000,
    deliver_at_renters_place: deliver_at_renters_place
      ? deliver_at_renters_place
      : "0",
    with_driver: with_driver ? with_driver : "0",
    body_style_id: body_style_id ? body_style_id : "all",
    brand_id: brand_id ? brand_id : "all",
    car_id: brand_id ? car_id : "all",
  };
  return data;
};

const setStartSate = () => {
  // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
  let from_date = moment()
    .add(3, "day")
    .format("jYYYY/jMM/jDD")
    .split("/");
  return `${+from_date[0]}/${from_date[1]}/${from_date[2]}`;
};

const setEndSate = () => {
  let to_date = moment()
    .add(6, "day")
    .format("jYYYY/jMM/jDD")
    .split("/");
  return `${+to_date[0]}/${to_date[1]}/${to_date[2]}`;
};

export default UrlChecker;
