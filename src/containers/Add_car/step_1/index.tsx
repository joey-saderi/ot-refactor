import React, { useEffect, useReducer, useState } from "react";
import { IoIosCar, IoIosArrowDown } from "react-icons/io";
// import "./step_1.scss";
import DropdownSearch from "../../../components/form/Dropdown";
import {
  REQUEST_GET_LOCATION,
  REQUEST_GET_CAR_BRAND,
  REQUEST_GET_YEAR,
  REQUEST_GET_CAR_MODEL,
  REQUEST_GET_CAR_BODY_STYLE,
  REQUEST_GET_CAR_CYLINDER,
  REQUEST_GET_CAR_FACILITIES,
  REQUEST_GET_CAR_COLORS,
  REQUEST_GET_MODEL_INFO,
  REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING,
  REQUEST_ADD_NEW_CAR,
} from "../../../API";
import Radio from "../../../components/form/Radio";
import TextInput from "../../../components/form/TextInput";
import pelak from "../../../../public/image/pelak.png";
import Checkbox from "../../../components/form/Checkbox";
import ImageUploader from "../../../components/ImageUploader";
import Button from "../../../components/form/Button";
import Router from "next/router";
import jsCookie from "js-cookie";

/**
 * validator
 *
 * NPM
 * https://www.npmjs.com/package/validator
 *
 * GIT
 * https://github.com/validatorjs/validator.js
 */
import validator from "validator";
import CheckBox_Loader from "../../../components/cartPlaceholder/checkBoxLoading";
import NumbersAndCurrencyUnit from "../../../../utils/NumbersAndCurrencyUnit";

/**
 * @new_car
 *  If add car process is not complete and the user didn't fill up the step two form
 *  until before browser close the car id will be saved at the cash
 *  in case of a return.
 *  This id will send to the API and get the car information and full fill the step 1 form
 */
const new_car = jsCookie.get("new_car");
let formSuccessfullySubmit = false;
let autoFillStorageData = null;
let incompleteCarMode = false;
let incompleteInfo = {
  id: null,
  location: {
    name: { fa: null },
    parent_id: null,
    id: null,
  },
  car: {
    brand: {
      id: null,
      name: { fa: null },
    },
    id: null,
    name: { fa: null },
  },
  year: {
    id: null,
    name: { fa: null },
  },
  transmission_type: {
    id: null,
  },
  body_style: {
    id: null,
    name: { fa: null },
  },
  cylinder: {
    id: null,
    name: { fa: null },
  },
  capacity: null,
  mileage_range: { id: null },
  value: null,
  registration_plate_first_part: null,
  registration_plate_forth_part: null,
  registration_plate_second_part: null,
  registration_plate_third_part: null,
  facility_set: [],
  media_set: [],
  color: {
    code: null,
    id: null,
  },
  description: null,
  cancellation_policy: null,
  price_per_day: null,
  with_driver: false,
  extra_km_price: null,
  max_km_per_day: null,
  days_to_get_reminded: 1,
  deliver_at_renters_place: false,
  is_out_of_service: true,
  min_days_to_rent: 1,
};

const stateReducer = (current, action) => {
  switch (action.type) {
    case "id":
      if (incompleteCarMode) incompleteInfo.id = action.id;
      return { ...current, id: action.id };
    /**
     * @location_id
     * for Tehran the "location_id" is district id
     * To found out you getting a district id or city id
     * check the parent id of incaming data
     */
    case "location_id":
      if (incompleteCarMode) incompleteInfo.location.id = action.location_id;
      return { ...current, location_id: action.location_id };
    case "car_id":
      if (incompleteCarMode) incompleteInfo.car.id = action.car_id;
      return { ...current, car_id: action.car_id };
    case "year_id":
      if (incompleteCarMode) incompleteInfo.year.id = action.year_id;
      return { ...current, year_id: action.year_id };
    case "transmission_type_id":
      if (incompleteCarMode)
        incompleteInfo.transmission_type.id = action.transmission_type_id;
      return { ...current, transmission_type_id: action.transmission_type_id };
    case "body_style_id":
      if (incompleteCarMode)
        incompleteInfo.body_style.id = action.body_style_id;
      return { ...current, body_style_id: action.body_style_id };
    case "cylinder_id":
      if (incompleteCarMode) incompleteInfo.cylinder.id = action.cylinder_id;
      return { ...current, cylinder_id: action.cylinder_id };
    case "capacity":
      if (incompleteCarMode) incompleteInfo.capacity = action.capacity;
      return { ...current, capacity: action.capacity };
    case "mileage_range_id":
      if (incompleteCarMode)
        incompleteInfo.mileage_range.id = action.mileage_range_id;
      return { ...current, mileage_range_id: action.mileage_range_id };
    case "value":
      if (incompleteCarMode) incompleteInfo.value = action.value;
      return { ...current, value: action.value };
    case "registration_plate_first_part":
      if (incompleteCarMode)
        incompleteInfo.registration_plate_first_part =
          action.registration_plate_first_part;
      return {
        ...current,
        registration_plate_first_part: action.registration_plate_first_part,
      };
    case "registration_plate_second_part":
      if (incompleteCarMode)
        incompleteInfo.registration_plate_second_part =
          action.registration_plate_second_part;
      return {
        ...current,
        registration_plate_second_part: action.registration_plate_second_part,
      };
    case "registration_plate_third_part":
      if (incompleteCarMode)
        incompleteInfo.registration_plate_third_part =
          action.registration_plate_third_part;

      return {
        ...current,
        registration_plate_third_part: action.registration_plate_third_part,
      };
    case "registration_plate_forth_part":
      if (incompleteCarMode)
        incompleteInfo.registration_plate_forth_part =
          action.registration_plate_forth_part;
      return {
        ...current,
        registration_plate_forth_part: action.registration_plate_forth_part,
      };
    case "facility_id":
      /**
       * @facility_id
       * receive an id from the checkbox component and push that to the facilities ids list
       */
      if (incompleteCarMode)
        incompleteInfo.facility_set = incompleteInfo.facility_set.concat({
          id: action.facility_id,
        });
      return {
        ...current,
        facility_id: current.facility_id.concat(action.facility_id),
      };
    case "empty_facility_id":
      if (incompleteCarMode)
        incompleteInfo.facility_set = action.empty_facility_id;
      return {
        ...current,
        facility_id: action.empty_facility_id,
      };
    case "Remove_facility_id":
      // remove an id from list
      if (incompleteCarMode)
        incompleteInfo.facility_set = incompleteInfo.facility_set.filter(
          (item) => {
            return item !== action.remove_id;
          }
        );
      return {
        ...current,
        facility_id: current.facility_id.filter((item) => {
          return item !== action.remove_id;
        }),
      };
    case "media_id":
      // a list of uploaded ids
      return {
        ...current,
        media_id: current.media_id.concat(action.media_id),
      };
    case "Remove_media_id":
      // remove the given id from media list
      return {
        ...current,
        media_id: current.media_id.filter((item) => {
          return item !== action.Remove_media_id;
        }),
      };
    case "color_id":
      if (incompleteCarMode) incompleteInfo.color.id = action.color_id;
      return { ...current, color_id: action.color_id };
    case "description":
      if (incompleteCarMode) incompleteInfo.description = action.description;
      return { ...current, description: action.description };
    case "deliver_at_renters_place":
      // default value is false
      return {
        ...current,
        deliver_at_renters_place: action.deliver_at_renters_place,
      };
    case "is_out_of_service":
      // default value is false
      return { ...current, is_out_of_service: action.is_out_of_service };
    case "min_days_to_rent":
      // default value is at least 1 day
      return { ...current, min_days_to_rent: action.min_days_to_rent };
    case "days_to_get_reminded":
      // default value is at least 1 day
      return { ...current, days_to_get_reminded: action.days_to_get_reminded };
    case "max_km_per_day":
      return { ...current, max_km_per_day: action.max_km_per_day };
    case "extra_km_price":
      return { ...current, extra_km_price: action.extra_km_price };
    case "with_driver":
      return {
        ...current,
        with_driver: action.with_driver,
      };
    case "price_per_day":
      return {
        ...current,
        price_per_day: action.price_per_day,
      };
    case "cancellation_policy":
      return {
        ...current,
        cancellation_policy: action.cancellation_policy,
      };
    default:
      throw new Error("There is a problem!");
  }
};

