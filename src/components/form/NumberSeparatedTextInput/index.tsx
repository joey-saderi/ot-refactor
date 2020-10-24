import React, { useState, useRef, useEffect } from "react";
import language from "../../../../public/languages/fa/textinputcomponent.json";

const NumberSeparatedTextInput = (props: ItextInput) => {
  const [localError, setLocalError] = useState({
    status: false,
    message: "",
  });

  const input_ref_separated = useRef(null);

  const validation = (finalValue) => {
    if (!props.validation) {
      return false;
    }
    let data = props.validation;
    let value: string | number = finalValue;
    if (data.required) {
      if (finalValue === "") {
        setLocalError({
          status: true,
          message: data.messages.required,
        });
        return;
      } else {
        setLocalError({
          status: false,
          message: "",
        });
      }
    }
    if (/[^0-9]/g.test(value.toString())) {
      setLocalError({
        status: true,
        message: language.not_valid,
      });
    } else if (data.LengthControl) {
      if (data.LengthControl.minLen) {
        if (value.toString().length < data.LengthControl.minLen) {
          setLocalError({
            status: true,
            message: data.messages.minLen,
          });
        }
      }
      if (data.LengthControl.maxLen) {
        if (value.toString().length > data.LengthControl.maxLen) {
          setLocalError({
            status: true,
            message: data.messages.maxLen,
          });
        }
      }
    } else if (data.length) {
      if (value.toString().length < data.length) {
        setLocalError({
          status: true,
          message: data.messages.length,
        });
      }
    } else if (data.min && value < data.min) {
      setLocalError({
        status: true,
        message: data.messages.min,
      });
    } else if (data.max && value > data.max) {
      setLocalError({
        status: true,
        message: data.messages.max,
      });
    } else {
      setLocalError({
        status: false,
        message: "",
      });
    }
    return true;
  };

  return (
    <div className='text_input_container'>
      <label
        /**
         * @LabelColor
         *  lives here
         */
        style={{
          color: props.LabelColor,
        }}
        className='text_input_label'
      >
        {props.label}
      </label>
      <div className='separated_places'>
        <input
          ref={input_ref_separated}
          type='number'
          data-hj-allow
          tabIndex={1}
          autoFocus={true}
          key={1}
          autoComplete='off'
          className='text_input data-hj-allow'
          name={props.name}
          value={props.value}
          onChange={(e: any) => {
            e.persist();
            setLocalError({
              status: false,
              message: "",
            });
            props.onChangeHandler(e.target.value);
          }}
          onKeyUp={(e) => {
            e.persist();
            if (props.value.length === 4)
              if (e.keyCode !== 8)
                if (e.keyCode !== 46) return input_ref_separated.current.blur();
          }}
          max={9999}
          min={0}
          onBlur={() => validation(props.value)}
        />
        <div
          className={[
            "border_on_each_Item",
            props.error.status || localError.status ? "span_error" : null,
          ].join(" ")}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {/* 
        If the props.error.status === true and props.error.message has a value,
        the Error message shown under the input box 
      */}
      {(props.error.status || localError.status) && (
        <p data-test-id='input_error_message' className='input_error_message'>
          {props.error.message || localError.message}
        </p>
      )}
    </div>
  );
};

interface ItextInput {
  // name of the input
  name: string;
  // keystroke listener
  onChangeHandler: any;
  error: any;
  label?: string;
  // you can set the custom color to the label of the input
  LabelColor?: string;
  // validation rules and requirements
  validation?: any;
  value: any;
}

export default NumberSeparatedTextInput;
