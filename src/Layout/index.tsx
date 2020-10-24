import React, { useEffect, useReducer, useState, useContext } from "react";
import Router from "next/router";
import Footer from "../components/Footer";
import Header from "../containers/header";
import logo from "../../public/android-icon-48x48.png";

// Main Scss file
// All Scss files are imported to the main.scss
import "../styles/main.scss";

// Modal Context
import modal_context from "../context/Modal_context";

// Auth Context
import auth_context from "../context/Auth_context";

// Toast Context
import toast_context from "../context/Toast_context";

// Toast Component
import Toast from "../components/Toast";

// Google Analytics
import { initGA, logPageView } from "../../utils/analytics";
import { IoIosClose } from "react-icons/io";

const ShowModalReducer = (current, action) => {
  /* 
    This reducer control the display of the modal.
      "SET" type set the status for the modal component
        true : show 
        false : will not render at the page
        */
  if (action.type === "SET") return !current;
};

let deferredPrompt = null;
let pwa_flag = false;

const Layout = (props: ILayout) => {
  /*
    NOTE 
      There are multi-status you can set in modals component.

    REVIEW 
      Login: is the default to show login modal first step 
      TellMe: modal to get user cellphone number and save it  
      Renter: client can rate car and renter
      Owner: Owner can rate client rate and review
      Law: show the rules and policies to new user
  */
  const [modalType, setModalType] = useState("Login");
  const [data, setData] = useState(null);
  const [showPwaBanner, setShowPwaBanner] = useState(false);

  // By default, no users are authenticated or logged in
  const [Auth, setAuth] = useState(false);

  /* 
    The toast component is not rendered to the page if there is no alert. 
    NOTE The toast component is not hidden by style 
  */
  const [toast, setToast] = useState(false);
  const [toastData, setToastData] = useState(null);

  // Reducers
  const [Show_Modal, dispatch] = useReducer(ShowModalReducer, false);

  const TOAST_CONTEXT = useContext(toast_context);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => { 
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      if (!pwa_flag) {
        AnalyticsEvent("pwa", "install-banner", "shown");
        setShowPwaBanner(true);
      }
      return false;
    });
    if (Router.router) {
      /*
        It checks the current URL if there are any UTM values in there
        NOTE 
          If user login, these information will sended to API
            "/core/device/send-code"
      */
      if (Router.router.query.utm_source) {
        localStorage["utm_source"] = Router.query.utm_source;
        localStorage["utm_medium"] = Router.query.utm_medium;
        localStorage["utm_campaign"] = Router.query.utm_campaign;
        localStorage["utm_term"] = Router.query.utm_term;
        localStorage["utm_content"] = Router.query.utm_content;
        localStorage["utm_landing_url"] = "https://otoli.net/join-us";
      } else if(!localStorage["utm_source"]) {
        localStorage["utm_source"] = "google";
        localStorage["utm_medium"] = "organic";
        localStorage["utm_landing_url"] = Router.router.asPath;
      }
    }

    // Initial React GA library after the mount
    if (!window["GA_INITIALIZED"]) {
      initGA();
      window["GA_INITIALIZED"] = true;
    }
    logPageView();
    checkToast();
  }, []);

  const modal_handler = (type, data) => {
    dispatch({ type: "SET" });
    setModalType(type);
    setData(data);
  };

  const toast_handler = (data) => {
    setToastData(data);
    setToast(true);
    localStorage["TOAST"] = JSON.stringify({ ...data });
  };

  const checkToast = () => {
    if (localStorage["TOAST"]) {
      setToast(true);
      let data = JSON.parse(localStorage["TOAST"]);
      setToastData(data);
    }
  };

  const AnalyticsEvent = (eventCategory, eventAction, eventLabel) => {
    if (window["ga"]) {
      window["ga"]("send", {
        hitType: "event",
        eventCategory,
        eventAction,
        eventLabel,
      });
    }
  };

  const customPwaPrompt = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
          AnalyticsEvent("pwa", "install-prompt", "accepted");
        } else {
          console.log("User dismissed the install prompt");
          AnalyticsEvent("pwa", "install-prompt", "rejected");
        }
        pwa_flag = true;
        deferredPrompt = null;
        setShowPwaBanner(false);
      });
    }
  };

  return (
    <>
      {/* 
        NOTE 
          context Providers wrap the Header and main section in the app to track data change in content   
      */}
      {showPwaBanner ? (
        <section className="pwa_invitation_banner">
          <div
            className="pwa_content HEAP_PWA_INVITATION"
            onClick={customPwaPrompt}
          >
            <img src={logo} alt="pwa logo icon" />
            اپلیکیشن اتولی را نصب کنید.
          </div>
          <p
            className="close_pwa_invitation"
            onClick={() => {
              AnalyticsEvent("pwa", "install-banner", "closed");
              setShowPwaBanner(false);
            }}
          >
            <IoIosClose color="#fff" size="2rem" />
            بستن
          </p>
        </section>
      ) : null}
      <toast_context.Provider
        value={{
          show_toast: toast,
          toast_option: (data) => {
            toast_handler(data);
          },
        }}
      >
        <modal_context.Provider
          value={{
            show_modal: Show_Modal,
            modalHandler: (type, data) => {
              modal_handler(type, data);
            },
          }}
        >
          <auth_context.Provider
            value={{
              Auth: Auth,
              Auth_Manager: (v) => setAuth(v),
            }}
          >
            <Header
              modalType={modalType}
              Show_Modal={Show_Modal}
              // data information is just needed for owner and renter modals
              data={data}
            ></Header>
            <main>{props.children}</main>
          </auth_context.Provider>
        </modal_context.Provider>
        {toast ? (
          <Toast
            message={toastData.message}
            closeHandler={() => {
              if (localStorage["TOAST"]) localStorage.removeItem("TOAST");
              setToast(false);
            }}
            time={toastData.time}
            autoClose={toastData.autoClose}
          />
        ) : null}
      </toast_context.Provider>
      {/* 
        NOTE
          IF you need to hide the footer at the page just pass {true} for "hide".
          you can set the "hide" property anywhere you imported the "layout" component
      */}
      <Footer
        hide={props.hide}
        showToTop={props.showToTop}
        LinkControl={props.LinkControl}
      />
    </>
  );
};

interface ILayout {
  children: any;
  hide?: boolean;
  showToTop?: boolean;
  LinkControl?: boolean;
}

export default Layout;
