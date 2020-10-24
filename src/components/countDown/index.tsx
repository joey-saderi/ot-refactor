import React, { useReducer, useEffect } from "react";

// set global variables at the component
let myInterval = null;
let UpdatedTime = 0;

const TimerReducer = (current, action) => {
  switch (action.type) {
    case "SET":
      return action.time;
    case "REDUCE":
      UpdatedTime = UpdatedTime - 1;
      return current - 1;
  }
  return current + 1;
};

const CountDown = (props: ITime) => {
  const [Time, dispatch] = useReducer(TimerReducer, 0);

  useEffect(() => {
    /**
     * props.@time
     *Set the time by the given time from props
     */
    dispatch({ type: "SET", time: props.time });
    // save the time on global value
    UpdatedTime = props.time;

    // start the time
    myInterval = setInterval(() => timer(), 1000);

    return () => {
      // clear interval and reset the global variables before unmounted the component
      myInterval = null;
      UpdatedTime = 0;
      clearInterval(myInterval);
    };
  }, []);

  // On each change on the time, check to be bigger than -1
  useEffect(() => {
    if (UpdatedTime <= 0) {
      /**
       * props.@Done
       * If the time ended, the parent will notice
       */
      props.Done();
      return clearInterval(myInterval);
    }
  }, [Time]);

  const timer = () => {
    dispatch({
      type: "REDUCE",
    });
  };
  return <span data-test-id="time">{Time}</span>;
};

interface ITime {
  time: number;
  Done: any;
}
export default CountDown;
