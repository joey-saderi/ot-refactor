import React from "react";

const toast_context = React.createContext({
  // show status
  show_toast: false,
  // time and message
  toast_option: (v) => {},
});

export default toast_context;
