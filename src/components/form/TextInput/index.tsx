import React, { useState, useRef, useEffect } from "react";
import { FaLanguage } from "react-icons/fa";
// import "./inputStyle.scss";
import { IoMdClose } from "react-icons/io";
import language from "../../../../public/languages/fa/textinputcomponent.json";
const TextInput = (props: ItextInput) => {
  const [localError, setLocalError] = useState({
    status: false,
    message: "",
  });
  const TextInput = useRef(null);

  const ValueHandler = (e) => {
    let value = e.target.value;
    // check the given character and convert it to english
    const persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ];
    const arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ];
    const persianNumbersSTD = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ];
    // replace all the arabic or persian character with english number
    for (var i = 0; i < 10; i++) {
      value = value
        .replace(persianNumbers[i], i)
        .replace(persianNumbersSTD[i], i)
        .replace(arabicNumbers[i], i);
    }
    if (props.number) {
      // remove all the non-numeric char from string
      value = value.replace(/[^0-9]/g, "");
    }
    // if the input is not number return the input without any changes
    props.onChangeHandler(value);
  };

  // useEffect(() => {
  //   if (props.error.status) {
  //     scrollTo(0, TextInput.current.offsetTop);
  //   }
  // }, [props.error]);

  const validation = (data) => {
    if (!props.validation) {
      return;
    }
    let value: string | number = props.value;
    if (data.required) {
      if (props.value === "") {
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
    if (data.number) {
      if (props.number) {
        if (typeof props.value !== "number")
          value = Number(props.value.replace(/,/gi, ""));
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
    }
    // if(data.string){
    //   if(data.length){}
    //   if(data.minLength){}
    //   if(data.maxLength){}
    // }
  };

  return (
    <div className='text_input_container' ref={TextInput}>
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
      <div className='input_surround'>
        <input
          type={props?.type ? props.type : "text"}
          data-test-id='input'
          data-hj-allow
          onInvalid={(e: any) => {
            /**
             *
             * this part it just works in numeric status
             * If the length of the input is smaller then props.min input is invalid and error style will shown
             */
            if (props.value.length < props.min) {
              e.target.setCustomValidity(
                `${language.min_length} ${props.min} ${language.characters}`
              );
            } else if (props.value.length > props.max) {
              e.target.setCustomValidity(
                `${language.min_length} ${props.max} ${language.characters}`
              );
            }
          }}
          autoFocus={props.autoFocus}
          className={[
            "text_input",
            "data-hj-allow",
            props.error.status || localError.status ? "inputError" : null,
            props?.type
              ? props.type === "number"
                ? "change_direction_onfocus"
                : null
              : null,
          ].join(" ")}
          name={props.name}
          value={
            /**
             * If it's number
             *  If is empty show "" (nothing)
             *
             * If it's number
             *  And it's NOT empty so Do toLocaleString() on value
             *
             * If it's number
             *   And it's NOT empty and props.localeString is ACTIVE
             *    Print the current value without change
             *
             * If it's number
             *   And it's NOT empty and props.localeString is DEACTIVATE
             *    Do  toLocaleString() on value
             *
             * If it's NOT number
             *   Print the current value without change
             */
            props.number
              ? props.value === ""
                ? props.value.toLocaleString()
                : props.localeString
                ? props.value
                : Number(props.value).toLocaleString()
              : props.value
            // props.value
          }
          onChange={(e: any) => {
            e.target.setCustomValidity("");
            ValueHandler(e);
          }}
          disabled={props.disabled}
          maxLength={props.max}
          minLength={props.min}
          placeholder={props.placeholder}
          // check the validation on blur event listener
          onBlur={() => {
            validation(props.validation);
            if (props.Input_onBlur) {
              props.Input_onBlur();
            }
          }}
          onFocus={() => {
            setLocalError({
              status: false,
              message: "",
            });
          }}
        />
        {props.value.length > 0 && !props.HideClearIcon && (
          <IoMdClose
            data-test-id='svg-icon'
            color='rgb(165, 165, 165)'
            size='2rem'
            className='clean_icon'
            onClick={() => props.clearField()}
          />
        )}
        {props.showTail ? (
          <span className='input_tail_content'>{props.tail_value}</span>
        ) : null}
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

  // responsible to clear the input
  clearField: any;

  // keystroke listener
  onChangeHandler: any;
  value: string;
  error: any;
  // Ready to type ofter load
  autoFocus: boolean;

  // deactivate the input
  disabled?: boolean;

  max?: number;
  min?: number;
  label?: string;
  placeholder?: string;

  // you can set the custom color to the label of the input
  LabelColor?: string;

  // convert the input type from 'text' to 'number'
  number?: boolean;

  // don't shoe clear icon
  HideClearIcon?: boolean;

  // control on converting the value inside the input to local string
  localeString?: boolean;

  // validation rules and requirements
  validation?: any;
  Input_onBlur?: any;
  showTail?: boolean;
  tail_value?: string;
  type?: string;
}

export default TextInput;