const error_reducer = (current, action) => {
  switch (action.type) {
    case "location_id":
      return {
        ...current,
        location_id: action.location_id,
        error_message: action.error_message,
      };
    case "car_id":
      return {
        ...current,
        car_id: action.car_id,
        error_message: action.error_message,
      };
    case "year_id":
      return {
        ...current,
        year_id: action.year_id,
        error_message: action.error_message,
      };
    case "transmission_type_id":
      return {
        ...current,
        transmission_type_id: action.transmission_type_id,
        error_message: action.error_message,
      };
    case "body_style_id":
      return {
        ...current,
        body_style_id: action.body_style_id,
        error_message: action.error_message,
      };
    case "cylinder_id":
      return {
        ...current,
        cylinder_id: action.cylinder_id,
        error_message: action.error_message,
      };
    case "capacity":
      return {
        ...current,
        capacity: action.capacity,
        error_message: action.error_message,
      };
    case "mileage_range_id":
      return {
        ...current,
        mileage_range_id: action.mileage_range_id,
        error_message: action.error_message,
      };
    case "value":
      return {
        ...current,
        value: action.value,
        error_message: action.error_message,
      };
    case "registration_plate_first_part":
      return {
        ...current,
        registration_plate_first_part: action.registration_plate_first_part,
        error_message: action.error_message,
      };
    case "registration_plate_second_part":
      return {
        ...current,
        registration_plate_second_part: action.registration_plate_second_part,
        error_message: action.error_message,
      };
    case "registration_plate_third_part":
      return {
        ...current,
        registration_plate_third_part: action.registration_plate_third_part,
        error_message: action.error_message,
      };
    case "registration_plate_forth_part":
      return {
        ...current,
        registration_plate_forth_part: action.registration_plate_forth_part,
        error_message: action.error_message,
      };
    case "facility_id":
      return {
        ...current,
        facility_id: action.facility_id,
        error_message: action.error_message,
      };
    case "media_id":
      return {
        ...current,
        media_id: action.media_id,
        error_message: action.error_message,
      };
    case "color_id":
      return {
        ...current,
        color_id: action.color_id,
        error_message: action.error_message,
      };
    case "error_message":
      // you can just show an error message in case of APIs error
      return {
        ...current,
        error_message: action.error_message,
      };
    default:
      throw new Error("There is a problem!");
  }
};

const checkListLoaderLength = Array(30).fill(0);

