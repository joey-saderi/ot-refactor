import React, { useState, useEffect, useContext } from "react";
import { REQUEST_GET_RENTAL_CAR, REQUEST_SET_RENT_REQUEST } from "../../API";
import Router from "next/router";
// import "./checkout.scss";

import Button from "../../components/form/Button";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import moment from "moment-jalaali";
import Insurance from "./insurance";
import TextInput from "../../components/form/TextInput";
import jsCookie from "js-cookie";
import Checkout_Container_Loader from "../../components/cartPlaceholder/checkoutLoading";
import Modal_context from "../../../src/context/Modal_context";
import { NextSeo } from "next-seo";
import Toast_context from "../../context/Toast_context";
import carImage from "../../../public/image/car-image-thumbnail.jpg";

// use شنبه،یک شنبه و ....
moment.loadPersian({ dialect: "persian-modern" });

const Checkout_Container = ({ language }: ICheckout_Container) => {
  const [car, setCar] = useState(null);
  const [year, setYear] = useState(null);
  const [media_set, setMedia_set] = useState([]);
  const [
    avg_discounted_price_per_day,
    setAvg_discounted_price_per_day,
  ] = useState(null);
  const [total_price, setTotal_price] = useState(null);
  const [unit, setUnit] = useState("هراز");
  const [with_driver, setWith_driver] = useState(null);
  const [max_km_per_day, setMax_km_per_day] = useState(null);
  const [extra_km_price_name, setExtra_km_price_name] = useState(null);
  const [id, setId] = useState(null);
  const [location, setLocation] = useState(null);
  const [owner, setOwner] = useState(null);
  const [cancellation_policy, setCancellation_policy] = useState(null);
  const [search_id, setSearch_id] = useState(null);

  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [insurance_total_price, setInsurance_total_price] = useState(null);
  const [has_system_discount, setHas_system_discount] = useState(null);
  const [no_of_days, setNo_of_days] = useState(null);
  const [discounted_total_price, setDiscounted_total_price] = useState(null);
  const [total_discount, setTotal_discount] = useState(null);
  const [showInsurance, setShowInsurance] = useState(true);
  const [showcoupon, setShowcoupon] = useState(false);
  const [useCouponPrice, setUseCouponPrice] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState({
    status: false,
    message: "",
  });
  const [coupanLoading, setCoupanLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const MODAL_CONTEXT = useContext(Modal_context);
  const TOAST_CONTEXT = useContext(Toast_context);

  const token = jsCookie.get("token");

  useEffect(() => {
    const { search_id } = Router.router.query;
    fetchData(search_id);
  }, []);

  const fetchData = async (search_id) => {
    try {
      const res: any = await REQUEST_GET_RENTAL_CAR({ search_id });
      set_CarInformation(res);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  const set_CarInformation = (res) => {
    setCar(res.car);
    setYear(res.year);
    setInsurance_total_price(res.insurance_total_price);
    setAvg_discounted_price_per_day(res.avg_discounted_price_per_day);
    setUnit(res.avg_discounted_price_per_day >= 1000000 ? "میلیون" : "هزار");
    setTotal_price(res.total_price);
    setHas_system_discount(res.has_system_discount);
    setWith_driver(res.with_driver);
    setNo_of_days(res.no_of_days);
    setMax_km_per_day(res.max_km_per_day);
    setExtra_km_price_name(res.extra_km_price_name);
    setDiscounted_total_price(res.discounted_total_price);
    setId(res.id);
    setTotal_discount(res.total_discount);
    setLocation(res.location);
    setOwner(res.owner);
    setCancellation_policy(res.cancellation_policy);
    if (res.has_media) setMedia_set(res.media_set);
    else setMedia_set([{ thumbnail_url: carImage }]);
    setSearch_id(res.search_id);
    setStart_date(res.start_date);
    setEnd_date(res.end_date);
  };

  const hasInsurance = (e) => {
    // show the insurance part in price box
    if (e == 2) setShowInsurance(true);
    else setShowInsurance(false);
  };

  const couponHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      MODAL_CONTEXT.modalHandler("Login");
      setLoading(false);
      return;
    }
    if (!checkRegister()) {
      return;
    }
    setCoupanLoading(true);
    // validation
    if (coupon.length === 0) {
      setCouponError({
        status: true,
        message: "لطفا کد تخفیف خود را وارد کنید",
      });
      setCoupanLoading(false);
      return;
    }
    setCouponError({
      status: false,
      message: "",
    });
    let data = {
      token,
      coupon,
      search_id,
    };
    setCoupanLoading(true);
    try {
      const coupon_res: any = await REQUEST_GET_RENTAL_CAR(data);
      setCoupanLoading(false);
      setUseCouponPrice(true);
      setCouponDiscount(coupon_res.coupon.discounted_price);
      setDiscounted_total_price(coupon_res.coupon.total_price);
    } catch (error) {
      setCoupanLoading(false);
      setCouponError({
        status: true,
        message: error,
      });
    }
  };

  const checkRegister = () => {
    const complete_register = jsCookie.get("complete_register");
    if (complete_register !== "true") {
      Router.push("/complete-register");
      return false;
    } else {
      return true;
    }
  };

  const GoToRequests = async () => {
    setLoading(true);
    if (!token) {
      MODAL_CONTEXT.modalHandler("Login");
      setLoading(false);
      return;
    }
    if (!checkRegister()) {
      return;
    }
    const user_id = jsCookie.get("user_id");
    if (user_id == owner.id) {
      alert("شما نمیتوانید خودرو خودتان را اجاره کنید");
      setLoading(false);
      return;
    }
    let data = {
      token,
      search_id,
      coupon_code: useCouponPrice ? coupon : null,
      has_insurance: showInsurance,
    };
    try {
      const new_rent_req_res = await REQUEST_SET_RENT_REQUEST(data);
      TOAST_CONTEXT.toast_option({
        message:
          "درخواست شما ثبت شد. میزبان پس از بررسی، درخواست را قبول یا رد خواهد کرد. نتیجه را از طریق پیامک به اطلاعتان می‌رسانیم.",
        time: 10,
        autoClose: true,
      });
      Router.push("/requests");
    } catch (error) {
      setLoading(false);
      console.log("!Error", error);
    }
  };

  return media_set.length > 0 ? (
    <>
      <NextSeo
        title={`${language.next_seo.title.start}${car.brand.name.fa} ${car.name.fa}${language.next_seo.title.otoli}`}
        description={language.next_seo.description}
        openGraph={{
          title: `${language.next_seo.title.start}${car.brand.name.fa} ${car.name.fa}${language.next_seo.title.otoli}`,
          description: language.next_seo.description,
          site_name: language.next_seo.site_name,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <article className="responsive Checkout_container">
        <section className="car_info_insurance">
          <div className="Date_container">
            <p>
              {/* convert date to days name */}
              {moment(start_date, "jYYYY/jMM/jDD").format("dddd")}
              <br />
              {/* show the day date and month name */}
              {moment(start_date, "jYYYY/jMM/jDD").format("jDD jMMMM")}
            </p>
            <IoMdArrowRoundBack size="3rem" color="#707070" />
            <p>
              {/* convert date to days name */}
              {moment(end_date, "jYYYY/jMM/jDD").format("dddd")}
              <br />
              {/* show the day date and month name */}
              {moment(end_date, "jYYYY/jMM/jDD").format("jDD jMMMM")}
            </p>
          </div>
          <div className="car_info">
            <div className="car_owner_part">
              <div>
                <h1>
                  {car.brand.name.fa} {car.name.fa}
                </h1>
                <h4>{year.name.fa}</h4>
                <figure className="owner_part">
                  <img src={owner.thumbnail_url} alt={owner.name} />
                  <p>{owner.name}</p>
                </figure>
              </div>
              <figure className="car_image">
                <img src={media_set[0].thumbnail_url} alt={owner.name} />
              </figure>
            </div>
            <hr />
            <h2>{language.condition_and_cancellation}</h2>
            <p>{cancellation_policy}</p>
            <hr />
            <h2>{language.location}</h2>
            <p>{location.name.breadcrumb_fa}</p>
            {location.parent_id === 1 && <p>{language.location_text}</p>}
            {with_driver && (
              <>
                <hr />
                <h2>{language.with_driver}</h2>
                <span>{language.with_driver_text}</span>
              </>
            )}
            <hr />
            <h2>{language.destination_limit}</h2>
            <p>
              {max_km_per_day}
              {language.km_per_day}
            </p>
            <p>
              {language.extra_price_per_km}
              {extra_km_price_name}
            </p>
          </div>
          <div className="insurance">
            <h2>{language.insurance_for_rent}</h2>
            <Insurance
              insurance_price={insurance_total_price}
              hasInsurance={hasInsurance}
            />
          </div>
        </section>
        <section className="payment_info_container">
          <div className="Date_container">
            <p>
              {/* convert date to days name */}
              {moment(start_date, "jYYYY/jMM/jDD").format("dddd")}
              <br />
              {/* show the day date and month name */}
              {moment(start_date, "jYYYY/jMM/jDD").format("jDD jMMMM")}
            </p>
            <IoMdArrowRoundBack size="3rem" color="#707070" />
            <p>
              {moment(end_date, "jYYYY/jMM/jDD").format("dddd")}
              <br />
              {moment(end_date, "jYYYY/jMM/jDD").format("jDD jMMMM")}
            </p>
          </div>
          <p className="number_of_days">{`${language.time_for_rent}${no_of_days}${language.day}`}</p>
          <div className="payment_information">
            {/* <p>
              <span>قیمت روزانه</span>
              <span>
                {avg_discounted_price_per_day.toLocaleString()}{" "}
                <span className="Toman">تومان</span>
              </span>
            </p> */}
            <br />
            <p>
              <span>{`${language.rent}${no_of_days} ${language.day}`}</span>
              <span>
                {total_price.toLocaleString()}{" "}
                <span className="Toman">{language.toman}</span>{" "}
              </span>
            </p>
            {total_discount > 0 && (
              <p className="Discount_color">
                <span>
                  {!has_system_discount
                    ? `${language.discount_for}${no_of_days}${language.day}`
                    : language.discount}
                </span>
                <span>
                  {total_discount.toLocaleString()}-{" "}
                  <span className="Toman">{language.toman}</span>
                </span>
              </p>
            )}
            <p>
              <span>{language.insurance}</span>
              <span>
                {showInsurance ? (
                  <>
                    {`${insurance_total_price.toLocaleString()} `}
                    <span className="Toman">{language.toman}</span>
                  </>
                ) : (
                  language.nothing
                )}
              </span>
            </p>
            {!useCouponPrice ? (
              !showcoupon ? (
                <p
                  className="coupon_Text_show HEAP_Checkout_Btn_Coupon"
                  onClick={() => setShowcoupon(true)}
                >
                  {language.have_discount}
                </p>
              ) : (
                <form className="coupon_form" onSubmit={couponHandler}>
                  <div className="coupon_container">
                    <TextInput
                      name="coupon"
                      autoFocus={true}
                      clearField={() => setCoupon("")}
                      error={{
                        status: couponError.status,
                        message: couponError.message,
                      }}
                      value={coupon}
                      placeholder={language.discount_place_holder}
                      onChangeHandler={(i) => setCoupon(i)}
                      HideClearIcon={true}
                    />
                    {coupon && (
                      <IoMdClose
                        className="close_icon"
                        onClick={() => setShowcoupon(false)}
                        color="737373"
                        size="2rem"
                      />
                    )}
                  </div>
                  <Button
                    value={language.submit}
                    class="Blue_BTN coupan_BTN HEAP_Checkout_Btn_CouponSubmit"
                    loading={coupanLoading}
                    click={() => {}}
                    loadingColor="#4ba3ce"
                  />
                </form>
              )
            ) : (
              <p>
                <span>{language.coupon_code}</span>
                <span className="total_price_number">
                  {couponDiscount.toLocaleString()}-
                  <span className="Toman">{language.toman_1}</span>
                </span>
              </p>
            )}
            <p className="total_price">
              <span className="total_price_text">{language.sum}</span>
              <span className="total_price_number">
                {showInsurance
                  ? (
                      discounted_total_price + insurance_total_price
                    ).toLocaleString()
                  : discounted_total_price.toLocaleString()}{" "}
                <span className="Toman">تومان</span>
              </span>
            </p>
          </div>
          <div className="continue_to_pay">
            <Button
              value={language.book}
              class="Blue_BTN localClass HEAP_Checkout_Btn_Book"
              disable={loading}
              loading={loading}
              click={GoToRequests}
            />
            <span className="extra_info">{language.extra_text}</span>
          </div>
        </section>
      </article>
    </>
  ) : (
    // initial page title
    <>
      <NextSeo
        title={language.next_seo.initial_title}
        description={language.next_seo.description}
      />
      <Checkout_Container_Loader />
    </>
  );
};
interface ICheckout_Container {
  language: any;
}

export default Checkout_Container;
