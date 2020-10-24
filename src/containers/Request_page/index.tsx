import React, { useState, useEffect, useContext } from "react";
import jsCookie from "js-cookie";
import { GET_ORDER_REQUEST } from "../../API";
import Router from "next/router";
// import "./Requests_page.scss";
import Request_cart from "./request_cart";
import Modal_context from "../../../src/context/Modal_context";
import Auth_context from "../../../src/context/Auth_context";
import PleaseLogin from "../../components/PleaseLogin";
import Requests_page_Loading from "../../components/cartPlaceholder/requestLoading";

const Request_page = ({ language }: IRequest_page) => {
  const [result, setResult] = useState([]);
  const [Authorize, setAuthorize] = useState(false);
  const [show, setShow] = useState(false);
  const MODAL_CONTEXT = useContext(Modal_context);
  const AUTH_CONTEXT = useContext(Auth_context);

  const token = jsCookie.get("token");

  useEffect(() => {
    if (jsCookie.get("complete_register") === "true") {
      setAuthorize(true);
      fetchAPI(Router.router.query.id);
    }
    //  else {
    //   MODAL_CONTEXT.modalHandler("Login");
    // }
    setShow(true);
  }, []);

  useEffect(() => {
    if (AUTH_CONTEXT.Auth) {
      fetchAPI(Router.router.query.id);
    }
  }, [AUTH_CONTEXT.Auth]);

  const fetchAPI = async (id) => {
    try {
      const res: any = await GET_ORDER_REQUEST({
        id,
        token,
      });
      if (res.data.status.id !== "new") {
        Router.push("/requests");
      } else {
        setResult([res.data]);
      }
    } catch (error) {
      console.log("!Error", error);
    }
  };

  return show ? (
    Authorize || AUTH_CONTEXT.Auth ? (
      <article className="responsive minHeight request_page_container">
        <section className="request_section">
          {result.length > 0 ? (
            <>
              {result.map((item, i) => {
                return (
                  <div className="Request_car" key={i}>
                    <Request_cart
                      language={language.request_cart}
                      data={item}
                      getDataAgain={(id) => {
                        fetchAPI(id);
                      }}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <Requests_page_Loading />
          )}
        </section>
      </article>
    ) : (
      <PleaseLogin language={language.please_login} />
    )
  ) : (
    <article className="minHeight"></article>
  );
};

interface IRequest_page {
  language?: any;
}

export default Request_page;
