import React, { useEffect, useState } from "react";

import { REQUEST_GET_RENTAL_CAR } from "../../../../src/API";
import Router from "next/router";
import Slider from "../../../../src/components/Slider";
import Button from "../../../components/form/Button";
import { IoIosLink, IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import DatePicker, { DayRange, utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CarPageLoading from "../../../components/cartPlaceholder/carPageLoading";
import { NextSeo } from "next-seo";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
import Spinner from "../../../components/Spinner";
import carImage from "../../../../public/image/car-image.jpg";

// use شنبه،یک شنبه و ....
moment.loadPersian({ dialect: "persian-modern" });
// import "./carpage.scss";

const CarPage = ({ language }: ICarPage) => {
  // set date picker date to get new price and availability
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null,
  });
  const [car, setCar] = useState(null);
  const [year, setYear] = useState(null);
  const [media_set, setMedia_set] = useState([]);
  const [capacity, setCapacity] = useState(null);
  const [
    avg_discounted_price_per_day,
    setAvg_discounted_price_per_day,
  ] = useState(null);
  const [avg_price_per_day, setAvg_price_per_day] = useState(null);
  const [unit, setUnit] = useState(`${language.thousand}`);
  const [body_style, setBody_style] = useState(null);
  const [transmission_type, setTransmission_type] = useState(null);
  const [with_driver, setWith_driver] = useState(null);
  const [description, setDescription] = useState(null);
  const [max_km_per_day, setMax_km_per_day] = useState(null);
  const [extra_km_price_name, setExtra_km_price_name] = useState(null);
  const [is_out_of_service, setIs_out_of_service] = useState(null);
  const [id, setId] = useState(null);
  const [deliver_at_renters_place, setDeliver_at_renters_place] = useState(
    null
  );
  const [location, setLocation] = useState(null);
  const [mileage_range, setMileage_range] = useState(null);
  const [owner, setOwner] = useState(null);
  const [cylinder, setCylinder] = useState(null);
  const [facility_set, setFacility_set] = useState(null);
  const [cancellation_policy, setCancellation_policy] = useState(null);
  const [search_id, setSearch_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [is_mine, setIs_mine] = useState(false);
  const [total_discount, setTotal_discount] = useState(false);
  const [calenderClick, setCalenderClick] = useState(false);
  const [showPriceLoading, setShowPriceLoading] = useState(false);
  const [availableCar, setAvailableCar] = useState(true);
  const [showBorder, setShowBorder] = useState(false);
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");
  const [no_of_days, setNo_of_days] = useState("...");
  const [showDateText, setShowDateText] = useState(true);

  useEffect(() => {
    const { search_id, id, owner } = Router.router.query;

    // if the car is mine, I can't rent it
    if (owner) {
      setIs_mine(true);
    }
    // if the page have search id we can get the price
    if (search_id) {
      fetchData({ search_id });
      if (localStorage["start"]) {
        let startDate = JSON.parse(localStorage["start"]);
        let endDate = JSON.parse(localStorage["end"]);
        setDayRange({
          from: {
            year: startDate.year,
            month: startDate.month,
            day: startDate.day,
          },
          to: { year: endDate.year, month: endDate.month, day: endDate.day },
        });
        setShowCalender(true);
      }
    }
    // if doesn't have search id and it's not mine the user can select day range and get price and search id
    else {
      // if (localStorage["start"]) {
      // get the car information and price based on the start date and the end date, if there are on storage.
      DateSetter(id);
      // } else {
      // just get the main info about the car
      // DateSetter(id);
      // }
    }
    const handleRouteChange = (url) => {
      if (url.includes("/search-result")) {
        jsCookie.set("JumpTo", 1);
      }
    };
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const fetchData = async (data) => {
    setNo_of_days("...")
    let localData = null;
    setShowPriceLoading(true);
    try {
      if (data.from && data.to) {
        setDayRange({
          from: data.from,
          to: data.to,
        });
        localData = {
          id: Router.router.query.id,
          start_date: `${data.from.year}/${data.from.month}/${data.from.day}`,
          end_date: `${data.to.year}/${data.to.month}/${data.to.day}`,
        };
      } else if (dayRange.from && dayRange.to) {
        localData = {
          id: Router.router.query.id,
          start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
          end_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
        };
      } else if (data.search_id) {
        localData = { search_id: data.search_id };
      } else {
        localData = { id: data.id };
      }
      const res: any = await REQUEST_GET_RENTAL_CAR(localData);
      set_CarInformation(res);
      setShowPriceLoading(false);
    } catch (error) {
      if (error === "Invalid search_id.") {
        DateSetter(Router.router.query.id);
      }
      console.log("!Error", error);
    }
  };

  const DateSetter = (data) => {
    if (localStorage["start"]) {
      fetchData({
        id: data,
        from: JSON.parse(localStorage["start"]),
        to: JSON.parse(localStorage["end"]),
      });
    } else {
      // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
      let Start_date = moment()
        .add(3, "day")
        .format("jYYYY/jMM/jDD");
      let End_date = moment()
        .add(6, "day")
        .format("jYYYY/jMM/jDD");
      let SplitStartDate = Start_date.split("/");
      let SplitEndDate = End_date.split("/");
      // just get the main info about the car
      // show calender if the dates are not on storage
      setShowCalender(true);
      fetchData({
        id: data,
        from: {
          year: +SplitStartDate[0],
          month: +SplitStartDate[1],
          day: +SplitStartDate[2],
        },
        to: {
          year: +SplitEndDate[0],
          month: +SplitEndDate[1],
          day: +SplitEndDate[2],
        },
      });
    }
  };

  const set_CarInformation = (res) => {
    setCar(res.car);
    setYear(res.year);
    setCapacity(res.capacity);
    if (res.avg_price_per_day) {
      setAvailableCar(true);
      setAvg_price_per_day(res.avg_price_per_day);
      if (
        res.avg_discounted_price_per_day &&
        res.avg_discounted_price_per_day > 0
      ) {
        setAvg_discounted_price_per_day(
          res.avg_discounted_price_per_day
          // res.avg_discounted_price_per_day >= 10000000
          //   ? res.avg_discounted_price_per_day >= 10100000
          //     ? res.avg_discounted_price_per_day_name.slice(0, 4)
          //     : res.avg_discounted_price_per_day_name.slice(0, 2)
          //   : res.avg_discounted_price_per_day >= 1000000
          //     ? res.avg_discounted_price_per_day_name.slice(2, 3) === "۰"
          //       ? res.avg_discounted_price_per_day_name.toString().slice(0, 1)
          //       : res.avg_discounted_price_per_day_name.toString().slice(0, 3)
          //     : res.avg_discounted_price_per_day.toString().slice(0, 3)
        );
      }
    } else {
      setAvailableCar(false);
    }

    setUnit(
      res.avg_discounted_price_per_day >= 1000000
        ? language.million
        : language.thousand
    );
    setBody_style(res.body_style);
    setTransmission_type(res.transmission_type);
    setWith_driver(res.with_driver);
    setDescription(res.description);
    setMax_km_per_day(res.max_km_per_day);
    setExtra_km_price_name(res.extra_km_price_name);
    // setIs_out_of_service(res.is_out_of_service);
    // setId(res.id);
    setDeliver_at_renters_place(res.deliver_at_renters_place);
    setNo_of_days(res.no_of_days);
    setLocation(res.location);
    setMileage_range(res.mileage_range);
    setOwner(res.owner);
    setCylinder(res.cylinder);
    setFacility_set(res.facility_set);
    setCancellation_policy(res.cancellation_policy);
    if (res.has_media) setMedia_set(res.media_set);
    else setMedia_set([{ url: carImage }]);
    setSearch_id(res.search_id);
    setTotal_discount(res.total_discount);
    setSearch_id(res.search_id);
  };

  const GoToCheckout = () => {
    setLoading(true);
    localStorage["start"] = JSON.stringify(dayRange.from);
    localStorage["end"] = JSON.stringify(dayRange.to);
    Router.push({
      pathname: "/checkout",
      query: { search_id: search_id },
    });
  };

  useEffect(() => {
    if (showCalender && calenderClick) {
      if (dayRange.from?.day && dayRange.to?.day) {
        fetchData({ id: Router.router.query.id });
        setShowDateText(true);
      }
    }
    if (dayRange.from) {
      setFromDay(convertDate(dayRange.from));
    } else {
      setFromDay(" ");
      setToDay(" ");
    }
    if (dayRange.to) {
      setShowBorder(false);
      setToDay(convertDate(dayRange.to));
    } else {
      setToDay(" ");
    }
  }, [dayRange]);

  const convertDate = (v) => {
    let value = moment(`${v.year}/${v.month}/${v.day}`, "jYYYY/jM/jD").format(
      "dddd jDD jMMMM"
    );
    return value;
  };

  return (
    <>
      {media_set.length > 0 ? (
        <>
          <NextSeo
            title={`${
              owner.company_name
                ? owner.company_name
                : owner.first_name + " " + owner.last_name
            } - ${car.name.fa}${language.next_seo.title.otoli}`}
            description={language.next_seo.description}
            noindex={true}
            openGraph={{
              title: `${
                owner.company_name
                  ? owner.company_name
                  : owner.first_name + " " + owner.last_name
              } - ${car.name.fa}${language.next_seo.title.otoli}`,
              description: language.next_seo.description,
              site_name: language.next_seo.site_name,
            }}
            twitter={{
              handle: language.next_seo.handle,
              site: language.next_seo.site,
              cardType: language.next_seo.cardType,
            }}
          />
          {/* {dayRange.from?.day && dayRange.to?.day && !is_mine ? (
            <div className="Top_Rent_date">
              <p>{`از ${dayRange.from.day} ${moment(
                dayRange.from.month,
                "jM"
              ).format("jMMMM")} تا ${dayRange.to.day} ${moment(
                dayRange.to.month,
                "jM"
              ).format("jMMMM")}`}</p>
            </div>
          ) : null} */}
          {/* slider section */}
          <Slider
            Feed={media_set}
            alt={`${car.brand.name.fa} ${car.name.fa}`}
          />
          {/* car info section */}
          <article className='responsive Car_page_container'>
            <section className='carInfo_container'>
              {showPriceLoading ? (
                <div className='price_place_holder'>
                  <Spinner color='#737373' display='block' width={20} />
                </div>
              ) : (
                availableCar && (
                  <div className='avg_discounted_price_per_day'>
                    <p className={total_discount ? "discount_price" : null}>
                      {avg_price_per_day
                        ? avg_price_per_day.toLocaleString()
                        : null}
                    </p>
                    {total_discount ? (
                      <p>
                        {avg_discounted_price_per_day
                          ? avg_discounted_price_per_day.toLocaleString()
                          : null}
                      </p>
                    ) : null}
                    {/* <span className="unit_name">{unit} تومان</span> */}
                    {avg_price_per_day && <span>{language.toman_per_day}</span>}
                  </div>
                )
              )}
              <h1>
                {car.brand.name.fa} {car.name.fa}
              </h1>
              <h4>{year.name.fa}</h4>
              {!is_mine ? (
                showCalender ? (
                  <div className='calender_section_mobile_view'>
                    <hr />
                    <h2>{language.calender_section_mobile_view_h2}</h2>
                    {showDateText && dayRange.from ? (
                      <div className='Rent_date'>
                        <p>
                          <span className='day_name'>{`${moment(
                            `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
                            "jYYYY/jM/jD"
                          ).format("dddd")}،`}</span>
                          {` ${dayRange.from.day} ${moment(
                            dayRange.from.month,
                            "jM"
                          ).format("jMMMM")}`}
                          <IoIosArrowRoundBack size='2rem' color='#202020' />
                          <span className='day_name'>{`${moment(
                            `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
                            "jYYYY/jM/jD"
                          ).format("dddd")}،`}</span>
                          {` ${dayRange.to.day} ${moment(
                            dayRange.to.month,
                            "jM"
                          ).format("jMMMM")}`}{" "}
                          ({no_of_days}
                          {language.Rent_date_day})
                        </p>
                        <p
                          className='change_date_in_car_page'
                          onClick={() => {
                            setShowDateText(false);
                            setShowCalender(true);
                          }}
                        >
                          {language.change_date_in_car_page_change_date}
                        </p>
                      </div>
                    ) : (
                      <div
                        className='search_box_div'
                        onClick={() => setCalenderClick(true)}
                      >
                        <div
                          className={[
                            "date_Input_Container",
                            dayRange.from
                              ? dayRange.to
                                ? "PushToRight"
                                : "PushToLeft"
                              : "PushToRight",
                          ].join(" ")}
                          onClick={() => setShowBorder(true)}
                        >
                          <DatePicker
                            value={dayRange}
                            onChange={setDayRange}
                            shouldHighlightWeekends
                            minimumDate={utils("fa").getToday()}
                            locale='fa'
                            colorPrimary='#4ba3ce'
                            disabledDays={[utils("fa").getToday()]}
                          />
                          <div className='input_container'>
                            <p className='label'>
                              {language.input_container_label_start_date}
                            </p>
                            <input
                              data-hj-allow
                              className={
                                showBorder
                                  ? dayRange.from
                                    ? dayRange.to
                                      ? "activeBorder"
                                      : null
                                    : "activeBorder"
                                  : null
                              }
                              readOnly={true}
                              value={fromDay ? fromDay : ""}
                            />
                          </div>
                          <div className='input_container'>
                            <p className='label'>
                              {language.input_container_label_end_date}
                            </p>
                            <input
                              data-hj-allow
                              className={[
                                "exception_input",
                                showBorder
                                  ? dayRange.to
                                    ? dayRange.from
                                      ? null
                                      : null
                                    : dayRange.from
                                    ? "activeBorder"
                                    : null
                                  : null,
                              ].join(" ")}
                              readOnly={true}
                              value={toDay ? toDay : ""}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null
              ) : null}
              <hr />
              <h2>{language.location_for_deliver}</h2>
              <p>{location.name.breadcrumb_fa}</p>
              {location.parent_id === 1 && deliver_at_renters_place ? (
                <p>{language.deliver_at_tehran}</p>
              ) : null}
              {with_driver && (
                <>
                  <hr />
                  <h2>{language.with_driver}</h2>
                  <span>{language.just_with_drive}</span>
                </>
              )}
              <hr />
              <h2>{language.distance_in_day}</h2>
              <p>
                {max_km_per_day}
                {language.KM_in_day}
              </p>
              <p>
                {language.extra_price}
                {extra_km_price_name}
              </p>
              {description && (
                <>
                  <hr />
                  <h2>{language.about_car}</h2>
                  <pre>{description}</pre>
                </>
              )}
              <hr />
              <h2>{language.features}</h2>
              <div className='info_container'>
                <p className='alignThem'>
                  <span className='info_name'>{language.body_style}</span>{" "}
                  <span className='info_value'>{body_style.name.fa}</span>
                </p>
                <p className='alignThem'>
                  <span className='info_name'>{language.gear_box}</span>{" "}
                  <span className='info_value'>
                    {transmission_type.name.fa}
                  </span>
                </p>
                {cylinder ? (
                  <p className='alignThem'>
                    <span className='info_name'>{language.cylinder}</span>{" "}
                    <span className='info_value'>{cylinder.name.fa}</span>
                  </p>
                ) : null}
                <p className='alignThem'>
                  <span className='info_name'>{language.mile_age}</span>{" "}
                  <span className='info_value'>{mileage_range.name.fa}</span>
                </p>
                <p className='alignThem'>
                  <span className='info_name'>{language.capacity}</span>{" "}
                  <span className='info_value'>
                    {capacity} {language.person}
                  </span>
                </p>
              </div>

              {facility_set.length > 0 && (
                <>
                  <hr />
                  <h2>{language.facilities}</h2>
                  <div className='facilities_container'>
                    {facility_set.map((item) => (
                      <p key={item.id}>{item.name.fa}</p>
                    ))}
                  </div>
                </>
              )}
              <hr />
              <h2>{language.condition_and_cancellation}</h2>
              <pre>{cancellation_policy}</pre>
              {car.category_set.length > 0 && (
                <>
                  <hr />
                  <h2>{language.tag}</h2>
                  {car.category_set.map((item) => (
                    <Link
                      key={item.id}
                      href={"/rent/[id]"}
                      as={`/rent/${item.name.en}`}
                    >
                      <a className='car_Tags'>
                        <IoIosLink color='#4ba3ce' size='1.6rem' />
                        {item.name.fa}
                      </a>
                    </Link>
                  ))}
                </>
              )}
            </section>
            {/* user info section */}
            <section className='onwnerInfo_container'>
              {showPriceLoading ? (
                <div className='price_place_holder'>
                  <Spinner color='#737373' display='block' width={20} />
                </div>
              ) : (
                availableCar && (
                  <div className='avg_discounted_price_per_day'>
                    <p className={total_discount ? "discount_price" : null}>
                      {avg_price_per_day
                        ? avg_price_per_day.toLocaleString()
                        : null}
                    </p>
                    {total_discount ? (
                      <p>
                        {avg_discounted_price_per_day
                          ? avg_discounted_price_per_day.toLocaleString()
                          : null}
                      </p>
                    ) : null}
                    {/* <span className="unit_name">{unit} تومان</span> */}
                    {avg_price_per_day && <span>{language.toman_per_day}</span>}
                  </div>
                )
              )}
              {showDateText && !is_mine && dayRange.from ? (
                <div className='Rent_date'>
                  <p>
                    <span className='day_name'>
                      {`${moment(
                        `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
                        "jYYYY/jM/jD"
                      ).format("dddd")}،`}
                    </span>
                    {` ${dayRange.from.day} ${moment(
                      dayRange.from.month,
                      "jM"
                    ).format("jMMMM")}`}
                    <IoIosArrowRoundBack size='2rem' color='#202020' />
                    <span className='day_name'>{`${moment(
                      `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
                      "jYYYY/jM/jD"
                    ).format("dddd")}،`}</span>
                    {` ${dayRange.to.day} ${moment(
                      dayRange.to.month,
                      "jM"
                    ).format("jMMMM")}`}{" "}
                    ({no_of_days}
                    {language.Rent_date_day})
                  </p>
                  <p
                    className='change_date_in_car_page'
                    onClick={() => {
                      setShowDateText(false);
                      setShowCalender(true);
                    }}
                  >
                    {language.change_date_in_car_page_change_date}
                  </p>
                </div>
              ) : null}
              {!is_mine ? (
                showCalender && !showDateText ? (
                  <div
                    className='search_box_div HEAP_Car_Input_Calender'
                    onClick={() => setCalenderClick(true)}
                  >
                    <div
                      className={[
                        "date_Input_Container",
                        dayRange.from
                          ? dayRange.to
                            ? "PushToRight"
                            : "PushToLeft"
                          : "PushToRight",
                      ].join(" ")}
                      onClick={() => setShowBorder(true)}
                    >
                      <DatePicker
                        value={dayRange}
                        onChange={setDayRange}
                        shouldHighlightWeekends
                        minimumDate={utils("fa").getToday()}
                        locale='fa'
                        colorPrimary='#4ba3ce'
                        disabledDays={[utils("fa").getToday()]}
                      />
                      <div className='input_container'>
                        <p className='label'>
                          {language.input_container_label_start_date}
                        </p>
                        <input
                          data-hj-allow
                          className={
                            showBorder
                              ? dayRange.from
                                ? dayRange.to
                                  ? "activeBorder"
                                  : null
                                : "activeBorder"
                              : null
                          }
                          readOnly={true}
                          value={fromDay ? fromDay : ""}
                        />
                      </div>
                      <div className='input_container'>
                        <p className='label'>
                          {language.input_container_label_end_date}
                        </p>
                        <input
                          data-hj-allow
                          className={[
                            "exception_input",
                            showBorder
                              ? dayRange.to
                                ? dayRange.from
                                  ? null
                                  : null
                                : dayRange.from
                                ? "activeBorder"
                                : null
                              : null,
                          ].join(" ")}
                          readOnly={true}
                          value={toDay ? toDay : ""}
                        />
                      </div>
                    </div>
                  </div>
                ) : null
              ) : null}
              <Link
                href={`/user/[id]`}
                as={`/user/${owner.username ? owner.username : owner.id}`}
              >
                <a className='HEAP_Car_Link_Profile'>
                  <figure className='owner_part'>
                    <img src={owner.thumbnail_url} alt={owner.name} />
                    <p>{owner.name}</p>
                  </figure>
                </a>
              </Link>
              {availableCar && !is_mine ? (
                <div className='continue_to_checkout'>
                  <Button
                    value='ادامه'
                    class='Blue_BTN localClass HEAP_Car_Btn_Continue'
                    loading={loading}
                    click={GoToCheckout}
                  />
                  <span className='extra_info'>{language.extra_info}</span>
                </div>
              ) : null}
            </section>
          </article>
        </>
      ) : (
        <>
          <NextSeo title={language.next_seo.load_title} noindex={true} />
          <CarPageLoading />
        </>
      )}
    </>
  );
};

interface ICarPage {
  language: any;
}
export default CarPage;
