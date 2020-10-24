import React, { useEffect, useState } from "react";
// import "./profile_info.scss";
import Edit_profile from "./Edit_profile";
import { FiLogOut } from "react-icons/fi";
import Button from "../../../components/form/Button";
import Router from "next/router";
import jsCookie from "js-cookie";

const Profile_info = ({ is_mine, data, language }: IProfile_info) => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [company_name, setCompany_name] = useState(null);
  const [edit, setEdit] = useState(false);
  const [user_info, setUser_info] = useState(null);
  const [triggerUpload, setTriggerUpload] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCompany_name(data.company_name);
      setImage(data.thumbnail_url);
      setUser_info(data);
    }
  }, [data]);

  const Exit = () => {
    jsCookie.remove("first_name");
    jsCookie.remove("last_name");
    jsCookie.remove("company_name");
    jsCookie.remove("complete_register");
    jsCookie.remove("phone");
    jsCookie.remove("thumbnail_url");
    jsCookie.remove("token");
    jsCookie.remove("user_id");
    jsCookie.remove("name");
    jsCookie.remove("user_name");
    jsCookie.remove("username");
    jsCookie.remove("new_car");
    jsCookie.remove("car_info");
    localStorage.removeItem("red_dot");
    localStorage.removeItem("incompleteInfo");
    localStorage.removeItem("halfcompletecar");
    Router.push("/");
  };

  return (
    <article className="Profile_info_container">
      {name ? (
        !edit ? (
          <>
            <div className="user_information">
              <img
                src={image}
                alt={name}
                onClick={() => {
                  if (is_mine) {
                    setEdit(true), setTriggerUpload(true);
                  }
                }}
              />
              <div>
                <h3>{company_name ? company_name : name}</h3>
                {is_mine && (
                  <p onClick={() => setEdit(true)}>
                    {language.edit_the_profile_info}
                  </p>
                )}
              </div>
            </div>
            {is_mine && (
              <div className="profile_controls">
                <div className="Exit" onClick={Exit}>
                  <FiLogOut size="2rem" color="#4ba3ce" />
                  <p>{language.exit}</p>
                </div>
                <Button
                  value={language.add}
                  class="Blue_BTN HEAP_Profile_Btn_AddCar"
                  click={() => {
                    Router.push("/add-car");
                  }}
                  loading={false}
                />
              </div>
            )}
          </>
        ) : (
          <Edit_profile
            language={language.edit_profile}
            data={user_info}
            triggerUpload={triggerUpload}
            setEdit={(reload) => {
              setEdit(!edit);
              setTriggerUpload(false);
              if (reload) {
                Router.reload();
              }
            }}
          />
        )
      ) : null}
    </article>
  );
};

interface IProfile_info {
  is_mine: boolean;
  data: any;
  language: any;
}

export default Profile_info;
