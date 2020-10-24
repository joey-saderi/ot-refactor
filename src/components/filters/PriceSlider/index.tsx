import React, { useContext, useEffect, useState } from "react";
/**
 *
 * nouislider-react
 *
 * Npm
 *  https://www.npmjs.com/package/nouislider-react
 * Git
 *  https://github.com/mmarkelov/react-nouislider
 * Documentation
 *  https://refreshless.com/nouislider/
 */
import Nouislider from "nouislider-react";
// Had to import noUiSlider and filter style file modular, to work correctly
import "./price_filter.scss";
import "nouislider/distribute/nouislider.css";

import filterContext from "../../../context/filter-context";

const PriceSlider = (props) => {
  const [value, setValue] = useState([0, 10000000]);
  const FilterContext = useContext(filterContext);

  /**
   *
   * @param value
   * the income value [start pice , stop price ]
   * both values at the Array have typeOf String
   */
  const onSlide = (value) => {
    // Deactivate the price filter in initial search for default value
    if (value[0] === "0.00" && value[1] === "10000000.00") {
      FilterContext.setDataForSearch({
        price: { status: false, value: value },
      });
    } else {
      FilterContext.setDataForSearch({ price: { status: true, value: value } });
    }
    setValue(value);
  };

  useEffect(() => {
    if (props.initialValue) {
      setValue([props.initialValue[0], props.initialValue[1]]);
    }
  }, [props.initialValue]);

  return (
    <div className="price_filter">
      <h3>قیمت</h3>
      <div className="price_text">
        <p>
          <span className="TA">{`${Number(
            Number(
              value[0] < 1000000 ? value[0] / 1000 : value[0] / 1000000
            ).toFixed(1)
          ).toLocaleString()}`}</span>{" "}
          {`${value[0] >= 1000000 ? "میلیون" : "هزار"} تومان `}
        </p>
        <p className="TA"> تا </p>
        <p>
          <span className="TA">{`${Number(
            Number(
              value[1] < 1000000 ? value[1] / 1000 : value[1] / 1000000
            ).toFixed(1)
          ).toLocaleString()}`}</span>{" "}
          {`${value[1] >= 1000000 ? "میلیون" : "هزار"} تومان `}
        </p>
      </div>
      <Nouislider
        /**
         * @range
         * set the default range value between 0 to 10.000.000
         */
        range={{ min: 0, max: 10000000 }}
        start={value}
        margin={100000}
        // Show the blue color between to handles
        connect
        direction={"rtl"}
        onSlide={(i) => {
          setValue([+i[0], +i[1]]);
        }}
        // after click, the function will be running
        onEnd={(v) => onSlide(v)}
        step={100000}
      />
    </div>
  );
};

export default PriceSlider;
