import React, { useState } from "react";
// import "./Counter.scss";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const Counter = (props: ICounter) => {
  return (
    <div className="counter_container">
      <label data-test-id="label">{props.label}</label>
      <div className="counter_box">
        <div className="counter">
          <IoMdAdd
            size="2.2rem"
            data-test-id="add"
            onClick={() => {
              if (props.value < props.max) props.AddTo();
            }}
          />
          <p data-test-id="value">{props.value}</p>
          <IoMdRemove
            size="2.2rem"
            data-test-id="remove"
            onClick={() => {
              if (props.value > props.min) props.reduceTo();
            }}
          />
        </div>
        <span className="text_tail" data-test-id="tail">
          {props.text}
        </span>
      </div>
    </div>
  );
};

interface ICounter {
  /**
   * @max
   * maximum value you can use
   */
  max: number;

  /**
   * @min
   * the smallest value a user can reach
   */
  min: number;

  // responsible to Increase the value by 1
  AddTo: any;

  // responsible to Reduce the value to 1
  reduceTo: any;

  // Custom label
  label: string;

  // a small tail text after Counter
  text: string;

  // Initial value
  value: number;
}

export default Counter;
