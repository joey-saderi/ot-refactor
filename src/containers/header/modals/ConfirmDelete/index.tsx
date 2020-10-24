import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "../../../../components/form/Button";
import modal_context from "../../../../context/Modal_context";
import { REQUEST_DELETE_CAR } from "../../../../API";
import jsCookie from "js-cookie";
import Router from "next/router";

let location_id = null;

const ConfirmDelete = (props: IConfirmDelete) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const Modal_context = useContext(modal_context);

  const deleteCarHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = jsCookie.get("token");
    try {
      const delete_res = await REQUEST_DELETE_CAR({ token, id: props.data.id });
      jsCookie.remove("new_car");
      Modal_context.modalHandler("SET");
      Router.reload();
    } catch (error) {
      setError({
        status: true,
        message: error,
      });
      console.log("!Error", error);
    }
  };

  return (
    <>
      <div className="modal_box_div">
        <form onSubmit={deleteCarHandler}>
          <p className="modal_content_confirm_delete">{`آیا می‌خواهید ماشین ${props.data.brand} ${props.data.model} را حذف کنید؟`}</p>
          {error.status ? (
            <span className="error_message">{error.message}</span>
          ) : null}
          <div className="button_container">
            <Button
              class="Blue_BTN "
              value="تایید"
              loading={loading}
              click={() => {}}
            />
            <Button
              class="Blue_BTN cancel_btn"
              value="انصراف"
              loading={false}
              click={() => {
                Modal_context.modalHandler("SET");
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

interface IConfirmDelete {
  data: { model: string; brand: string; id: string };
}

export default ConfirmDelete;
