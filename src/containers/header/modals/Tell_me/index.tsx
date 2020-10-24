import React, { useState, useEffect, useContext } from "react";
import TextInput from "../../../../components/form/TextInput";
import axios from "axios";
// import "./Tell_me.scss";
import Button from "../../../../components/form/Button";
import modal_context from "../../../../context/Modal_context";

let location_id = null;

const TellMe = () => {
  const [cellPhone, setCellPhone] = useState("");
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const Modal_context = useContext(modal_context);

  const sendCellPhonenumber = (e) => {
    e.preventDefault();
    // validation
    if (cellPhone.length < 11) {
      setError({
        status: true,
        message: "شماره باید 11 رقم باشد.",
      });
      return;
    }
    setLoading(true);

    const DOMAIN = process.env.PRODUCTION_ENDPOINT;
    const SEND_CONFIRM_CODE = "/core/service-request/new";
    axios
      .post(DOMAIN + SEND_CONFIRM_CODE, {
        cell: cellPhone,
        location_id: location_id,
      })
      .then((response) => {
        if (response.data.success) {
          Modal_context.modalHandler("SET");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "!Error",
          error.response ? error.response.data.message : error.message
        );
        if (error.response) {
          if (error.response.data) {
            setError({
              status: true,
              message: error.response.data.message,
            });
          }
        }
      });
  };

  const clearField = () => {
    setCellPhone("");
  };

  useEffect(() => {
    const Location = JSON.parse(localStorage["User_Location"]);
    location_id = Location.value;
    setLocationName(Location.text);
    return () => {
      location_id = null;
    };
  }, []);

  return (
    <>
      <div className="modal_box_div">
        <form onSubmit={sendCellPhonenumber}>
          <p className="p1">
            اتولی در حال حاضر فقط اجاره‌های با مبدا تهران را پوشش می‌دهد.
          </p>
          {/* <p className="p2"></p> */}
          <TextInput
            error={{ status: error.status, message: error.message }}
            name="cell Phone"
            onChangeHandler={(e) => {
              setCellPhone(e);
            }}
            value={cellPhone}
            min={11}
            max={11}
            autoFocus={false}
            LabelColor="#737373"
            label="شماره همراهتان را وارد کنید"
            placeholder="شماره تلفن همراه"
            clearField={clearField}
            validation={{
              required: true,
              messages: {
                required: "لطفا تلفن همراه را وارد کنید",
              },
            }}
          />
          {/* show error message */}
          {/* <span className="error_message">{error.message}</span> */}
          <p className="p3">{`وقتی در ${locationName} فعال شدیم خبرتان می‌کنیم.`}</p>
          <Button
            class="Blue_BTN login_submit HEAP_ModalInformMeMyCity_Btn_Submit"
            value="ارسال کد ورود"
            loading={loading}
            click={() => {}}
          />
        </form>
      </div>
    </>
  );
};

export default TellMe;
