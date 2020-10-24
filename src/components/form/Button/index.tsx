import React from "react";
// import "./Button.scss";

const Button = (props: IButton) => {
  return (
    <button
      data-test-id="btn"
      className={props.class}
      disabled={props.disable || props.loading}
      onClick={() => props.click()}
    >
      {props.loading ? (
        // this loading and the <Spinner/> component have save style
        <span
          style={{
            borderRightColor: props.loadingColor,
          }}
          data-test-id="Loading"
          className="Loading"
        />
      ) : (
        props.value
      )}
    </button>
  );
};

interface IButton {
  // button's text
  value: string;

  /**
   * @class
   *  you should set a class for button, the default button didn't have any class
   */
  class: string;

  // By default is false, if loading be true the spinner will shown
  loading: boolean;

  // true => Disable the button
  disable?: boolean;

  /**
   * @click
   * Click event.
   * It can do nothing
   */
  click: any;

  /**
   * @laodingColor
   * border color for spinner
   */
  loadingColor?: string;
}

export default Button;
