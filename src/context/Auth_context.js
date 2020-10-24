import React from "react";

const auth_context = React.createContext({
  Auth: false,
  Auth_Manager: (v) => {}
});

export default auth_context;
