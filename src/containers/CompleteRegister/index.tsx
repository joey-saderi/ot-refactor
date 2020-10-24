import React, { useReducer, useState, useContext, useEffect } from "react";
// import "./complete_register.scss";
import DropdownSearch from "../../components/form/Dropdown";
import TextInput from "../../components/form/TextInput";
import jsCookie from "js-cookie";
import Button from "../../components/form/Button";
import Modal_context from "../../context/Modal_context";
import Auth_context from "../../../src/context/Auth_context";
import { IoMdPersonAdd } from "react-icons/io";
import { REQUEST_USER_INFO_UPDATE } from "../../API";
import PleaseLogin from "../../components/PleaseLogin";
import Router from "next/router";

const stateReducer = (current, action) => {
  switch (action.type) {
    case "first_name":
      return { ...current, first_name: action.first_name };
    case "last_name":
      return { ...current, last_name: action.last_name };
    case "company_name":
      return { ...current, company_name: action.company_name };
    case "day":
      return { ...current, day: action.day };
    case "month":
      return { ...current, month: action.month };
    case "year":
      return { ...current, year: action.year };
    default:
      throw new Error("Something is wrong");
  }
};

const stateErrorReducer = (current, action) => {
  switch (action.type) {
    case "first_name":
      return {
        ...current,
        first_name: action.first_name,
        message: action.message,
      };
    case "last_name":
      return {
        ...current,
        last_name: action.last_name,
        message: action.message,
      };
    case "company_name":
      return {
        ...current,
        company_name: action.company_name,
        message: action.message,
      };
    case "day":
      return { ...current, day: action.day, message: action.message };
    case "month":
      return { ...current, month: action.month, message: action.message };
    case "year":
      return { ...current, year: action.year, message: action.message };
    case "condition":
      return {
        ...current,
        condition: action.condition,
        message: action.message,
      };
    case "message":
      return { ...current, year: action.year, message: action.message };
    default:
      throw new Error("Something is wrong");
  }
};

