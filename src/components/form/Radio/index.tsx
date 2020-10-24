import React, { useEffect, useState, useRef } from "react";

const Radio = (props: IRadio) => {
  const [checked, setChecked] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setChecked(props.defaultCheck);
  }, [props.defaultCheck]);

  // useEffect(() => {
  //   //  In case of error, the page will be scrolled to the invalid radio button section
  //   if (props.error_status) {
  //     scrollTo(0, wrapperRef.current.offsetTop);
  //   }
  // }, [props.error_status]);

  return props.data.map((i: any, index) => {
    return (
      <div
        className={[
          "radio_container",
          checked === i.value ? "active_radio_item" : null,
        ].join(" ")}
        key={index}
        ref={wrapperRef}
      >
        <label className="container">
          {i.label}
          {i.extra_text && <p>{i.extra_text}</p>}
          <input
            data-test-id="radio"
            type="radio"
            name={props.name}
            value={i.value}
            checked={checked === i.value}
            onChange={(e) => {
              // convert the true false value to 0 or 1
              props.SelectHandler(+e.target.value);
            }}
          />
          {/* To create a custom radio button */}
          <span className="checkmark"></span>
        </label>
      </div>
    );
  });
};

interface IRadio {
  name: string;
  // list of radios
  data: any;
  SelectHandler: any;
  // list of the default items
  defaultCheck?: number;
  error_status?: boolean;
}

export default Radio;
