import React, { useState, useEffect, useContext } from "react";
import TextInput from "../../../../components/form/TextInput";
import axios from "axios";
import cell_Phone_context from "../../../../context/Cell_Phone_context";
// import "./userCellphone.scss";
import Button from "../../../../components/form/Button";
import Router from "next/router";

const GetUserCellPhone = ({
  panelController,
  showCaption,
  language,
}: IGetUserCellPhone) => {
  const [cellPhone, setCellPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const Cell_Phone_context = useContext(cell_Phone_context);

  useEffect(() => {
    if (window["ga"]) {
      window["ga"]("send", {
        hitType: "pageview",
        page: "/log-in-modal",
      });
    }
  }, []);

  const sendConfirmCode = (e) => {
    e.preventDefault();
    if (!cellPhone) {
      return;
    }
    localStorage["last_location"] = Router.router.asPath;
    setLoading(true);
    const DOMAIN = process.env.PRODUCTION_ENDPOINT;
    const SEND_CONFIRM_CODE = "/core/device/send-code";
    let CellNumber = cellPhone;
    if (/^[9][0-9][0-9]{8,8}$/.test(cellPhone)) {
      CellNumber = "0" + cellPhone;
    }
    // NOTE the utm data will be sent to API at this point
    axios
      .post(DOMAIN + SEND_CONFIRM_CODE, {
        cell: CellNumber,
        utm_source: localStorage["utm_source"]
          ? localStorage["utm_source"]
          : "",
        utm_medium: localStorage["utm_medium"]
          ? localStorage["utm_medium"]
          : "",
        utm_campaign: localStorage["utm_campaign"]
          ? localStorage["utm_campaign"]
          : "",
        utm_term: localStorage["utm_term"] ? localStorage["utm_term"] : "",
        utm_content: localStorage["utm_content"]
          ? localStorage["utm_content"]
          : "",
        utm_landing_url: localStorage["utm_landing_url"]
          ? localStorage["utm_landing_url"]
          : "",
      })
      .then((response) => {
        if (response.data.success) {
          // save cell phone to cell phone context
          Cell_Phone_context.cell_phone = cellPhone;
          console.log(response.data);
          setLoading(false);
          panelController();
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

  const clearField = () => {
    setCellPhone("");
  };

  return (
    <>
      <div className="modal_box_div">
        {showCaption ? (
          <h2 className="optional_caption">{language.log_sigh}</h2>
        ) : null}
        <form onSubmit={sendConfirmCode}>
          <TextInput
            type="number"
            error={error}
            name="cell Phone"
            onChangeHandler={(e) => {
              if (error.status) {
                setError({
                  status: false,
                  message: "",
                });
              }
              setCellPhone(e);
            }}
            autoFocus={false}
            localeString={false}
            HideClearIcon={true}
            value={cellPhone}
            // min={11}
            // max={11}
            label={language.cell_phone}
            placeholder={language.example}
            clearField={clearField}
            validation={{
              number: true,
              LengthControl: {
                minLen: 10,
                maxLen: 11,
              },
              messages: {
                required: language.error_1,
                length: language.error_2,
                minLen: language.error_3,
                maxLen: language.error_4,
              },
              required: true,
            }}
          />
          {/* show an error message */}
          {/* <span className="error_message">{error.message}</span> */}
          <Button
            class="Blue_BTN login_submit HEAP_ModalGetUserCellPhone_Btn_RequestForConfirmCode"
            value={language.send}
            loading={loading}
            click={() => {}}
          />
        </form>
      </div>
    </>
  );
};

interface IGetUserCellPhone {
  panelController: any;
  showCaption?: boolean;
  language: any;
}

export default GetUserCellPhone;