const Complete_register_container = ({
  language,
}: IComplete_register_container) => {
  const [rolesCheck, setRolesCheck] = useState(false);
  const [showCompanyName, setShowCompanyName] = useState(false);
  const [show, setShow] = useState(false);
  const [Authorize, setAuthorize] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(stateReducer, {
    first_name: "",
    last_name: "",
    company_name: "",
    day: "",
    month: null,
    year: "",
  });

  const [stateError, errorDispatch] = useReducer(stateErrorReducer, {
    first_name: false,
    last_name: false,
    company_name: false,
    day: false,
    month: false,
    year: false,
    condition: false,
    message: null,
  });

  const monthsFarsi = [
    { key: "1", value: "1", text: "فروردین" },
    { key: "2", value: "2", text: "اردیبهشت" },
    { key: "3", value: "3", text: "خرداد" },
    { key: "4", value: "4", text: "تیر" },
    { key: "5", value: "5", text: "مرداد" },
    { key: "6", value: "6", text: "شهریور" },
    { key: "7", value: "7", text: "مهر" },
    { key: "8", value: "8", text: "آبان" },
    { key: "9", value: "9", text: "آذر" },
    { key: "10", value: "10", text: "دی" },
    { key: "11", value: "11", text: "بهمن" },
    { key: "12", value: "12", text: "اسفند" },
  ];
  const MODAL_CONTEXT = useContext(Modal_context);
  const AUTH_CONTEXT = useContext(Auth_context);

  const token = jsCookie.get("token");

  useEffect(() => {
    // if the user is not register the login modal will show up
    if (jsCookie.get("complete_register") === "false") {
      setAuthorize(true);
    } else {
      Router.push("/");
    }
    setShow(true);
  }, []);

  const submitHandler = async (e, state) => {
    e.preventDefault();
    setLoading(true);
    // if all the validation is true
    if (validation(state)) {
      try {
        const user_info_res = await REQUEST_USER_INFO_UPDATE({
          token,
          first_name: state.first_name,
          last_name: state.last_name,
          // company_name is optional
          company_name: state.company_name === "" ? null : state.company_name,
          // birth_date constructor 1399/01/01
          birth_date: `${state.year}/${state.month}/${state.day}`,
        });
        // cache expire after 100 days
        const cook_option = {
          expires: 100,
        };
        jsCookie.set("complete_register", true, cook_option);
        jsCookie.set("first_name", state.first_name, cook_option);
        jsCookie.set("last_name", state.last_name, cook_option);
        jsCookie.set(
          "name",
          state.first_name + " " + state.last_name,
          cook_option
        );
        if (state.company_name !== "") {
          jsCookie.set("company_name", state.company_name, cook_option);
        } else if (jsCookie.get("company_name")) {
          jsCookie.remove("company_name");
        }
        if (localStorage["last_location"]) {
          Router.push(localStorage["last_location"]);
        } else {
          Router.push({
            pathname: `/user/${jsCookie.get("user_id")}`,
          });
        }
      } catch (error) {
        setLoading(false);
        console.log("!Error", error);
      }
    } else {
      setLoading(false);
    }
  };

  // receive the Reducer type and reset the error status
  const resetTheErrorStatus = (value_name) => {
    if (value_name === "message") {
      errorDispatch({
        type: value_name,
        message: null,
      });
    } else {
      errorDispatch({
        type: value_name,
        [value_name]: null,
        message: null,
      });
    }
  };

  const validation = (state) => {
    if (state.first_name.trim() === "") {
      errorDispatch({
        type: "first_name",
        first_name: true,
        message: language.fill_name,
      });
      return;
    } else {
      resetTheErrorStatus("first_name");
    }
    if (state.last_name.trim() === "") {
      errorDispatch({
        type: "last_name",
        last_name: true,
        message: language.fill_name_name,
      });
      return;
    } else {
      resetTheErrorStatus("last_name");
    }
    // if (showCompanyName && state.company_name === "") {
    //   errorDispatch({
    //     type: "company_name",
    //     company_name: true,
    //     message: "لطفاً نام شرکت را وارد کنید",
    //   });
    //   return;
    // } else {
    //   resetTheErrorStatus("company_name");
    // }
    if (state.day.trim() === "") {
      errorDispatch({
        type: "day",
        day: true,
        message: language.fill_day,
      });
      return;
    } else if (+state.day > 31) {
      errorDispatch({
        type: "day",
        day: true,
        message: language.fill_correctly,
      });
      return;
    } else {
      resetTheErrorStatus("day");
    }
    if (!state.month) {
      errorDispatch({
        type: "month",
        month: true,
        message: language.fill_month,
      });
      return;
    } else {
      resetTheErrorStatus("month");
    }
    if (state.year.trim() === "") {
      errorDispatch({
        type: "year",
        year: true,
        message: language.fill_year,
      });
      return;
    } else {
      resetTheErrorStatus("year");
    }
    if (!rolesCheck) {
      errorDispatch({
        type: "condition",
        condition: true,
        message: language.fill_policies,
      });
      return;
    } else {
      resetTheErrorStatus("message");
    }
    return true;
  };

  useEffect(() => {
    if (rolesCheck) {
      errorDispatch({
        type: "condition",
        condition: false,
        message: "",
      });
    }
  }, [rolesCheck]);

  return show ? (
    Authorize || AUTH_CONTEXT.Auth ? (
      <article className="responsive  complete_register_container">
        <div className="pageTitle">
          <IoMdPersonAdd className="Person_icon" size="6rem" color="#4ba3ce" />
          <h3>{language.complete_register}</h3>
        </div>
        <form
          className="complete_register_form"
          onSubmit={(e) => submitHandler(e, state)}
        >
          <div className="name_container">
            <TextInput
              name="first_name"
              label={language.name}
              // min={2}
              max={50}
              clearField={() =>
                dispatch({ type: "first_name", first_name: "" })
              }
              onChangeHandler={(e) =>
                dispatch({ type: "first_name", first_name: e })
              }
              value={state.first_name}
              autoFocus={false}
              error={{
                status: stateError.first_name,
                message: null,
              }}
              validation={{
                required: true,
                messages: {
                  required: language.name_placeHolder,
                },
              }}
            />
            <TextInput
              name="last_name"
              // min={2}
              label={language.last_name}
              max={50}
              clearField={() => dispatch({ type: "last_name", last_name: "" })}
              onChangeHandler={(e) =>
                dispatch({ type: "last_name", last_name: e })
              }
              value={state.last_name}
              autoFocus={false}
              error={{
                status: stateError.last_name,
                message: null,
              }}
              validation={{
                required: true,
                messages: {
                  required: language.last_name_place_holder,
                },
              }}
            />
          </div>
          <div className="company_part">
            {!showCompanyName ? (
              <p onClick={() => setShowCompanyName(true)}>
                {language.add_company_name}
              </p>
            ) : (
              <div className="add_company_input_container">
                <TextInput
                  name="company_name"
                  number={false}
                  // min={1}
                  max={100}
                  label={language.company_name}
                  clearField={() =>
                    dispatch({ type: "company_name", company_name: "" })
                  }
                  onChangeHandler={(e) =>
                    dispatch({ type: "company_name", company_name: e })
                  }
                  value={state.company_name}
                  autoFocus={false}
                  error={{
                    status: stateError.company_name,
                    message: null,
                  }}
                />
                <span
                  onClick={() => {
                    dispatch({ type: "company_name", company_name: "" });
                    setShowCompanyName(false);
                  }}
                >
                  {language.cancel}
                </span>
              </div>
            )}
          </div>
          <label>{language.dob}</label>
          <div className="date_birth">
            <TextInput
              name="day"
              number={true}
              min={1}
              max={2}
              placeholder={language.day}
              clearField={() => dispatch({ type: "day", day: "" })}
              onChangeHandler={(e) => dispatch({ type: "day", day: e })}
              value={state.day}
              autoFocus={false}
              error={{
                status: stateError.day,
                message: null,
              }}
              validation={{
                number: true,
                min: 1,
                max: 31,
                required: true,
                messages: {
                  required: language.error_1,
                  min: language.error_2,
                  max: language.error_3,
                },
              }}
            />
            <DropdownSearch
              data={monthsFarsi}
              // clearField={() => dispatch({ type: "month", month: null })}
              Select={(i) => dispatch({ type: "month", month: i.value })}
              disableSearch={true}
              error_status={stateError.month}
            />
            <TextInput
              name="year"
              number={true}
              min={4}
              max={4}
              clearField={() => dispatch({ type: "year", year: "" })}
              onChangeHandler={(e) => dispatch({ type: "year", year: e })}
              value={state.year}
              placeholder={language.year_example}
              autoFocus={false}
              localeString={true}
              error={{
                status: stateError.year,
                message: null,
              }}
              validation={{
                number: true,
                length: 4,
                messages: {
                  required: language.error_4,
                },
                required: true,
              }}
            />
          </div>
          <div className="check_box_container">
            <label className="container">
              <span
                onClick={() => MODAL_CONTEXT.modalHandler("Law")}
                style={{
                  textDecoration: "underline",
                  color: "#0099ff",
                  cursor: "pointer",
                  display: "inline-block",
                  marginBottom: "11px",
                }}
              >
                {" "}
                {language.policies}
              </span>
              <span onClick={() => setRolesCheck(true)}>
                {" "}
                {language.i_agree}
              </span>
              <input
                type="checkbox"
                onChange={(e) => {
                  e.persist();
                  if (e.target.checked) {
                    setRolesCheck(true);
                  } else {
                    setRolesCheck(false);
                  }
                }}
                name="roles"
              />
              <span
                className={[
                  "checkmark",
                  stateError.condition ? "red_check_box" : null,
                ].join(" ")}
              ></span>
            </label>
          </div>
          <Button
            class={[
              "Blue_BTN local_BTN HEAP_CompleteRegister_Btn_Submit",
              // , rolesCheck ? null : "disable_BTN"
            ].join(" ")}
            value={language.ok}
            click={() => {}}
            loading={loading}
          />
          {stateError.message ? (
            <p className="Error_message_text"> {stateError.message}</p>
          ) : null}
        </form>
      </article>
    ) : (
      <PleaseLogin language={language.please_login} />
    )
  ) : (
    <article className="minHeight"></article>
  );
};

interface IComplete_register_container {
  language: any;
}

export default Complete_register_container;
