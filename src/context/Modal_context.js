import React from "react";

const modalContent = React.createContext({
  show_modal: false,
  modalHandler: (v, data) => {
    // "Login" |"TellMe" |"Renter" |"Owner" |"Law"
  },
});

export default modalContent;
