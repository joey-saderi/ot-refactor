import React, { useState, useEffect, useRef } from "react";
import { IoMdClose, IoIosArrowDown, IoIosSearch } from "react-icons/io";
import Spinner from "../../Spinner";

const DropdownSearch = (props: IDropDown) => {
  const [InputValue, setInputValue] = React.useState("");
  const [ShowController, setShowController] = React.useState(false);
  const [Data, setData] = React.useState([]);
  const [search_value, setSearch_value] = React.useState("");
  // this value is necessary to update the drop-down input in case of a default value
  const [colorCode, setColorCode] = React.useState(null);

  const wrapperRef = useRef(null);

  const handleClickOutside = (e) => {
    // If the click is outside of the drop-down box the drop-down section will be close
    if (!wrapperRef.current.contains(e.target)) {
      setSearch_value("");
      setShowController(false);
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (props.defaultVal) {
      // Set the value of the input to incoming value form parent
      setInputValue(props.defaultVal);
    }
  }, [props.defaultVal]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  // Reset the input field
  useEffect(() => {
    if (props.callClearField) {
      setInputValue("");
      props.clearField();
      props.callClearFieldReset();
    }
  }, [props.callClearField]);

  // useEffect(() => {
  //   //  In case of error, the page will be scrolled to the invalid drop-down
  //   if (props.error_status) {
  //     scrollTo(0, wrapperRef.current.offsetTop);
  //   }
  // }, [props.error_status]);

  const DropDownController = () => {
    setSearch_value("");
    setData(props.data);
    setShowController(!ShowController);
  };

  const searchHandler = (e) => {
    // show all the data if the input is clear
    if (e === "") {
      setData(props.data);
    }

    let filter: any = props.data.filter((item) => {
      // search fo the given 'e' in the data list
      return item.text.search(e) !== -1;
    });
    // If there wasn't any pair
    if (filter.length === 0)
      filter = [
        {
          key: -1,
          text: "نتیجه‌ای یافت نشد",
          value: -1,
        },
      ];

    setData(filter);
  };

  const clearField = () => {
    setInputValue("");
    setShowController(true);
    props.clearField();
  };

  return (
    <div
      className={[
        "DropDown_container",
        //  if the drop-down is disabled, it is shown by class
        props.disabled ? "Disable_Container" : null,
      ].join(" ")}
      ref={wrapperRef}
    >
      {props.label && (
        <label
          data-test-id="label"
          className={props.disabled ? "Disable_color" : null}
        >
          {props.label}
        </label>
      )}
      {props.browserDropdown ? (
        <div className="select_container">
          <IoIosArrowDown
            color="rgb(165, 165, 165)"
            size="2rem"
            className="ArrowDown"
          />
          <select
            className="default_select"
            onChange={(e) => {
              e.persist();
              let value = JSON.parse(e.target.value);
              if (value.value === -1) {
                props.clearField();
              } else {
                props.Select(value);
              }
            }}
          >
            <option value={JSON.stringify({ value: -1 })}></option>
            {Data.map((i, index) => (
              <option key={index} value={JSON.stringify(i)}>
                {i.text}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div
        className={[
          "input_wrapper",
          props.browserDropdown ? "hideInput_wrapper" : null,
        ].join(" ")}
      >
        <input
          data-test-id="drop_down_input"
          className={[
            "data-hj-allow",
            props.disabled ? "Disable_color" : null,
            props.styleClass ? props.styleClass : null,
            props.error_status ? "inputError" : null,
            ShowController ? "dropdownIsActive" : null,
          ].join(" ")}
          data-hj-allow
          onChange={() => {}}
          // active readOnly for input
          readOnly={props.InputDisable}
          disabled={props.disabled}
          // always HardValue has priority to a default value or components value
          value={props.hardValue ? props.hardValue : InputValue}
          placeholder={props.placeholder}
          onClick={DropDownController}
        />
        {/* close icon in input */}
        {props.clearField ? (
          (InputValue.length > 0 || props.defaultVal) &&
          !props.hideClearField ? (
            <IoMdClose
              color="rgb(165, 165, 165)"
              size="2rem"
              className="clean_icon"
              onClick={clearField}
            />
          ) : null
        ) : null}
        {/* Show the selected color in color picker drop-down */}
        {props.colorPicker && InputValue && (
          <div
            className="color_Circle"
            style={{
              background: colorCode
                ? colorCode
                : props.colorPicker
                ? InputValue
                : null,
            }}
          ></div>
        )}
        {/* Arrow down icon */}
        {!props.hideArrowDown && (
          <IoIosArrowDown
            color="rgb(165, 165, 165)"
            size="2rem"
            className={[
              "ArrowDown",
              ShowController ? "rotate_arrow_down_icon" : null,
            ].join(" ")}
            onClick={DropDownController}
          />
        )}
      </div>
      {ShowController ? (
        <div
          data-test-id="Locations_list_container"
          className="Locations_list_container"
        >
          {Data.length === 0 ? (
            <div className="resultList spinnerPlaceholder">
              <Spinner display="block" width={21} color="#9E9E9E" />
            </div>
          ) : (
            <div className="resultList">
              {/* You can control the performance of the search input */}
              {!props.disableSearch && (
                <div className="search_input_container">
                  <input
                    data-test-id="search_input"
                    data-hj-allow
                    // When the drop-down is shown, the search input is ready to type
                    // autoFocus
                    placeholder={`جستجو ${props.search_place_holder} ..`}
                    name="search"
                    // NOTE type of the input is 'text'
                    type="text"
                    value={search_value}
                    onChange={(e) => {
                      // set the value in input
                      setSearch_value(e.target.value.trim());
                      // search the value in list
                      searchHandler(e.target.value.trim());
                    }}
                  />
                  {!search_value && <IoIosSearch size="2rem" color="#737373" />}
                  {search_value && (
                    <IoMdClose
                      onClick={() => {
                        setSearch_value("");
                        searchHandler("");
                      }}
                      size="2rem"
                      color="#737373"
                    />
                  )}
                </div>
              )}
              {Data.map((i, index) => (
                <p
                  data-test-id="Items"
                  className="Items"
                  onClick={() => {
                    if (i.value === -1) return;
                    // this part just work for color picker
                    if (i.code) {
                      setColorCode(i.code);
                    }
                    setInputValue(i.text);
                    props.Select(i);
                    DropDownController();
                  }}
                  key={index}
                >
                  {i.text}
                  {/* this section will active just in the color picker */}
                  {i.code && (
                    <span
                      style={{ background: `${i.code}` }}
                      className="Color_box"
                    ></span>
                  )}
                </p>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

interface IDropDown {
  error_status?: boolean;

  // disable the main input
  InputDisable?: boolean;

  // disable the whole drop-down
  disabled?: boolean;
  placeholder?: string;
  data: any;
  defaultVal?: any;

  // label of the drop-down
  label?: string;

  // you can add custom class to the main input
  styleClass?: string;
  clearField?: any;
  Select: any;

  // deactivate default value and component's value
  hardValue?: string;

  // the search input will be disappear
  disableSearch?: boolean;

  // don't show the arrow down icon
  hideArrowDown?: boolean;

  // don't show the close icon in main input
  hideClearField?: boolean;

  // active the color-picker property at the component
  colorPicker?: boolean;

  // Show the default select-option instead of Dropdown component
  browserDropdown?: boolean;

  // clear the text inside the input field
  callClearField?: boolean;

  // Reset the controller value of clear input from the parent component
  callClearFieldReset?: any;

  // Reset the controller value of clear input from the parent component
  search_place_holder?: string;
}

export default DropdownSearch;
