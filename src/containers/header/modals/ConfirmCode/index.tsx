import React, { useState, useContext } from "react";
import TextInput from "../../../../components/form/TextInput";
import cell_Phone_context from "../../../../context/Cell_Phone_context";
import modal_context from "../../../../context/Modal_context";
import Auth_context from "../../../../context/Auth_context";
import axios from "axios";
import Router from "next/router";
import jsCookie from "js-cookie";
import Button from "../../../../components/form/Button";
import CountDown from "../../../../components/countDown";
import NumberSeparatedTextInput from "../../../../components/form/NumberSeparatedTextInput";

const ConfirmCode = ({
  panelController,
  language,
  customModalControl,
}: IConfirmCode) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [ActiveAgain, setActiveAgain] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const Cell_Phone_context = useContext(cell_Phone_context);
  const Modal_context = useContext(modal_context);
  const AUTH_CONTEXT = useContext(Auth_context);

  const sendConfirmCode = (e) => {
    e.preventDefault();
    if (!code) {
      return;
    }
    setLoading(true);
    const DOMAIN = process.env.PRODUCTION_ENDPOINT;
    const SEND_CONFIRM_CODE = "/core/device/login";
    let cellNumber = Cell_Phone_context.cell_phone;
    if (/^[9][0-9][0-9]{8,8}$/.test(cellNumber)) {
      cellNumber = "0" + Cell_Phone_context.cell_phone;
    }
    axios
      .post(DOMAIN + SEND_CONFIRM_CODE, {
        cell: cellNumber,
        code: code,
      })
      .then((response) => {
        setLoading(false);
        const cook_option = {
          expires: 100,
        };
        // If the user hasn't completed the registration
        if (response.data.token && !response.data.has_name) {
          const data = response.data;

          // save data in cache
          jsCookie.set("token", data.token, cook_option);
          jsCookie.set("phone", data.user_profile.cell, cook_option);
          jsCookie.set("complete_register", data.has_name, cook_option);
          jsCookie.set("name", " ", cook_option);
          jsCookie.set("user_id", data.user_profile.id, cook_option);

          // NOTE: save data in cache and active heap
          try {
            if (window["heap"]) {
              window["heap"].identify(`${data.user_profile.cell}`);
            }
          } catch (e) {
            console.log("Em...I think heap not work correctly :/");
          }
          Router.push({
            pathname: "/complete-register",
          });
        }
        // if user completely registered
        else if (response.data.token && response.data.has_name) {
          const data = response.data;
          jsCookie.set("token", data.token, cook_option);
          jsCookie.set("phone", data.user_profile.cell, cook_option);
          jsCookie.set("complete_register", data.has_name, cook_option);
          jsCookie.set("name", data.user_profile.name, cook_option);
          jsCookie.set(
            "company_name",
            data.user_profile.company_name,
            cook_option
          );
          if (data.user_profile.username) {
            jsCookie.set("username", data.user_profile.username, cook_option);
          }
          jsCookie.set("user_id", data.user_profile.id, cook_option);
          jsCookie.set(
            "thumbnail_url",
            data.user_profile.thumbnail_url
              ? data.user_profile.thumbnail_url
              : "https://core.otoli.net/static/core/default_profile_pic.png",
            cook_option
          );
          // NOTE: activate heap
          try {
            if (window["heap"]) {
              window["heap"].identify(`${Cell_Phone_context.cell_phone}`);
              window["heap"].addUserProperties({
                Name: `${data.user_profile.first_name}-${data.user_profile.last_name}`,
              });
            }
          } catch (e) {
            console.log("Em...I think heap not work correctly :/");
          }
          // set authorize to auth context
          AUTH_CONTEXT.Auth_Manager(true);
        } else {
          // TODO: handle errors
          console.error("error");
        }
        if (!customModalControl) {
          Modal_context.modalHandler("SET");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "!Error",
          error.response ? error.response.data.message : error.message
        );
        setError({
          status: true,
          message: error.response.data.message,
        });
      });
  };

  // The user can switch to last step
  const Done = () => {
    setActiveAgain(true);
  };

  const clearField = () => {
    setCode("");
  };

  return (
    <div className="modal_box_div confirm_code">
      <form onSubmit={sendConfirmCode}>
        <NumberSeparatedTextInput
          error={error}
          name="code"
          onChangeHandler={(e) => {
            setCode(e);
          }}
          value={code}
          label={language.text_input_label}
          validation={{
            number: true,
            length: 4,
            messages: {
              required: language.require,
              length: language.length,
            },
            required: true,
          }}
        />

        {/* <TextInput
          error={error}
          name="code"
          onChangeHandler={(e) => {
            setCode(e);
          }}
          autoFocus={true}
          value={code}
          // min={4}
          // max={4}
          label={language.text_input_label}
          placeholder={language.place_holder}
          clearField={clearField}
          validation={{
            number: true,
            length: 4,
            messages: {
              required: language.require,
              length: language.length,
            },
            required: true,
          }}
        /> */}
        {/* <span className="error_message">{error.message}</span> */}
        <div className="go_back">
          {ActiveAgain ? (
            <p onClick={() => panelController()} className="send_again">
              {language.send_again}
            </p>
          ) : (
            <div className="Count_Down_text">
              <span>{language.send_again}</span>{" "}
              <CountDown time={20} Done={Done} />{" "}
              <span>{language.seconds}</span>
            </div>
          )}
        </div>
        <div className="go_back" onClick={() => panelController()}>
          <p className="Edit_number">{language.edit_the_number}</p>
        </div>
        <Button
          class="Blue_BTN login_submit HEAP_ModalConfirmCode_Btn_Login"
          value={language.enter}
          loading={loading}
          click={() => {}}
        />
      </form>
    </div>
  );
};

interface IConfirmCode {
  panelController: any;
  language: any;
  customModalControl?: boolean;
}
export default ConfirmCode;
