import React, { useContext } from "react";
import Link from "next/link";
import modal_context from "../../../context/Modal_context";
import jsCookie from "js-cookie";
import Router from "next/router";
import language from "../../../../public/languages/fa/header.json";

const Menu = () => {
  const MODAL_CONTEXT = useContext(modal_context);

  let complete_register = jsCookie.get("complete_register");
  let token = jsCookie.get("token");
  let img_profile = jsCookie.get("thumbnail_url");
  let company_name = jsCookie.get("company_name");
  let profile =
    company_name && company_name !== "null"
      ? company_name
      : jsCookie.get("user_name")
      ? `${jsCookie.get("user_name")}`
      : `${jsCookie.get("name")}`;
  let user_id = jsCookie.get("username")
    ? jsCookie.get("username")
    : jsCookie.get("user_id");

  return (
    <ul>
      {token ? (
        <li className="first_element_li">
          <Link href={`/user/[id]`} as={`/user/${user_id}`}>
            <a>
              <img
                className="profile_icon"
                // show user image or chow account icon
                src={
                  img_profile ||
                  "https://core.otoli.net/static/core/default_profile_pic.png"
                }
                alt={profile}
              />
              {profile}
              {localStorage["red_dot"] === "1" && <span className="red_dot" />}
            </a>
          </Link>
        </li>
      ) : (
        <li
          className="HEAP_Header_Btn_Login"
          onClick={() => {
            // set the 'login' model to appear
            MODAL_CONTEXT.modalHandler("Login");
          }}
        >
          <span>{language.li}</span>
        </li>
      )}
      {/* if the user had registered completely, can access to orders history */}
      {complete_register === "true" && (
        <li>
          <Link href="/requests">
            <a className="HEAP_Header_Link_MyOrders">{language.a_1}</a>
          </Link>
        </li>
      )}
      <li className="Drop_Down">
        <span>{language.a_2}</span>
        <ul className="Sub_Nav_Level_2">
          <li>
            <Link href="/otoli">
              <a>{language.a_3}</a>
            </Link>
          </li>
          <li>
            <Link href="/faq">
              <a>{language.a_4}</a>
            </Link>
          </li>
          <li>
            <Link href="/guide-for-rent">
              <a>{language.a_5}</a>
            </Link>
          </li>
          <li>
            <Link href="/guide-renter">
              <a>{language.a_6}</a>
            </Link>
          </li>
          <li>
            <Link href="/car-insurance">
              <a>{language.a_7}</a>
            </Link>
          </li>
          <li>
            <Link href="/assurance">
              <a>{language.a_8}</a>
            </Link>
          </li>
          <li>
            <Link href="/evaluation">
              <a>{language.a_9}</a>
            </Link>
          </li>
          <li>
            <Link href="/guide-picture">
              <a>{language.a_10}</a>
            </Link>
          </li>
          <li>
            <Link href="/gps">
              <a>{language.a_11}</a>
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Menu;
