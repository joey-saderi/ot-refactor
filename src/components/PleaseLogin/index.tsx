import React, { useContext, useEffect, useState } from "react";
// import "./please_login.scss";
// import Modal_context from "../../context/Modal_context";
// import { FiLogIn } from "react-icons/fi";
import GetUserCellPhone from "../../containers/header/modals/GetUserCellPhone";
import ConfirmCode from "../../containers/header/modals/ConfirmCode";

const PleaseLogin = ({ language }: IPleaseLogin) => {
  const [change, setChange] = useState(false);
  // const MODAL_CONTEXT = useContext(Modal_context);
  const panelController = () => {
    setChange(!change);
  };

  return (
    <div className="Please_login_container minHeight">
      {/* {!change ? (
        <div className="caption">
          <FiLogIn color="#4ba3ce" size="3rem" />
          <p>برای دسترسی به این بخش، ابتدا وارد شوید.</p>
        </div>
      ) : null} */}
      <div className="modal_box">
        {change ? (
          <ConfirmCode
            language={language.ConfirmCode}
            panelController={panelController}
            customModalControl={true}
          />
        ) : (
          <GetUserCellPhone
            language={language.GetUserCellPhone}
            showCaption={true}
            data-test-id="GetUserCellPhone"
            panelController={panelController}
          />
        )}
      </div>
    </div>
  );
};

interface IPleaseLogin {
  language: any;
}
export default PleaseLogin;
