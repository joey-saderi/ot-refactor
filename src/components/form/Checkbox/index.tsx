import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner";

const Checkbox = (props: ICheckbox) => {
  const [Data, setData] = useState([]);
  const [initialValueList, setInitialValueList] = useState([]);

  useEffect(() => {
    // Update the data if data came after loading the component
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    // If the initialValue is valid to set it to the component value
    if (props.initialValue) {
      setInitialValueList(props.initialValue);
    }
  }, [props.initialValue]);

  return (
    <>
      {Data.length === 0 ? (
        <div className="resultList" data-test-id="resultList">
          <Spinner display="block" width={21} color="#9E9E9E" />
        </div>
      ) : (
        <div
          className={["check_box_container", props.custom_className].join(" ")}
        >
          {Data.map((i, index) => (
            <label className="container" key={index} data-test-id="container">
              {i.text}
              {/* if you need to show some number from checkbox you can active it ny 'count' property */}
              {/* {i.count ? (
                <span className="count">{i.count}</span>
              ) : i.count === 0 ? (
                // if the count is Zero we show -
                <span className="count">-</span>
              ) : null} */}
              <input
                data-test-id="checkbox"
                checked={initialValueList.find((item) => {
                  // check the checkboxes based on initial evaluation
                  return item === i.value ? true : false;
                })}
                type="checkbox"
                onChange={(e) => {
                  e.persist();
                  // @e.target.checked return true or false
                  if (e.target.checked) {
                    // true => check the box
                    props.Select(i);
                  } else {
                    // deactivate the box
                    setInitialValueList([]);
                    props.clearField(i);
                  }
                }}
                name={props.name}
              />
              {/* To create a custom checkbox*/}
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
      )}
    </>
  );
};

interface ICheckbox {
  /**
   * @data
   *  The incoming data from parent component
   */
  data: any;
  /**
   * @name
   *  The name of the check box
   */
  name: string;
  /**
   * @clearField
   *  Responsible to clear the checkbox value
   */
  clearField: any;
  /**
   * @Select
   *  Responsible to get the value of the checked checkbox
   */
  Select: any;
  /**
   * @initialValue
   *  default values
   */
  initialValue?: any;
  /**
   * @custom_className
   * add a custom class to the main container
   */
  custom_className?: string;
}

export default Checkbox;
