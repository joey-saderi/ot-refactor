import React, { useEffect, useContext, useState } from "react";
import jsCookie from "js-cookie";
import Modal_context from "../../../src/context/Modal_context";
import Auth_context from "../../../src/context/Auth_context";
import PleaseLogin from "../../../src/components/PleaseLogin";
import Add_Car_Step_2 from "./step_2";
import Router from "next/router";

const Set_car_timing = ({ language }: ISet_car_timing) => {
  const [Authorize, setAuthorize] = useState(false);
  const [show, setShow] = useState(false);
  const MODAL_CONTEXT = useContext(Modal_context);
  const AUTH_CONTEXT = useContext(Auth_context);

  useEffect(() => {
    if (!checkRegister()) {
      return;
    }
    if (jsCookie.get("complete_register") === "true") {
      setAuthorize(true);
    } else {
      MODAL_CONTEXT.modalHandler("Login");
    }
    setShow(true);
  }, []);

  const checkRegister = () => {
    const complete_register = jsCookie.get("complete_register");
    if (complete_register === "false") {
      Router.push("/complete-register");
      return false;
    } else {
      return true;
    }
  };

  return show ? (
    Authorize || AUTH_CONTEXT.Auth ? (
      <Add_Car_Step_2 language={language.add_car_step_2} />
    ) : (
      <PleaseLogin language={language.please_login} />
    )
  ) : (
    <article className="minHeight"></article>
  );
};

interface ISet_car_timing {
  language: any;
}

export default Set_car_timing;
