import React, { useState, useEffect, useRef } from "react";
import filterContext from "../../context/filter-context";
import Filters from "../Filters";
import SearchResultList from "../car/search-result";
import Router from "next/router";
import { REQUEST_GET_SEARCH_FOR_RENT } from "../../API";
// import "./Search_result.scss";
import { NextSeo } from "next-seo";
import Spinner from "../../components/Spinner";
import jsCookie from "js-cookie";
import {
  IoMdClose,
  IoIosOptions,
  IoIosArrowUp,
  IoIosArrowDown,
} from "react-icons/io";
import Search from "../Search";
import UrlCreator from "../../../utils/UrlCreator";
import UrlChecker from "../../../utils/UrlChecker";

let JumpTo = null;

let staticRoute = null;
// default location is Tehran
let Location: any = 1;
let location_n = null;
let Start_date = null;
let End_date = null;
// start page is 1
let page = 1;
let price = {
  min: null,
  max: null,
};
// default price sort is form highest to lowest price  -> descending
let o = "-price";
let loadMoreCar = false;
let deliver_at_renters_place = 0;
let with_driver = 0;
let body_style_id = [];
let brand_id = null;
let car_id = null;
let category_id = null;

// this object check which filter is activated
// you can combined several filter in a single search request
let filtersChecker = {
  price: false,
  with_driver: false,
  body_style_id: false,
  deliver_at_renters_place: false,
  brand_id: false,
  car_id: false,
  category_id: false,
};

// Set position
let position = 0;

