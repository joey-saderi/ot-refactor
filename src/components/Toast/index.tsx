import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

let setTimer = null;

const Toast = (props: IToast) => {
  useEffect(() => {
    if (props.autoClose) {
      setTimer = setTimeout(
        () => props.closeHandler(),
        props.time * 1000 + 500
      );
    }

    // reset the timer
    return () => {
      clearTimeout(setTimer);
    };
  }, []);

  return (
    <div className="toast_container">
      <div className="toast_div">
        {/* close icon */}
        <IoMdClose
          size="2rem"
          color="#fafafa"
          onClick={() => props.closeHandler()}
        />
        {/* message section */}
        <p className="message">{props.message}</p>
        {/* time bar */}
        <span
          style={{
            animationDuration: `${props.time}s`,
          }}
          className="time_bar"
        ></span>
      </div>
    </div>
  );
};

interface IToast {
  /**
   * @message
   * set the message of toast
   */
  message: string;
  /**
   * @closeHandler
   * listen to click on a close icon or ending the time
   */
  closeHandler: any;
  /**
   * @time
   *  you can set how many second should toast shown
   */
  time?: number;
  /**
   * @autoClose
   * should component disappear after a while or not
   */
  autoClose?: boolean;
}

export default Toast;
