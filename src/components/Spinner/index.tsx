import React from "react";

const Spinner = (props: ISpinner) => {
  return (
    <span
      data-test-id="span"
      style={{
        /**
         * @display property is here
         */
        display: props.display,
        /**
         * @color is here
         */
        borderTopColor: props.color,
        borderBottomColor: props.color,

        /**
         * @width
         *  width and height of the spinner create on given width to be equal
         */
        width: props.width + "px",
        height: props.width + "px",
      }}
      className="Loading"
    ></span>
  );
};
interface ISpinner {
  /**
   * you can adjust the spinner should have
   * "display", "inline" or even "flex" display style
   */
  display: string;

  // the height and width adjust base on width
  width: number;

  // set the color of spinner
  color: string;
}

export default Spinner;