const Add_Car_Step_1 = ({ language }: IAdd_Car_Step_1) => {
  const [locationList, setLocationList] = useState([]);
  // need to set the name of the location, to show it to the user if it selects other then Tehran
  const [locationName, setLocationName] = useState(null);
  // if you select Tehran the distriction part will shown
  const [showDistrict, setShowDistrict] = useState(false);
  const [DistrictName, setDistrictName] = useState(null);
  const [districtList, setDistrictList] = useState([]);
  const [BrandList, setBrandList] = useState([]);
  const [Brand_id, setBrand_id] = useState(null);
  const [Brand_id_error, setBrand_id_error] = useState(null);
  const [Brand_Name, setBrand_Name] = useState(null);
  const [ModelList, setModelList] = useState([]);
  const [CarModelName, setCarModelName] = useState(null);
  const [YearList, setYearList] = useState([]);
  const [YearName, setYearName] = useState(null);
  const [BodyStyleList, setBodyStyleList] = useState([]);
  const [BodyStyleName, setBodyStyleName] = useState(null);
  const [cylinderList, setCylinderList] = useState([]);
  const [CylinderName, setCylinderName] = useState(null);
  const [capacityList, setCapacity] = useState([
    { value: 1, text: "۱" },
    { value: 2, text: "۲" },
    { value: 3, text: "۳" },
    { value: 4, text: "۴" },
    { value: 5, text: "۵" },
    { value: 6, text: "۶" },
    { value: 7, text: "۷" },
    { value: 8, text: "۸" },
    { value: 9, text: "۹" },
    { value: 10, text: "۱۰" },
    { value: 11, text: "۱۱" },
    { value: 12, text: "۱۲" },
    { value: 13, text: "۱۳" },
    { value: 14, text: "۱۴" },
    { value: 15, text: "۱۵" },
    { value: 16, text: "۱۶" },
    { value: 17, text: "۱۷" },
  ]);
  const [mileRange, setMileRange] = useState([
    { key: "1", value: "1", text: "۰ - ۵۰٫۰۰۰ کیلومتر" },
    { key: "2", value: "2", text: "۵۰٫۰۰۰ - ۱۰۰٫۰۰۰ کیلومتر" },
    { key: "3", value: "3", text: "۱۰۰٫۰۰۰ - ۲۰۰٫۰۰۰ کیلومتر" },
    { key: "4", value: "4", text: "+۲۰۰٫۰۰۰  کیلومتر" },
  ]);
  const [PelakList, setPelakList] = useState([
    { value: "الف", text: "الف" },
    { value: "ب", text: "ب" },
    { value: "ت", text: "ت" },
    { value: "ج", text: "ج" },
    { value: "د", text: "د" },
    { value: "ژ", text: "ژ" },
    { value: "س", text: "س" },
    { value: "ص", text: "ص" },
    { value: "ط", text: "ط" },
    { value: "ق", text: "ق" },
    { value: "گ", text: "گ" },
    { value: "ل", text: "ل" },
    { value: "م", text: "م" },
    { value: "ن", text: "ن" },
    { value: "و", text: "و" },
    { value: "ه", text: "هـ" },
    { value: "ی", text: "ی" },
  ]);
  const [facilitesList, setFacilitesList] = useState([]);
  //  If user is at the edit mode or has a uncompleted car, this list fill with car's id image
  const [initialImage, setInitialImage] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [colorCode, setColorCode] = useState(null);
  const [Loading, setLoading] = useState(false);

  const [showTransmissionRadio, setShowTransmissionRadio] = useState(false);
  const [showBodyStyle, setShowBodyStyle] = useState(false);
  const [showCylinder, setShowCylinder] = useState(false);
  const [showCapacity, setShowCapacity] = useState(false);
  const [showMoreFacilities, setShowMoreFacilities] = useState(false);

  const [ErrorState, ErrorDispatch] = useReducer(error_reducer, {
    location_id: null,
    car_id: null,
    year_id: null,
    transmission_type_id: null,
    capacity: null,
    body_style_id: null,
    mileage_range_id: null,
    color_id: null,
    // vin: null,
    registration_plate_first_part: null,
    registration_plate_second_part: null,
    registration_plate_third_part: null,
    registration_plate_forth_part: null,
    facility_id: null,
    media_id: null,
    cylinder_id: null,
    value: null,
    error_message: null,
  });

  const [state, dispatch] = useReducer(stateReducer, {
    id: null,
    location_id: null,
    car_id: null,
    year_id: null,
    transmission_type_id: null,
    capacity: null,
    body_style_id: null,
    mileage_range_id: null,
    color_id: null,
    // vin: null,
    registration_plate_first_part: "",
    registration_plate_second_part: null,
    registration_plate_third_part: "",
    registration_plate_forth_part: "",
    facility_id: [],
    description: "",
    media_id: [],
    cylinder_id: null,
    value: "",
    deliver_at_renters_place: 0,
    days_to_get_reminded: 1,
    special_type_id: 1,
    is_out_of_service: false,
    min_days_to_rent: 1,
  });

  const token = jsCookie.get("token");
  const user_id = jsCookie.get("user_id");

  useEffect(() => {
    // check if the user edit the car
    if (Router.router.query.mode === "edit") {
      localStorage.removeItem("incompleteInfo");
      localStorage.removeItem("halfcompletecar");
      getCarInfoToEdit(Router.router.query.car_id);
    } else if (jsCookie.get("new_car")) {
      localStorage.removeItem("incompleteInfo");
      localStorage.removeItem("halfcompletecar");
    } else if (
      !new_car &&
      !Router.router.query.mode &&
      localStorage["halfcompletecar"]
    ) {
      incompleteCarMode = true;
      // incompleteInfo = JSON.parse(localStorage["incompleteInfo"]);
      incompleteInfo = JSON.parse(localStorage["halfcompletecar"]);
      if (!incompleteInfo.car.brand.id) {
        if (localStorage["car_info"]) {
          let data = JSON.parse(localStorage["car_info"]);
          incompleteInfo.car = {
            brand: {
              id: data.brand.value,
              name: { fa: data.brand.text },
            },
            id: data.model.value,
            name: { fa: data.model.text },
          };
          incompleteInfo.value = data.value;
        }
      }
      localStorage.removeItem("car_info");
      SetCar(incompleteInfo);
    } else if (
      !new_car &&
      !Router.router.query.mode &&
      localStorage["car_info"]
    ) {
      autoFillStorageData = JSON.parse(localStorage["car_info"]);
    } else {
      incompleteCarMode = true;
    }
    getInitials();
    return () => {
      if (!Router.router.query.mode && !new_car && !formSuccessfullySubmit) {
        // localStorage["incompleteInfo"] = JSON.stringify(incompleteInfo);
        localStorage["halfcompletecar"] = JSON.stringify(incompleteInfo);
      } else {
        localStorage.removeItem("incompleteInfo");
        localStorage.removeItem("halfcompletecar");
      }
      formSuccessfullySubmit = false;
      incompleteCarMode = false;
      autoFillStorageData = false;
    };
  }, []);

  useEffect(() => {
    const new_car = jsCookie.get("new_car");
    // if a user has a incomplete car and it's not edit mode
    if (new_car && !Router.router.query.mode) {
      localStorage.removeItem("incompleteInfo");
      localStorage.removeItem("halfcompletecar");
      getCarInfoToEdit(new_car);
    }
  }, [new_car]);

  const getCarInfoToEdit = async (id) => {
    try {
      const car_info_res = await REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING({
        id: id,
        token: token,
      });
      SetCar(car_info_res);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  const SetCar = (car) => {
    // SET CAR ID
    if (car.id) dispatch({ type: "id", id: car.id });

    // SET CAR LOCATION AND DISTRICT
    if (car.location.id) {
      if (car.location.parent_id === 1) {
        setLocationName("تهران");
        // if the location parent is the Tehran's id show the district part
        setShowDistrict(true);
        getDistricts(1);
        dispatch({ type: "location_id", location_id: car.location.id });
        setDistrictName(car.location.name.fa);
      } else {
        // If user select other than Tehran the message about out of support will show up under the Drop-down
        setLocationName(car.location.name.fa);
        setShowDistrict(false);
        dispatch({ type: "location_id", location_id: car.location.id });
      }
    }

    // SET CAR MODEL
    if (car.car.brand.id) {
      setBrand_id(car.car.brand.id);
      setBrand_Name(car.car.brand.name.fa);
      getModelList(car.car.brand.id);
      if (incompleteCarMode && !incompleteInfo.transmission_type.id) {
        getBrandInfo(car.car.id);
      }
      dispatch({ type: "car_id", car_id: car.car.id });
      setCarModelName(car.car.name.fa);
    }

    // SET YEAR
    if (car.year.id) {
      dispatch({ type: "year_id", year_id: car.year.id });
      setYearName(car.year.name.fa);
    }

    // SET TRANSMISSION
    if (car.transmission_type.id)
      dispatch({
        type: "transmission_type_id",
        transmission_type_id: car.transmission_type.id,
      });

    // SET BODY STYLE
    if (car.body_style.id) {
      dispatch({
        type: "body_style_id",
        body_style_id: car.body_style.id,
      });
      setBodyStyleName(car.body_style.name.fa);
    }

    // SET CYLINDER
    if (car.cylinder.id) {
      dispatch({
        type: "cylinder_id",
        cylinder_id: car.cylinder.id,
      });
      setCylinderName(car.cylinder.name.fa);
    }

    // SET CAPACITY
    if (car.capacity) dispatch({ type: "capacity", capacity: car.capacity });

    // SET MILE RANGE
    if (car.mileage_range.id)
      dispatch({
        type: "mileage_range_id",
        mileage_range_id: car.mileage_range.id,
      });

    // SET CAR VALUE
    if (car.value)
      dispatch({
        type: "value",
        value: car.value,
      });

    // SET PELAK VALUES
    if (car.registration_plate_first_part)
      dispatch({
        type: "registration_plate_first_part",
        registration_plate_first_part: car.registration_plate_first_part,
      });
    if (car.registration_plate_second_part)
      dispatch({
        type: "registration_plate_second_part",
        registration_plate_second_part: car.registration_plate_second_part,
      });
    if (car.registration_plate_third_part)
      dispatch({
        type: "registration_plate_third_part",
        registration_plate_third_part: car.registration_plate_third_part,
      });
    if (car.registration_plate_forth_part)
      dispatch({
        type: "registration_plate_forth_part",
        registration_plate_forth_part: car.registration_plate_forth_part,
      });

    // SET FACILITIES

    if (car.facility_set.length > 0) {
      car.facility_set.forEach((item) => {
        dispatch({ type: "facility_id", facility_id: item.id });
      });
    } else dispatch({ type: "empty_facility_id", empty_facility_id: [] });

    // SET IMAGE UPLOADED
    if (car.media_set.length > 0) {
      car.media_set.forEach((item) => {
        dispatch({
          type: "media_id",
          media_id: item.id,
        });
        setInitialImage((InitialImage) =>
          InitialImage.concat({
            img: item.thumbnail_url,
            id: item.id,
          })
        );
      });
    }

    // SET COLOR
    if (car.color.id) {
      dispatch({
        type: "color_id",
        color_id: car.color.id,
      });
      setColorCode(car.color.code);
    }

    // SET DESCRIPTION
    dispatch({
      type: "description",
      description: car.description,
    });

    // SET EXTRA INFO
    // these infos will fill if we are in edit mode
    dispatch({
      type: "cancellation_policy",
      cancellation_policy: car.cancellation_policy,
    });
    dispatch({
      type: "price_per_day",
      price_per_day: car.price_per_day,
    });
    dispatch({
      type: "with_driver",
      with_driver: car.with_driver,
    });
    dispatch({
      type: "extra_km_price",
      extra_km_price: car.extra_km_price,
    });
    dispatch({
      type: "max_km_per_day",
      max_km_per_day: car.max_km_per_day,
    });
    dispatch({
      type: "days_to_get_reminded",
      days_to_get_reminded: car.days_to_get_reminded,
    });
    dispatch({
      type: "deliver_at_renters_place",
      deliver_at_renters_place: car.deliver_at_renters_place,
    });
    dispatch({
      type: "is_out_of_service",
      is_out_of_service: car.is_out_of_service,
    });
    dispatch({
      type: "min_days_to_rent",
      min_days_to_rent: car.min_days_to_rent,
    });
  };

  const getInitials = async () => {
    try {
      const location_Res: any = await REQUEST_GET_LOCATION();
      const car_brand_Res: any = await REQUEST_GET_CAR_BRAND();
      const year_Res: any = await REQUEST_GET_YEAR();
      const bodyStyle_res: any = await REQUEST_GET_CAR_BODY_STYLE();
      const cylinder_res: any = await REQUEST_GET_CAR_CYLINDER();
      const facilities_res: any = await REQUEST_GET_CAR_FACILITIES();
      const colorList_res: any = await REQUEST_GET_CAR_COLORS();
      setLocationList(location_Res.data);
      setBrandList(car_brand_Res.carBrands);
      setYearList(year_Res.data);
      setBodyStyleList(bodyStyle_res.data);
      setCylinderList(cylinder_res.data);
      setFacilitesList(facilities_res.data);
      setColorList(colorList_res.data);
      if (autoFillStorageData) {
        dispatch({
          type: "value",
          value: autoFillStorageData.value,
        });
        setBrand_Name(autoFillStorageData.brand.text);
        setBrand_id(autoFillStorageData.brand.value);
        setModelList([]);
        getModelList(autoFillStorageData.brand.value);
      }
    } catch (error) {
      console.log("!Error", error);
    }
  };

  const submitHandler = async (e, state) => {
    e.preventDefault();
    setLoading(true);
    // check the validation
    if (validation(state)) {
      try {
        const add_new_car_res: any = await REQUEST_ADD_NEW_CAR({
          data: state,
          token: token,
        });
        /**
         * after sent the information to the API,
         * if we are in edit mode go to profile
         */
        formSuccessfullySubmit = true;
        localStorage.removeItem("car_info");
        localStorage.removeItem("incompleteInfo");
        localStorage.removeItem("halfcompletecar");
        localStorage["red_dot"] = 1;
        if (Router.router.query.mode === "edit") {
          Router.push(`/user/${user_id}`);
        }
        // else go to set car and timing
        else {
          // set the car id to catch if user didn't complete the step to of the add car form
          jsCookie.set("new_car", add_new_car_res.data.id);
          Router.push(
            `/set-car-timing?car_id=${add_new_car_res.data.id}&newcaradded=true`
          );
        }
      } catch (error) {
        console.log("!Error", error);
        setLoading(false);
      }
    } else setLoading(false);
  };

  // receive the Reducer type and reset the error status
  const resetTheErrorStatus = (value_name) => {
    if (value_name === "error_message") {
      ErrorDispatch({
        type: value_name,
        error_message: null,
      });
    } else {
      ErrorDispatch({
        type: value_name,
        [value_name]: null,
        error_message: null,
      });
    }
  };

  const Dispatcher = (data) => {
    ErrorDispatch({
      type: data.type,
      [data.type]: true,
      error_message: data.error_message,
    });
  };

  const validation = (state) => {
    if (!validator.isNumeric(`${state.location_id}`) && !showDistrict) {
      Dispatcher({
        type: "location_id",
        error_message: language.enter_location,
      });
      return false;
    }
    // if there is no error empty the error object for this value
    else {
      resetTheErrorStatus("location_id");
    }
    if (showDistrict) {
      if (state.location_id === 1 || !state.location_id) {
        Dispatcher({
          type: "location_id",
          error_message: language.choice_district,
        });
        return false;
      } else {
        resetTheErrorStatus("location_id");
      }
    }
    if (!validator.isNumeric(`${Brand_id}`)) {
      setBrand_id_error(true);
      Dispatcher({
        type: "error_message",
        error_message: language.choice_brand,
      });
      return false;
    } else {
      setBrand_id_error(false);
      resetTheErrorStatus("error_message");
    }
    if (!validator.isNumeric(`${state.car_id}`)) {
      Dispatcher({
        type: "car_id",
        error_message: language.choice_model,
      });
      return false;
    } else {
      resetTheErrorStatus("car_id");
    }
    if (!validator.isNumeric(`${state.year_id}`)) {
      Dispatcher({
        type: "year_id",
        error_message: language.choice_year,
      });
      return false;
    } else {
      resetTheErrorStatus("year_id");
    }
    if (!validator.isNumeric(`${state.transmission_type_id}`)) {
      Dispatcher({
        type: "transmission_type_id",
        error_message: language.choice_transmission,
      });
      return false;
    } else {
      resetTheErrorStatus("transmission_type_id");
    }
    if (!validator.isNumeric(`${state.body_style_id}`)) {
      Dispatcher({
        type: "body_style_id",
        error_message: language.choice_body_style,
      });
      return false;
    } else {
      resetTheErrorStatus("body_style_id");
    }
    if (!validator.isNumeric(`${state.cylinder_id}`)) {
      Dispatcher({
        type: "cylinder_id",
        error_message: language.choice_cylinder,
      });
      return false;
    } else {
      resetTheErrorStatus("cylinder_id");
    }
    if (!validator.isNumeric(`${state.capacity}`)) {
      Dispatcher({
        type: "capacity",
        error_message: language.choice_capacity,
      });
      return false;
    } else {
      resetTheErrorStatus("capacity");
    }
    if (!validator.isNumeric(`${state.mileage_range_id}`)) {
      Dispatcher({
        type: "mileage_range_id",
        error_message: language.choice_mile_age,
      });
      return false;
    } else {
      resetTheErrorStatus("mileage_range_id");
    }
    if (!validator.isNumeric(`${state.value}`)) {
      Dispatcher({
        type: "value",
        error_message: language.choice_value,
      });
      return false;
    } else {
      resetTheErrorStatus("value");
    }
    if (`${state.registration_plate_first_part}`.length !== 2) {
      Dispatcher({
        type: "registration_plate_first_part",
        error_message: language.choice_license_should_be_2,
      });
      return false;
    } else {
      resetTheErrorStatus("registration_plate_first_part");
    }
    if (!state.registration_plate_second_part) {
      Dispatcher({
        type: "registration_plate_second_part",
        error_message: language.choice_license_2,
      });
      return false;
    } else {
      resetTheErrorStatus("registration_plate_second_part");
    }
    if (`${state.registration_plate_third_part}`.length !== 3) {
      Dispatcher({
        type: "registration_plate_third_part",
        error_message: language.choice_license_be_3,
      });
      return false;
    } else {
      resetTheErrorStatus("registration_plate_third_part");
    }
    if (`${state.registration_plate_forth_part}`.length !== 2) {
      Dispatcher({
        type: "registration_plate_forth_part",
        error_message: language.choice_district_code,
      });
      return false;
    } else {
      resetTheErrorStatus("registration_plate_forth_part");
    }
    // if (state.media_id.length < 1) {
    //   Dispatcher({
    //     type: "media_id",
    //     error_message: "لطفاً حداقل یک تصویر بارگذاری کنید",
    //   });
    //   return false;
    // } else {
    //   resetTheErrorStatus("media_id");
    // }
    if (!validator.isNumeric(`${state.color_id}`)) {
      Dispatcher({
        type: "color_id",
        error_message: language.choice_color,
      });
      return false;
    } else {
      resetTheErrorStatus("color_id");
    }
    return true;
  };

  const getModelList = async (i) => {
    try {
      const car_model_res: any = await REQUEST_GET_CAR_MODEL(i);
      setModelList(car_model_res.data);
      if (autoFillStorageData) {
        getBrandInfo(autoFillStorageData.model.value);
        setCarModelName(autoFillStorageData.model.text);
        dispatch({ type: "car_id", car_id: autoFillStorageData.model.value });
      }
    } catch (error) {
      console.log("!Error", error);
    }
  };

  const getDistricts = async (parent_id) => {
    try {
      const car_districts_res: any = await REQUEST_GET_LOCATION(parent_id);
      setDistrictList(car_districts_res.data);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  const clearRelativeToModel = () => {
    // RESET ALL BRAND RELATED FIELDS
    // setCarModelName(" ");
    dispatch({ type: "capacity", capacity: " " });
    dispatch({ type: "transmission_type_id", transmission_type_id: null });
    // dispatch({ type: "cylinder_id", cylinder_id: null });
    // setCylinderName(" ");
    dispatch({ type: "body_style_id", body_style_id: null });
    setBodyStyleName(" ");
    dispatch({ type: "empty_facility_id", empty_facility_id: [] });
  };
  /**
   *
   * @param id
   *  for the car id get all information about transmission, body style, etc...
   */
  const getBrandInfo = async (id) => {
    if (!id) return;
    // if the fields are filled, first clear them
    setShowTransmissionRadio(false);
    setShowBodyStyle(false);
    setShowCylinder(false);
    setShowCapacity(false);
    clearRelativeToModel();
    try {
      const model_info_res: any = await REQUEST_GET_MODEL_INFO(id);

      // Set facilities
      if (model_info_res.facility_set.length > 0) {
        // if there is facility list add new facilities to those
        model_info_res.facility_set.forEach((item) => {
          dispatch({ type: "facility_id", facility_id: item.id });
        });
      }
      // If facilities are filled, clear them
      else dispatch({ type: "empty_facility_id", empty_facility_id: [] });

      // Set capacity
      if (model_info_res.capacity)
        dispatch({ type: "capacity", capacity: model_info_res.capacity });
      else {
        setShowCapacity(true);
        dispatch({ type: "capacity", capacity: null });
      }

      // set transmission type
      if (model_info_res.transmission_type)
        dispatch({
          type: "transmission_type_id",
          transmission_type_id: model_info_res.transmission_type.id,
        });
      else {
        setShowTransmissionRadio(true);
        dispatch({
          type: "transmission_type_id",
          transmission_type_id: null,
        });
      }

      // Set cylinder
      if (model_info_res.cylinder) {
        incompleteInfo.cylinder.name.fa = model_info_res.cylinder.name.fa;
        dispatch({
          type: "cylinder_id",
          cylinder_id: model_info_res.cylinder.id,
        });
        setCylinderName(model_info_res.cylinder.name.fa);
      } else {
        setShowCylinder(true);
        dispatch({
          type: "cylinder_id",
          cylinder_id: null,
        });
        setCylinderName(" ");
      }

      // Set body-Style
      if (model_info_res.body_style) {
        incompleteInfo.body_style.name.fa = model_info_res.body_style.name.fa;
        dispatch({
          type: "body_style_id",
          body_style_id: model_info_res.body_style.id,
        });
        setBodyStyleName(model_info_res.body_style.name.fa);
      } else {
        dispatch({
          type: "body_style_id",
          body_style_id: null,
        });
        setBodyStyleName("");
        setShowBodyStyle(true);
      }
    } catch (error) {
      console.log("!Error", error);
    }
  };

  return (
    <article className="responsive add_car_form_container">
      <form
        className="add_car_form_step_1"
        onSubmit={(e) => submitHandler(e, state)}
      >
        <div className="pageTitle">
          {/* <IoIosCar className="car_icon" size="3.3rem" color="#4ba3ce" /> */}
          <h3>{language.add_car}</h3>
        </div>
        <p className="extra_text form_title">{language.fill_the_form}</p>
        <DropdownSearch
          InputDisable={true}
          error_status={!showDistrict ? ErrorState.location_id : false}
          label={language.where_is_the_car}
          search_place_holder={language.what_is_the_car_location_name}
          data={locationList}
          defaultVal={locationName}
          // clearField={() => {
          //   dispatch({ type: "location_id", location_id: null });
          //   setShowDistrict(false);
          // }}
          Select={(i) => {
            if (!showDistrict && ErrorState.location_id) {
              ErrorDispatch({
                type: "location_id",
                location_id: null,
                error_message: "",
              });
            }
            if (i.value === 1) {
              if (incompleteCarMode) {
                incompleteInfo.location.parent_id = 1;
                incompleteInfo.location.name.fa = null;
              }
              setShowDistrict(true);
            } else {
              // if user select rather then Tehran save city name to show it in message
              if (incompleteCarMode) {
                incompleteInfo.location.parent_id = null;
                incompleteInfo.location.name.fa = i.text;
              }
              setLocationName(i.text);
              setShowDistrict(false);
            }
            dispatch({ type: "location_id", location_id: i.value });
            if (i.value === 1) getDistricts(i.value);
          }}
        />
        {state.location_id !== 1 &&
          state.location_id !== null &&
          !showDistrict && (
            <p className="extra_text">{`${language.showDistrict_text_1}${locationName}${language.showDistrict_text_2}`}</p>
          )}

        {showDistrict && (
          <DropdownSearch
            // if the user choose Tehran location_id error belong to district drop-down
            error_status={showDistrict ? ErrorState.location_id : false}
            InputDisable={true}
            label={language.district_input_label}
            search_place_holder={language.district_input_place_holder}
            defaultVal={DistrictName}
            data={districtList}
            // before location id select this box will have shown but its disabled
            disabled={!showDistrict}
            // clearField={() =>
            //   dispatch({ type: "location_id", location_id: null })
            // }
            Select={(i) => {
              if (showDistrict && ErrorState.location_id) {
                ErrorDispatch({
                  type: "location_id",
                  location_id: null,
                  error_message: "",
                });
              }
              if (incompleteCarMode) {
                incompleteInfo.location.parent_id = 1;
                incompleteInfo.location.name.fa = i.text;
              }
              dispatch({ type: "location_id", location_id: i.value });
            }}
          />
        )}
        <div className="Car_info_step_1">
          <DropdownSearch
            InputDisable={true}
            error_status={Brand_id_error}
            label={language.brand_input_label}
            search_place_holder={language.brand_input_place_holder}
            defaultVal={Brand_Name}
            data={BrandList}
            // clearField={() => {
            //   autoFillStorageData = null;
            //   setCarModelName(null);
            //   setModelList([]);
            //   dispatch({ type: "car_id", car_id: null });
            //   setBrand_id(null);
            // }}
            Select={(i) => {
              autoFillStorageData = null;
              if (Brand_id_error) {
                setBrand_id_error(false);
              }
              dispatch({
                type: "value",
                value: "",
              });
              dispatch({ type: "car_id", car_id: null });
              setModelList([]);
              clearRelativeToModel();
              setBrand_id(i.value);
              getModelList(i.value);
              if (incompleteCarMode) {
                incompleteInfo.car.brand.name.fa = i.text;
                incompleteInfo.car.brand.id = i.value;
              }
            }}
          />
          <DropdownSearch
            InputDisable={true}
            error_status={ErrorState.car_id}
            disabled={!Brand_id ? true : false}
            defaultVal={CarModelName}
            label={language.model_input_label}
            search_place_holder={language.model_input_place_holder}
            data={ModelList}
            // clearField={() => dispatch({ type: "car_id", car_id: null })}
            Select={(i) => {
              if (ErrorState.car_id) {
                ErrorDispatch({
                  type: "car_id",
                  car_id: null,
                  error_message: "",
                });
              }
              if (incompleteCarMode) incompleteInfo.car.name.fa = i.text;
              clearRelativeToModel();
              getBrandInfo(i.value);
              dispatch({ type: "car_id", car_id: i.value });
            }}
          />
          <DropdownSearch
            InputDisable={true}
            label={language.year_input_label}
            error_status={ErrorState.year_id}
            defaultVal={YearName}
            disableSearch={true}
            data={YearList}
            // clearField={() => dispatch({ type: "year_id", year_id: null })}
            Select={(i) => {
              if (ErrorState.year_id) {
                ErrorDispatch({
                  type: "year_id",
                  year_id: null,
                  error_message: "",
                });
              }
              if (incompleteCarMode) incompleteInfo.year.name.fa = i.text;
              dispatch({ type: "year_id", year_id: i.value });
            }}
          />
        </div>
        {showTransmissionRadio && (
          <div className="radio_father">
            <label
              className={[
                "transition_type_Label",
                ErrorState.transmission_type_id ? "Error_color" : null,
              ].join(" ")}
            >
              {language.transmission_type_label}
            </label>
            <Radio
              name="transmission_type_id"
              error_status={ErrorState.transmission_type_id}
              SelectHandler={(i) => {
                if (ErrorState.transmission_type_id) {
                  ErrorDispatch({
                    type: "transmission_type_id",
                    transmission_type_id: null,
                    error_message: "",
                  });
                }
                dispatch({
                  type: "transmission_type_id",
                  transmission_type_id: +i,
                });
              }}
              defaultCheck={state.transmission_type_id}
              data={[
                {
                  label: language.manual_transmission,
                  value: 2,
                },
                {
                  label: language.automatic_transmission,
                  value: 1,
                },
              ]}
            />
          </div>
        )}
        {showBodyStyle && (
          <DropdownSearch
            InputDisable={true}
            error_status={ErrorState.body_style_id}
            label={language.body_style_lable}
            data={BodyStyleList}
            disableSearch={true}
            defaultVal={BodyStyleName}
            // clearField={() =>
            //   dispatch({ type: "body_style_id", body_style_id: null })
            // }
            Select={(i) => {
              if (ErrorState.body_style_id) {
                ErrorDispatch({
                  type: "body_style_id",
                  body_style_id: null,
                  error_message: "",
                });
              }
              if (incompleteCarMode) incompleteInfo.body_style.name.fa = i.text;
              dispatch({ type: "body_style_id", body_style_id: i.value });
            }}
          />
        )}
        {showCylinder && (
          <DropdownSearch
            InputDisable={true}
            error_status={ErrorState.cylinder_id}
            label={language.cylinder_input_lable}
            data={cylinderList}
            disableSearch={true}
            defaultVal={CylinderName}
            // clearField={() =>
            //   dispatch({ type: "cylinder_id", cylinder_id: null })
            // }
            Select={(i) => {
              if (ErrorState.cylinder_id) {
                ErrorDispatch({
                  type: "cylinder_id",
                  cylinder_id: null,
                  error_message: "",
                });
              }
              if (incompleteCarMode) incompleteInfo.cylinder.name.fa = i.text;
              dispatch({ type: "cylinder_id", cylinder_id: i.value });
            }}
          />
        )}
        {showCapacity && (
          <DropdownSearch
            InputDisable={true}
            error_status={ErrorState.capacity}
            label={language.capacity_input_lable}
            data={capacityList}
            disableSearch={true}
            defaultVal={state.capacity}
            // clearField={() => dispatch({ type: "capacity", capacity: null })}
            Select={(i) => {
              if (ErrorState.capacity) {
                ErrorDispatch({
                  type: "capacity",
                  capacity: null,
                  error_message: "",
                });
              }
              dispatch({ type: "capacity", capacity: i.value });
            }}
          />
        )}
        <DropdownSearch
          InputDisable={true}
          error_status={ErrorState.mileage_range_id}
          label={language.mile_age_input_lable}
          defaultVal={
            state.mileage_range_id
              ? mileRange[state.mileage_range_id - 1].text
              : ""
          }
          data={mileRange}
          disableSearch={true}
          // clearField={() =>
          //   dispatch({ type: "mileage_range_id", mileage_range_id: null })
          // }
          Select={(i) => {
            if (ErrorState.mileage_range_id) {
              ErrorDispatch({
                type: "mileage_range_id",
                mileage_range_id: null,
                error_message: "",
              });
            }
            dispatch({ type: "mileage_range_id", mileage_range_id: i.value });
          }}
        />
        <div className="value_container">
          <TextInput
            name="value"
            number={true}
            onChangeHandler={(e) => {
              if (ErrorState.value) {
                ErrorDispatch({
                  type: "value",
                  value: null,
                  error_message: "",
                });
              }
              dispatch({
                type: "value",
                value: e,
              });
            }}
            clearField={() =>
              dispatch({
                type: "value",
                value: "",
              })
            }
            autoFocus={false}
            error={{
              status: ErrorState.value,
              message: "",
            }}
            min={7}
            max={14}
            value={state.value}
            label={language.value_of_car_label}
            validation={{
              number: true,
              min: 20000000,
              messages: {
                required: language.value_input_error_require,
                min: language.value_input_error_min,
              },
              required: true,
            }}
            showTail={true}
            tail_value={`${NumbersAndCurrencyUnit({
              value: state.value,
            })} ${language.toman}`}
          />
        </div>
        <div className="pelak_container">
          <label>{language.car_license_label}</label>
          <p className="extra_text">{language.car_license_text}</p>
          <div className="license_palte_container">
            <img src={pelak} alt={language.car_license_image_alt} />
            <div className="pelak_input">
              <div className="pelak_input_box_controller">
                <div className="Fourth_part_pelak">
                  <TextInput
                    label="4"
                    name="registration_plate_forth_part"
                    clearField={() =>
                      dispatch({
                        type: "registration_plate_forth_part",
                        registration_plate_forth_part: "",
                      })
                    }
                    HideClearIcon={true}
                    onChangeHandler={(e) => {
                      if (ErrorState.registration_plate_forth_part) {
                        ErrorDispatch({
                          type: "registration_plate_forth_part",
                          registration_plate_forth_part: null,
                          error_message: "",
                        });
                      }
                      dispatch({
                        type: "registration_plate_forth_part",
                        registration_plate_forth_part: e,
                      });
                    }}
                    min={2}
                    max={2}
                    autoFocus={false}
                    value={state.registration_plate_forth_part}
                    error={{
                      status: ErrorState.registration_plate_forth_part,
                      message: "",
                    }}
                  />
                </div>
                <div className="Third_part_pelak">
                  <TextInput
                    label="3"
                    name="registration_plate_third_part"
                    clearField={() =>
                      dispatch({
                        type: "registration_plate_third_part",
                        registration_plate_third_part: "",
                      })
                    }
                    min={3}
                    max={3}
                    HideClearIcon={true}
                    autoFocus={false}
                    value={state.registration_plate_third_part}
                    error={{
                      status: ErrorState.registration_plate_third_part,
                      message: "",
                    }}
                    onChangeHandler={(e) => {
                      if (ErrorState.registration_plate_third_part) {
                        ErrorDispatch({
                          type: "registration_plate_third_part",
                          registration_plate_third_part: null,
                          error_message: "",
                        });
                      }
                      dispatch({
                        type: "registration_plate_third_part",
                        registration_plate_third_part: e,
                      });
                    }}
                  />
                </div>
                <div className="Second_part_pelak">
                  <DropdownSearch
                    InputDisable={true}
                    error_status={ErrorState.registration_plate_second_part}
                    data={PelakList}
                    disableSearch={true}
                    defaultVal={state.registration_plate_second_part}
                    // clearField={() =>
                    //   dispatch({
                    //     type: "registration_plate_second_part",
                    //     registration_plate_second_part: null,
                    //   })
                    // }
                    Select={(i) => {
                      if (ErrorState.registration_plate_second_part) {
                        ErrorDispatch({
                          type: "registration_plate_second_part",
                          registration_plate_second_part: null,
                          error_message: "",
                        });
                      }
                      dispatch({
                        type: "registration_plate_second_part",
                        registration_plate_second_part: i.value,
                      });
                    }}
                    hideArrowDown={true}
                    hideClearField={true}
                  />
                </div>
                <div className="First_part_pelak">
                  <TextInput
                    label="1"
                    name="registration_plate_first_part"
                    value={state.registration_plate_first_part}
                    error={{
                      status: ErrorState.registration_plate_first_part,
                      message: "",
                    }}
                    min={2}
                    max={2}
                    HideClearIcon={true}
                    clearField={() =>
                      dispatch({
                        type: "registration_plate_first_part",
                        registration_plate_first_part: "",
                      })
                    }
                    onChangeHandler={(e) => {
                      if (ErrorState.registration_plate_first_part) {
                        ErrorDispatch({
                          type: "registration_plate_first_part",
                          registration_plate_first_part: null,
                          error_message: "",
                        });
                      }
                      dispatch({
                        type: "registration_plate_first_part",
                        registration_plate_first_part: e,
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <label className="add_car_Facilities_label">
          {language.car_facilities_lable}
        </label>
        {facilitesList.length === 0 ? (
          <div className="Step1_checkoout_placeholder">
            {checkListLoaderLength.map((_, i) => (
              <CheckBox_Loader key={i} />
            ))}
          </div>
        ) : (
          <div className="facilities_container">
            <Checkbox
              custom_className={
                showMoreFacilities ? "" : "show_partial_facilities"
              }
              initialValue={state.facility_id}
              data={facilitesList}
              name="facility_id"
              clearField={(item) =>
                dispatch({
                  type: "Remove_facility_id",
                  remove_id: item.value,
                })
              }
              Select={(item) => {
                dispatch({
                  type: "facility_id",
                  facility_id: item.value,
                });
              }}
            />
            {showMoreFacilities ? null : (
              <>
                <div className="gradient_transparent" />
                <p
                  onClick={() => {
                    setShowMoreFacilities(true);
                  }}
                  className="show_more_facilities_button"
                >
                  {language.car_facilities_show_more_facilities_button}
                  <IoIosArrowDown size="2rem" color="#4ba3ce" />
                </p>
              </>
            )}
          </div>
        )}
        <div className="colorPicker_container">
          <DropdownSearch
            label={language.car_color_picker_lable}
            error_status={ErrorState.color_id}
            InputDisable={true}
            data={colorList}
            // active color picker drop downw
            colorPicker={true}
            defaultVal={colorCode}
            hardValue={language.car_color_picker_hard_value}
            disableSearch={true}
            hideClearField={true}
            // clearField={() =>
            //   dispatch({
            //     type: "color_id",
            //     color_id: null,
            //   })
            // }
            Select={(i) => {
              if (ErrorState.color_id) {
                ErrorDispatch({
                  type: "color_id",
                  color_id: null,
                  error_message: "",
                });
              }
              if (incompleteCarMode) incompleteInfo.color.code = i.code;
              dispatch({
                type: "color_id",
                color_id: i.value,
              });
            }}
          />
        </div>
        <ImageUploader
          Upload_image={(id) => {
            dispatch({
              type: "media_id",
              media_id: id,
            });
          }}
          error_status={ErrorState.media_id}
          default_image={initialImage}
          delete_image={(id) => {
            dispatch({
              type: "Remove_media_id",
              Remove_media_id: id,
            });
          }}
          language={language.imageuploader}
        />
        <label>
          {language.car_description_lable}
          <span> {language.car_description_option}</span>
        </label>
        <p className="step_one_under_label_descripe">
          {language.car_description_text}
        </p>
        <textarea
          className="text_area_step_1"
          value={state.description}
          onChange={(e) => {
            dispatch({
              type: "description",
              description: e.target.value,
            });
          }}
        />
        <Button
          value={language.form_submit_button}
          loading={Loading}
          disable={Loading}
          class="Blue_BTN local_style HEAP_AddCar_Btn_Submit"
          // onCLick nothing happend we listen to the form submition
          click={() => {}}
        />
        {/* show the error message */}
        <p className="Error_message_text">{ErrorState.error_message}</p>
      </form>
    </article>
  );
};
interface IAdd_Car_Step_1 {
  language: any;
}
export default Add_Car_Step_1;