const Search_result = ({ language }: ISearch_result) => {
  const [result, setResult] = useState(null);
  const [extra_info, setExtra_info] = useState([]);
  const [total_count, setTotal_count] = useState(0);
  const [remained_count, setRemained_count] = useState(0);
  const [show_spinner_loadMore, setShow_spinner_loadMore] = useState(false);
  const [show_filter, setShow_filter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [filterReset, setFilterReset] = useState({
    price: false,
    with_driver: false,
    body_style_id: false,
    deliver_at_renters_place: false,
    brand_id: false,
    car_id: false,
    category_id: false,
  });

  const new_search_ref = useRef(null);

  useEffect(() => {
    staticRoute = { ...Router.router.query };
    const url_checked = UrlChecker(Router.router.query);

    if (url_checked.location_id) {
      Location = url_checked.location_id;
    }
    location_n = url_checked.location_name;
    Start_date = url_checked.start_date;
    End_date = url_checked.end_date;
    o = url_checked.price_order;
    if (url_checked.page > 1) {
      page = url_checked.page;
      jsCookie.set("JumpTo", 1);
      jsCookie.set("page", url_checked.page);
    }
    if (url_checked.min_price > 0 || url_checked.max_price < 10000000) {
      price.min = url_checked.min_price;
      price.max = url_checked.max_price;
      filtersChecker.price = true;
      price = {
        min: url_checked.min_price,
        max: url_checked.max_price,
      };
    }
    if (Router.router.query.deliver_at_renters_place === "1") {
      filtersChecker.deliver_at_renters_place = true;
    }
    deliver_at_renters_place = +url_checked.deliver_at_renters_place;
    if (Router.router.query.with_driver === "1") {
      filtersChecker.with_driver = true;
    }
    with_driver = +url_checked.with_driver;

    if (url_checked.body_style_id !== "all") {
      filtersChecker.body_style_id = true;
      body_style_id = url_checked.body_style_id
        ? [url_checked.body_style_id]
        : [];
    }
    if (url_checked.brand_id !== "all") {
      brand_id = +url_checked.brand_id;
      filtersChecker.brand_id = true;
    }
    if (url_checked.car_id !== "all") {
      car_id = +url_checked.car_id;
      filtersChecker.car_id = true;
    }
    initSearch();

    const handleRouteChange = (url) => {
      if (url.includes("/car/")) {
        jsCookie.set("page", page);
      } else {
        let JumpTo = null;
        jsCookie.remove("JumpTo");
      }
    };

    // reset the data
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
      staticRoute = null;
      location_n = null;
      Location = 1;
      Start_date = null;
      End_date = null;
      page = 1;
      price = {
        min: null,
        max: null,
      };
      o = "-price";
      loadMoreCar = false;
      deliver_at_renters_place = 0;
      with_driver = 0;
      body_style_id = [];
      brand_id = null;
      car_id = null;
      category_id = null;
      filtersChecker = {
        price: false,
        with_driver: false,
        body_style_id: false,
        deliver_at_renters_place: false,
        brand_id: false,
        car_id: false,
        category_id: false,
      };
    };
  }, []);

  async function initSearch() {
    JumpTo = jsCookie.get("JumpTo");

    // reset the data
    if (!loadMoreCar) {
      page = 1;
      setResult(null);
    }
    // reset the filter
    setExtra_info([]);
    let queryString = `location_id=${Location}&start_date=${Start_date}&end_date=${End_date}&o=${o}`;
    // check the price sort
    if (filtersChecker.price) {
      queryString += `&min_price=${price.min}&max_price=${price.max}`;
    }
    // check the delivery option
    if (filtersChecker.deliver_at_renters_place) {
      queryString += `&deliver_at_renters_place=1`;
    }
    // with driver
    if (filtersChecker.with_driver) {
      queryString += `&with_driver=1`;
    }
    // body style
    if (filtersChecker.body_style_id) {
      queryString += `&body_style_id=${body_style_id.join(",")}`;
    }
    // check the brand id
    if (filtersChecker.brand_id) {
      queryString += `&brand_id=${brand_id}`;
    }
    // check the car id
    if (filtersChecker.car_id) {
      queryString += `&car_id=${car_id}`;
    }
    if (filtersChecker.category_id) {
      queryString += `&category_id=${category_id}`;
    }
    try {
      let limit = 15;
      if (JumpTo === "1") {
        limit = 15 * +jsCookie.get("page");
      }
      const res: any = await REQUEST_GET_SEARCH_FOR_RENT({
        queryString,
        limit: limit,
        page,
      });
      setTotal_count(res.total_count);
      setRemained_count(res.remained_count);

      setExtra_info(res.extra_info);
      if (loadMoreCar) {
        setShow_spinner_loadMore(false);
        setResult(result.concat(res.results));
        loadMoreCar = false;
      } else {
        setResult(res.results);
      }
      if (JumpTo === "1") {
        window.scrollTo(0, position);
        jsCookie.remove("JumpTo");
        page = +jsCookie.get("page");
      }
    } catch (error) {
      console.log("!Error", error);
    }
  }

  // adjust the filter object to send for search
  /**
   *
   * @param v
   *  set the data from filter context
   */
  function filterResults(v) {
    if (v.price) {
      filtersChecker.price = v.price.status;
      price = {
        min: +v.price.value[0],
        max: +v.price.value[1],
      };
      staticRoute = {
        ...staticRoute,
        min_price: v.price.value[0].slice(0, -3),
        max_price: v.price.value[1].slice(0, -3),
      };
    }
    if (v.deliver_at_renters_place) {
      filtersChecker.deliver_at_renters_place =
        v.deliver_at_renters_place.status;
      deliver_at_renters_place = v.deliver_at_renters_place.value;
      staticRoute = {
        ...staticRoute,
        deliver_at_renters_place: v.deliver_at_renters_place.value,
      };
    }
    if (v.with_driver) {
      filtersChecker.with_driver = v.with_driver.status;
      with_driver = v.with_driver.value;
      staticRoute = {
        ...staticRoute,
        with_driver: v.with_driver.value,
      };
    }
    if (v.body_style_id) {
      if (v.body_style_id.value.length === 0) {
        filtersChecker.body_style_id = false;
      } else {
        filtersChecker.body_style_id = v.body_style_id.status;
      }
      body_style_id = v.body_style_id.value;
      staticRoute = {
        ...staticRoute,
        body_style_id:
          v.body_style_id.value.length === 0
            ? "all"
            : v.body_style_id.value.join(","),
      };
    }
    if (v.brand_id) {
      filtersChecker.brand_id = v.brand_id.status;
      brand_id = v.brand_id.value;
      staticRoute = {
        ...staticRoute,
        brand_name: v.brand_id.value
          ? v.brand_id.name.replace(/ +/g, "-")
          : "all",
        brand_id: v.brand_id.value ? v.brand_id.value : "all",
      };
    }
    if (v.car_id) {
      filtersChecker.car_id = v.car_id.status;
      car_id = v.car_id.value;
      staticRoute = {
        ...staticRoute,
        car_name: v.car_id.value ? v.car_id.name.replace(/ +/g, "-") : "all",
        car_id: v.car_id.value ? v.car_id.value : "all",
      };
    }
    if (v.category_id) {
      filtersChecker.category_id = v.category_id.status;
      category_id = v.category_id.value;
    }
    UrlCreator({
      query: staticRoute,
      route: Router.router.route,
      cb: UrlUpdater,
    });
    page = 1;
    initSearch();
  }

  const loadMore = () => {
    page = 1 + page;
    loadMoreCar = true;
    setShow_spinner_loadMore(true);
    staticRoute = {
      ...staticRoute,
      page: page,
    };
    UrlCreator({
      query: staticRoute,
      route: Router.router.route,
      cb: UrlUpdater,
    });
    initSearch();
  };

  const getClickPosition = () => {
    position = window.scrollY;
  };

  const clearReset = (v) => {
    switch (v) {
      case "price":
        setFilterReset((filterReset) => {
          return { ...filterReset, price: false };
        });
        break;
      case "with_driver":
        setFilterReset((filterReset) => {
          return { ...filterReset, with_driver: false };
        });
        break;

      case "body_style_id":
        setFilterReset((filterReset) => {
          return { ...filterReset, body_style_id: false };
        });
        break;

      case "deliver_at_renters_place":
        setFilterReset((filterReset) => {
          return { ...filterReset, deliver_at_renters_place: false };
        });
        break;
      case "brand_id":
        setFilterReset((filterReset) => {
          return { ...filterReset, brand_id: false, car_id: false };
        });
        break;
      case "car_id":
        setFilterReset((filterReset) => {
          return { ...filterReset, car_id: false };
        });
        break;

      default:
        setFilterReset({
          price: false,
          with_driver: false,
          body_style_id: false,
          deliver_at_renters_place: false,
          brand_id: false,
          car_id: false,
          category_id: false,
        });
        break;
    }
  };

  const UrlUpdater = (url) => {
    window.history.replaceState(null, "", url);
  };

  return (
    <article
      className='search_result_page_container'
      onClick={getClickPosition}
    >
      {result && (
        <NextSeo
          title={`${language.next_seo.title.start}${Start_date}${language.next_seo.title.ta}${End_date}${language.next_seo.title.otoli}`}
          description={language.next_seo.description}
          openGraph={{
            title: `${language.next_seo.title.start}${Start_date}${language.next_seo.title.ta}${End_date}${language.next_seo.title.otoli}`,
            description: language.next_seo.description,
            site_name: language.next_seo.site_name,
          }}
          twitter={{
            handle: language.next_seo.handle,
            site: language.next_seo.site,
            cardType: language.next_seo.cardType,
          }}
        />
      )}
      {/* result count section */}
      <div className='count_bar_container' ref={new_search_ref}>
        {result ? (
          result.length > 0 && (
            <div
              className='count_bar responsive'
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              {!showSearch ? (
                <p className='count_bar_count'>{`${total_count}${
                  language.count_bar_khodro
                }${result[0].start_date.slice(5)}${
                  language.count_bar_ta
                }${result[0].end_date.slice(5)}`}</p>
              ) : null}
              <p className='change_search_btn'>
                {showSearch ? (
                  <span className='close_text_btn'>
                    {language.count_bar_change_search_btn_close}
                    <IoMdClose size='2rem' color='#dcdcdc' />
                  </span>
                ) : (
                  language.count_bar_change_search_btn_p
                )}
              </p>
            </div>
          )
        ) : (
          <p className='count_bar_count_empty'></p>
        )}
        {/* search box */}
        <section
          className={[
            "new_search_in_landing",
            showSearch ? "show_search_section" : null,
          ].join(" ")}
        >
          <div className='responsive'>
            <Search
              language={language}
              dynamic={true}
              searchSubmit={(v) => {
                Start_date = v.date.Start_date;
                End_date = v.date.End_date;
                setShowSearch(false);
                initSearch();
              }}
            />
          </div>
        </section>
        {showSearch ? (
          <IoIosArrowUp
            className='Arrow_up_change_search'
            color='#dcdcdc'
            size='2rem'
            onClick={() => setShowSearch(false)}
          />
        ) : null}
      </div>
      {/* search box */}
      <section className='responsive'>
        {/* price sort part */}
        <div className='price_sort_container'>
          <span
            className={o === "-price" ? "active" : null}
            onClick={() => {
              o = "-price";
              loadMoreCar = false;
              UrlCreator({
                query: { ...staticRoute, price_order: "-price" },
                route: Router.router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            {language.price_sort_container_high_to_low}
          </span>
          <span
            className={o === "price" ? "active" : null}
            onClick={() => {
              o = "price";
              loadMoreCar = false;
              UrlCreator({
                query: { ...staticRoute, price_order: "price" },
                route: Router.router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            {language.price_sort_container_low_to_high}
          </span>
          {/* Trigger icon in mobile view */}
          <p className='show_filter' onClick={() => setShow_filter(true)}>
            {language.price_sort_container_advance_search_btn}
            <IoIosOptions size='1.4rem' color='#656565' />
          </p>
        </div>
      </section>
      <section className='responsive minimal_filters'>
        {filtersChecker.price ? (
          <p
            className='minimal_filter_tags'
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, price: true };
              });
              loadMoreCar = false;
              filtersChecker.price = false;
              UrlCreator({
                query: {
                  ...staticRoute,
                  min_price: 0,
                  max_price: 10000000,
                },
                route: Router.router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <IoMdClose size='1.3rem' color='#8c8c8c' />
            {language.minimal_filters_price_from}
            {price.min.toLocaleString()}
            {language.minimal_filters_ta}
            {price.max.toLocaleString()}
          </p>
        ) : null}
        {filtersChecker.deliver_at_renters_place ? (
          <p
            className='minimal_filter_tags'
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, deliver_at_renters_place: true };
              });
              loadMoreCar = false;
              filtersChecker.deliver_at_renters_place = false;
              UrlCreator({
                query: { ...staticRoute, deliver_at_renters_place: 0 },
                route: Router.router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <IoMdClose size='1.3rem' color='#8c8c8c' />
            {language.minimal_filters_deliver_to_your_location}
          </p>
        ) : null}
        {filtersChecker.with_driver ? (
          <p
            className='minimal_filter_tags'
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, with_driver: true };
              });
              loadMoreCar = false;
              filtersChecker.with_driver = false;
              UrlCreator({
                query: { ...staticRoute, with_driver: 0 },
                route: Router.router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <IoMdClose size='1.3rem' color='#8c8c8c' />
            {language.minimal_filters_with_deriver}
          </p>
        ) : null}
        {filtersChecker.body_style_id ? (
          <p
            className='minimal_filter_tags'
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, body_style_id: true };
              });
              loadMoreCar = false;
              filtersChecker.body_style_id = false;
              UrlCreator({
                query: { ...staticRoute, body_style_id: "all" },
                route: Router.router.route,
                cb: UrlUpdater,
              });
              initSearch();
            }}
          >
            <IoMdClose size='1.3rem' color='#8c8c8c' />
            {language.minimal_filters_body_style}
          </p>
        ) : null}
        {filtersChecker.brand_id ? (
          <p
            className='minimal_filter_tags'
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, brand_id: true };
              });
              loadMoreCar = false;
              filtersChecker.brand_id = false;
              filtersChecker.car_id = false;
              UrlCreator({
                query: { ...staticRoute, brand_id: "all" },
                route: Router.router.route,
                cb: UrlUpdater,
              });
              // initSearch();
            }}
          >
            <IoMdClose size='1.3rem' color='#8c8c8c' />
            {language.minimal_filters_brand}
          </p>
        ) : null}
        {filtersChecker.car_id ? (
          <p
            className='minimal_filter_tags'
            onClick={() => {
              setFilterReset((filterReset) => {
                return { ...filterReset, car_id: true };
              });
              loadMoreCar = false;
              filtersChecker.car_id = false;
              UrlCreator({
                query: { ...staticRoute, car_id: "all" },
                route: Router.router.route,
                cb: UrlUpdater,
              });
              // initSearch();
            }}
          >
            <IoMdClose size='1.3rem' color='#8c8c8c' />
            {language.minimal_filters_model}
          </p>
        ) : null}
      </section>
      {/* filters and result section */}
      <section className='responsive content_container'>
        <filterContext.Provider
          value={{
            setDataForSearch: (v) => {
              filterResults(v);
            },
          }}
        >
          <Filters
            extra_info={extra_info}
            ResultCount={{ total_count, remained_count }}
            reset={filterReset}
            clearReset={clearReset}
            show_filter_prop={show_filter}
            show_filter_prop_reset={() => {
              setShow_filter(false);
            }}
            initialFilterValues={Router}
            language={language}
          />
        </filterContext.Provider>
        <SearchResultList
          result={result}
          language={language}
          setFilterForSearch={(v) => {
            if (v.o) {
              o = "price";
            }
            filterResults(v);
          }}
        />
      </section>
      {/* load more */}
      {remained_count > 0 && (
        <span
          className={[
            "Load_more_car HEAP_SearchResult_Btn_ShowMore",
            show_spinner_loadMore ? "no_padding" : null,
          ].join(" ")}
          onClick={() => loadMore()}
        >
          {show_spinner_loadMore ? (
            <Spinner display='block' width={20} color='#9E9E9E' />
          ) : (
            <>
              <IoIosArrowDown color='#202020' size='1.8rem' />
              {language.Load_more_car}
            </>
          )}
        </span>
      )}
    </article>
  );
};

interface ISearch_result {
  language: any;
}

export default Search_result;
