import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import {
  IoIosCheckboxOutline,
  IoIosCard,
  IoIosRemoveCircle,
  IoIosEyeOff,
  IoLogoModelS,
  IoIosHand,
  IoMdFlag,
  IoIosDownload,
  IoMdArrowRoundBack,
  IoMdPerson,
} from "react-icons/io";
import PelakView from "../../../components/pelak";

import carImage from "../../../../public/image/car-image-thumbnail.jpg";

// import "./request_cart.scss";
import Link from "next/link";
import Button from "../../../components/form/Button";
import { REQUEST_REQUEST_ACTION } from "../../../API";
import jsCookie from "js-cookie";

moment.loadPersian({ dialect: "persian-modern" });

const Request_cart = ({ data, getDataAgain, language }: IRequest_cart) => {
  const [rentStatus, setRentStatus] = useState(null);
  const [status_id, setStatus_id] = useState(null);
  const [car, setCar] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [no_of_days, setNo_of_days] = useState(null);
  const [media_set, setMedia_set] = useState(null);
  const [discounted_total_price, setDiscounted_total_price] = useState(null);
  // "renter" ? true: false
  const [role, setRole] = useState(true);
  const [owner_Info, setOwner_Info] = useState(null);
  const [renter_info, setRenter_info] = useState(null);
  const [pelak, setPelak] = useState(null);
  const [button_code, setButton_code] = useState([]);
  const [ButtonLoader, setButtonLoader] = useState(false);
  const [rejectButtonLoader, setRejectButtonLoader] = useState(false);
  const [insurance_total_price, setInsurance_total_price] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [system_discount, setSystem_discount] = useState(null);

  const token = jsCookie.get("token");

  const setForRequest = async (data: any) => {
    if (data.action === "reject") {
      setRejectButtonLoader(true);
    } else {
      setButtonLoader(true);
    }
    try {
      const request_res: any = await REQUEST_REQUEST_ACTION({
        token,
        id: data.id,
        action: data.action,
      });
      setButtonLoader(false);
      setRejectButtonLoader(false);
      if (data.action === "pay") {
        window.location.href = `${request_res.redirect_to}`;
      } else
        switch (data.action) {
          case "approve":
            CreateTheStatusForThisCard("approved");
            break;
          case "reject":
            CreateTheStatusForThisCard("rejected");
            break;
          case "deliver":
            CreateTheStatusForThisCard("delivered");
            break;
          case "return":
            CreateTheStatusForThisCard("returned");
            break;
          default:
            break;
        }
      //  else {
      //   getDataAgain(data.id);
      // }
    } catch (error) {
      setButtonLoader(false);
      setRejectButtonLoader(false);
      console.log("!Error", error);
    }
  };

  useEffect(() => {
    if (data) {
      CreateTheStatusForThisCard();
    }
  }, [data]);

  const CreateTheStatusForThisCard = (status = null) => {
    /**
     * @renter
     * اجاره گیرنده
     *
     * @owner
     * اجاره دهنده
     */
    let renter = data.role === "renter" ? true : false;
    let has_insurance = data.has_insurance ? true : false;

    // small portion at the top right on the request cart
    let RentStatus = null;
    setStatus_id(status ? status : data.status.id);
    switch (status ? status : data.status.id) {
      case "new":
        RentStatus = (
          <div className="rent_status">
            <IoIosDownload size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        // set the button attribute base on the role and action
        setButton_code(
          !renter
            ? [
                {
                  value: language.accept,
                  class:
                    "Blue_BTN request_car_accept HEAP_Requests_Btn_Accept ACCEPTED_INCOMING_REQUEST",
                  click: () =>
                    setForRequest({ action: "approve", id: data.id }),
                },
                {
                  value: language.reject,
                  class:
                    "Blue_BTN request_car_reject HEAP_Requests_Btn_Reject REJECT_INCOMING_REQUEST",
                  loading: ButtonLoader,
                  click: () => setForRequest({ action: "reject", id: data.id }),
                },
              ]
            : []
        );
        break;
      case "approved":
        RentStatus = (
          <div className="rent_status">
            <IoIosCard size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        setButton_code(
          renter
            ? [
                {
                  value: language.pay,
                  class:
                    "Blue_BTN request_car_pay GO_TO_BANK HEAP_Requests_Btn_GotoBank",
                  click: () => setForRequest({ action: "pay", id: data.id }),
                },
              ]
            : []
        );
        break;
      case "rejected":
        RentStatus = (
          <div className="rent_status">
            <IoIosRemoveCircle size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        setButton_code([]);
        break;
      case "cancelled":
        RentStatus = (
          <div className="rent_status">
            <IoIosEyeOff size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        break;
      case "paid":
        RentStatus = (
          <div className="rent_status">
            <IoIosCheckboxOutline size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        setButton_code(
          renter
            ? [
                {
                  value: language.deliver,
                  class:
                    "Blue_BTN request_car_pay HEAP_Requests_Btn_CarDelivered CAR_DELIVERED",
                  click: () =>
                    setForRequest({ action: "deliver", id: data.id }),
                },
              ]
            : []
        );
        break;
      case "not_delivered":
        RentStatus = (
          <div className="rent_status">
            <IoIosHand size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        break;
      case "delivered":
        RentStatus = (
          <div className="rent_status">
            <IoLogoModelS size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        setButton_code(
          !renter
            ? [
                {
                  value: language.returned,
                  class:
                    "Blue_BTN request_car_pay HEAP_Requests_Btn_CarReturned",
                  click: () => {
                    setForRequest({ action: "return", id: data.id });
                  },
                },
              ]
            : []
        );
        break;
      case "returned":
        RentStatus = (
          <div className="rent_status">
            <IoMdFlag size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        setButton_code(
          renter
            ? [
                {
                  value: language.review,
                  class: "Blue_BTN request_car_pay",
                  click: () => {},
                },
              ]
            : [
                {
                  value: language.review,
                  class: "Blue_BTN request_car_pay",
                  click: () => {},
                },
              ]
        );
        break;
      default:
        RentStatus = (
          <div className="rent_status">
            <IoIosDownload size="1.4rem" color="#656565" />
            <span>{data.status.name}</span>
          </div>
        );
        break;
    }
    // set initials value
    setRentStatus(RentStatus);
    setCar(data.rent_search_dump.car);
    setStart_date(data.rent_search_dump.start_date);
    setEnd_date(data.rent_search_dump.end_date);
    setNo_of_days(data.rent_search_dump.no_of_days);
    if (data.rent_search_dump.media_set.length > 0)
      setMedia_set(data.rent_search_dump.media_set[0]);
    else setMedia_set({ thumbnail_url: carImage });
    setDiscounted_total_price(
      renter
        ? data.rent_search_dump.discounted_total_price
        : data.rent_search_dump.owner_price
        ? data.rent_search_dump.owner_price
        : data.rent_search_dump.discounted_total_price
    );
    setInsurance_total_price(
      has_insurance ? data.rent_search_dump.insurance_total_price : 0
    );
    setCoupon(
      data.rent_search_dump.coupon
        ? data.rent_search_dump.coupon.total_price
        : null
    );
    setSystem_discount(data.rent_search_dump.system_discount);
    setRole(renter);
    setOwner_Info(data.rent_search_dump.owner);
    setRenter_info(data.renter);
    setPelak({
      registration_plate_first_part:
        data.rent_search_dump.registration_plate_first_part,
      registration_plate_second_part:
        data.rent_search_dump.registration_plate_second_part,
      registration_plate_third_part:
        data.rent_search_dump.registration_plate_third_part,
      registration_plate_forth_part:
        data.rent_search_dump.registration_plate_forth_part,
    });
  };

  return (
    media_set && (
      <>
        {rentStatus}
        <div className="cart">
          <div className="rent_info">
            <h2>
              {car.brand.name.fa} {car.name.fa}
            </h2>
            {/* <h3>مدت اجاره {no_of_days} روز</h3> */}
            {/* <div className="rent_duration"> */}
            <p>
              <span>
                {/* day's name of week  */}
                {moment(start_date, "jYYYY/jMM/jDD").format("dddd")} <br />
                <span>
                  {/* e.g, 99 01 23 */}
                  {moment(start_date, "jYYYY/jMM/jDD").format("jDD jMMMM jYY")}
                </span>
              </span>
              {/* <IoMdArrowRoundBack size="2rem" color="#202020" /> */}
              <span>
                {moment(end_date, "jYYYY/jMM/jDD").format("dddd")} <br />
                <span>
                  {moment(end_date, "jYYYY/jMM/jDD").format("jDD jMMMM jYY")}
                </span>
              </span>
            </p>
            {/* </div> */}
            <p>
              <span>{language.rent_duration}</span>
              <span>
                {no_of_days} {language.day}
              </span>
            </p>
            <p>
              <span>{language.cost}</span>
              {role ? (
                <span>
                  {insurance_total_price
                    ? coupon
                      ? (coupon + insurance_total_price).toLocaleString()
                      : (
                          discounted_total_price + insurance_total_price
                        ).toLocaleString()
                    : coupon
                    ? coupon.toLocaleString()
                    : discounted_total_price.toLocaleString()}{" "}
                  {language.toman}
                </span>
              ) : (
                <span>
                  {discounted_total_price.toLocaleString()} {language.toman}
                </span>
              )}
            </p>
          </div>
          <div className="image_pelak">
            <figure>
              <img
                src={media_set.thumbnail_url}
                alt={`${car.brand.name.fa} ${car.name.fa}`}
              />
            </figure>
            {/* if the status is not one of these status, show the PELAK */}
            {!role ||
            status_id === "paid" ||
            status_id === "delivered" ||
            status_id === "returned" ? (
              <PelakView
                registration_plate_first_part={
                  pelak.registration_plate_first_part
                }
                registration_plate_second_part={
                  pelak.registration_plate_second_part
                }
                registration_plate_third_part={
                  pelak.registration_plate_third_part
                }
                registration_plate_forth_part={
                  pelak.registration_plate_forth_part
                }
              />
            ) : null}
          </div>
        </div>
        <div className="Role_container">
          {role ? (
            <>
              <Link href="/user/[id]" as={`/user/${owner_Info.id}`}>
                <a>
                  <IoMdPerson size="2rem" />
                  {owner_Info.name}
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/user/[id]" as={`/user/${renter_info.id}`}>
                <a>
                  <IoMdPerson size="2rem" />
                  {renter_info.name}
                </a>
              </Link>
              {/* show the renter's cellphone to the owner if the status is "approved" */}
              {status_id === "approved" && (
                <a href={`tel:0${renter_info.cell}`}>
                  0{renter_info.cell}
                  <span className="extra_Text"> {language.contact_with_renter}</span>
                </a>
              )}
            </>
          )}
        </div>
        <div className="Button_container">
          {/* {button_code} */}
          {button_code.length > 0 &&
            button_code.map((item, i) => (
              <Button
                key={i}
                // the button adjust in useEffect on data
                value={item.value}
                class={item.class}
                loading={i === 1 ? rejectButtonLoader : ButtonLoader}
                click={item.click}
              />
            ))}
        </div>
      </>
    )
  );
};

interface IRequest_cart {
  data: any;
  // update the list
  getDataAgain?: any;
  language: any;
}

export default Request_cart;
