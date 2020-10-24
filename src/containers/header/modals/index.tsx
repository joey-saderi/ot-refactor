import React, { useContext, useState } from "react";
import GetUserCellPhone from "./GetUserCellPhone";
import ConfirmCode from "./ConfirmCode";
import modal_context from "../../../context/Modal_context";
import { IoMdClose, IoMdPerson } from "react-icons/io";
import TellMe from "./Tell_me";
import Renter from "./Renter";
import Owner from "./Owner";
import Law from "./Law";
import Assurance from "./Assurance";
import ConfirmDelete from "./ConfirmDelete";
import language from "../../../../public/languages/fa/modals.json";
const Modals = (props) => {
  const [change, setChange] = useState(false);
  const Modal_context = useContext(modal_context);

  const panelController = () => {
    setChange(!change);
  };

  return (
    <div className="Modal">
      <div
        data-test-id="Container_class"
        className={[
          "modal_box",
          // custom classes for different modals
          props.modal_type === "Login"
            ? change
              ? "confirm_modal"
              : "login_modal"
            : props.modal_type === "TellMe"
            ? "Tell_me"
            : props.modal_type === "Renter"
            ? "Renter"
            : props.modal_type === "Owner"
            ? "Owner"
            : props.modal_type === "Law"
            ? "Law"
            : props.modal_type === "Assurance"
            ? "Assurance"
            : null,
        ].join(" ")}
      >
        {/* close Icon */}
        <div className="modal_box_div">
          {props.modal_type === "Login" ? (
            <div className="login_modal_title">
              <IoMdPerson
                size="2rem"
                color="#fff"
                className="login_person_icon"
              />
              <h2>{language.title}</h2>
            </div>
          ) : (
            <IoMdClose
              className="close_btn"
              color="rgb(165, 165, 165)"
              size="2rem"
              onClick={() => Modal_context.modalHandler()}
            />
          )}
        </div>
        {/* model section */}
        {props.modal_type === "Login" ? (
          // switch between get cell phone and enter confirm code
          change ? (
            <ConfirmCode
              language={language.ConfirmCode}
              panelController={panelController}
            />
          ) : (
            <GetUserCellPhone
              language={language.GetUserCellPhone}
              data-test-id="GetUserCellPhone"
              panelController={panelController}
            />
          )
        ) : props.modal_type === "TellMe" ? (
          <TellMe data-test-id="TellMe" />
        ) : props.modal_type === "Renter" ? (
          <Renter data-test-id="Renter" data={props.data} />
        ) : props.modal_type === "Owner" ? (
          <Owner data-test-id="Owner" data={props.data} />
        ) : props.modal_type === "Law" ? (
          <Law data-test-id="Law" />
        ) : props.modal_type === "ConfirmDelete" ? (
          <ConfirmDelete data-test-id="ConfirmDelete" data={props.data} />
        ) : props.modal_type === "Assurance" ? (
          <Assurance data-test-id="Assurance" />
        ) : null}
      </div>
      <div className="back_draw" onClick={() => Modal_context.modalHandler()} />
    </div>
  );
};

export default Modals;
