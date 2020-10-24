/**
 * You can find the list of the all APIs in points.txt  
 */

import { REQUEST_GET_LOCATION } from "./get/getLocations";
import { REQUEST_GET_SEARCH_FOR_RENT } from "./get/getSearchForRent";
import { REQUEST_GET_RENTAL_CAR } from "./get/getCar";
import { GET_ORDER_REQUEST } from "./get/getOrderRequest";
import { REQUEST_GET_ORDER_REQUESTS } from "./get/getOrderRequests";
import { REQUEST_GET_CAR_BRAND } from "./get/getCarBrand";
import { REQUEST_GET_YEAR } from "./get/getYear";
import { REQUEST_GET_CAR_MODEL } from "./get/getCarModel";
import { REQUEST_GET_CAR_BODY_STYLE } from "./get/getBodyStyle";
import { REQUEST_GET_CAR_CYLINDER } from "./get/getCylinder";
import { REQUEST_GET_CAR_FACILITIES } from "./get/getFacilities";
import { REQUEST_GET_CAR_COLORS } from "./get/getCarColors";
import { REQUEST_GET_MODEL_INFO } from "./get/getModelInfo";
import { REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING } from "./get/getRentalCar";
import { REQUEST_GET_RENTAL_CAR_AVAILABILITIES } from "./get/getCarAvailability";
import { REQUEST_GET_RENTAL_CAR_DISCOUNTS } from "./get/getCarDiscount";
import { REQUEST_GET_USER_CARS } from "./get/getUserCars";
import { REQUEST_GET_USER_INFO } from "./get/getUserInfo";
import { REQUEST_GET_FAQ } from "./get/getFaq";
import { REQUEST_GET_URLS_FOR_SITE_MAP } from "./get/getSiteMapLinks";
import { REQUEST_GET_LANDING_PAGE } from "./get/getLanding";
import { REQUEST_GET_CAR_PRICE_ESTIMATION } from "./get/getPriceEstimation";

// SET
import { REQUEST_REMOVE_CAR_MEDIA } from "./set/removeCarMedia";
import { REQUEST_NEW_CAR_MEDIA } from "./set/setCarMedia";
import { REQUEST_ADD_NEW_CAR } from "./set/setNewcar";
import { REQUEST_SET_RENT_REQUEST } from "./set/setRentRequest";
import { REQUEST_REQUEST_ACTION } from "./set/setRequestAction";
import { REQUEST_SET_USER_IMAGE } from "./set/setUserImage";
import { REQUEST_SET_FIRST_LAST_NAME } from "./set/setFirstandLastName";
import { REQUEST_SET_USERNAME } from "./set/setUsername";
import { REQUEST_SET_COMPANY_NAME } from "./set/setCompanyName";
import { REQUEST_SET_OUT_OF_SERVICE } from "./set/setIsOutOfService";
import { REQUEST_DELETE_CAR } from "./set/setDeleteCar";
import { REQUEST_USER_INFO_UPDATE } from "./set/setUserInfoupdate";
import { REQUEST_SET_CAR_DISCOUNT } from "./set/setCarDiscount";
import { REQUEST_SET_CAR_AVAILABILITY } from "./set/setCarAvailablity";
import { REQUEST_SET_CAR_PARTIAL } from "./set/setCarPartial";

export {
  REQUEST_GET_LOCATION,
  REQUEST_GET_SEARCH_FOR_RENT,
  REQUEST_GET_RENTAL_CAR,
  GET_ORDER_REQUEST,
  REQUEST_GET_ORDER_REQUESTS,
  REQUEST_GET_CAR_BRAND,
  REQUEST_GET_YEAR,
  REQUEST_GET_CAR_MODEL,
  REQUEST_GET_CAR_BODY_STYLE,
  REQUEST_GET_CAR_CYLINDER,
  REQUEST_GET_CAR_FACILITIES,
  REQUEST_REMOVE_CAR_MEDIA,
  REQUEST_NEW_CAR_MEDIA,
  REQUEST_GET_CAR_COLORS,
  REQUEST_GET_MODEL_INFO,
  REQUEST_ADD_NEW_CAR,
  REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING,
  REQUEST_GET_RENTAL_CAR_AVAILABILITIES,
  REQUEST_GET_RENTAL_CAR_DISCOUNTS,
  REQUEST_SET_RENT_REQUEST,
  REQUEST_REQUEST_ACTION,
  REQUEST_GET_USER_CARS,
  REQUEST_GET_USER_INFO,
  REQUEST_SET_USER_IMAGE,
  REQUEST_SET_FIRST_LAST_NAME,
  REQUEST_SET_USERNAME,
  REQUEST_SET_COMPANY_NAME,
  REQUEST_SET_OUT_OF_SERVICE,
  REQUEST_DELETE_CAR,
  REQUEST_USER_INFO_UPDATE,
  REQUEST_GET_FAQ,
  REQUEST_GET_URLS_FOR_SITE_MAP,
  REQUEST_GET_LANDING_PAGE,
  REQUEST_GET_CAR_PRICE_ESTIMATION,
  REQUEST_SET_CAR_DISCOUNT,
  REQUEST_SET_CAR_AVAILABILITY,
  REQUEST_SET_CAR_PARTIAL,
};
