import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import language from "../../../public/languages/fa/footer.json";

// import "./footer.scss";
import {
  IoIosArrowDropup,
  IoLogoTwitter,
  IoLogoInstagram,
} from "react-icons/io";
import { FaTelegram } from "react-icons/fa";

const Footer = (props: IFooter) => {
  const [hide, setHide] = useState(false);
  const [activeToTop, setActiveToTop] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // Because the layout render once you should track the hide props for change
  useEffect(() => {
    if (props.hide) setHide(true);
  }, [props.hide]);

  // Because the layout render once you should track the hide props for change
  useEffect(() => {
    if (props.showToTop) setActiveToTop(true);
  }, [props.hide]);

  // Add an event listener on scroll to show the "Go To Top" button
  useEffect(() => {
    document.addEventListener("scroll", scrollCheck);
    return () => {
      document.removeEventListener("scroll", scrollCheck);
    };
  }, []);

  const scrollCheck = () => {
    /**
     * window.@scroll
     *  if it's bigger than 400px "GoToTop" will shown
     */
    if (window.scrollY > 400) {
      setShowTop(true);
    } else {
      setShowTop(false);
    }
  };

  // GoToTop functionality
  const toTop = () => {
    scrollTo(0, 0);
  };

  return (
    <footer data-test-id="footer" className={hide ? "hide_footer" : null}>
      {activeToTop ? (
        <div
          className={["toTop", showTop ? "showTop" : null].join(" ")}
          onClick={toTop}
        >
          <IoIosArrowDropup size="4rem" color="#4ba3ce" />
        </div>
      ) : null}
      <div className=" responsive plus_border">
        <ul className="links">
          <li>
            <Link href="/about-us">
              <a>{language.about_us}</a>
            </Link>
          </li>
          <li>
            <Link href="/otoli">
              <a>{language.otoli}</a>
            </Link>
          </li>
          {props.LinkControl ? (
            <li>
              <Link href="/guide-renter">
                <a>{language.guide_renter}</a>
              </Link>
            </li>
          ) : null}
          {props.LinkControl ? (
            <li>
              <Link href="/evaluation">
                <a>{language.evaluation}</a>
              </Link>
            </li>
          ) : null}
          <li>
            <Link href="/faq">
              <a>{language.faq}</a>
            </Link>
          </li>
          <li>
            <Link href="/our-policies">
              <a>{language.our_policies}</a>
            </Link>
          </li>
          <li>
            <Link href="/insurance-policies">
              <a>{language.insurance_policies}</a>
            </Link>
          </li>
          {props.LinkControl ? null : (
            <li>
              <Link href="/rent">
                <a>{language.rent}</a>
              </Link>
            </li>
          )}
          {props.LinkControl ? null : (
            <li>
              <Link href="/site-map">
                <a>{language.site_map}</a>
              </Link>
            </li>
          )}
        </ul>

        <div className="social_container_footer">
          <h3>{language.social_container_footer_h3}</h3>
          <div>
            <a target="_black" href="https://www.instagram.com/otoli_net/">
              <IoLogoInstagram size="3rem" color="#4ba3ce" />
            </a>
            <a target="_black" href="https://twitter.com/otoli_net">
              <IoLogoTwitter size="3rem" color="#4ba3ce" />
            </a>
            <a target="_black" href="https://t.me/otoli_net">
              <FaTelegram size="3rem" color="#4ba3ce" />
            </a>
          </div>
          <p>
            {" "}
            {language.social_container_footer_p}
            <a href="tel:02188567759" className="HEAP_Footer_Link_Phone">
              {language.social_container_footer_a_1}
            </a>
            ,
            <a href="tel:09391414574" className="HEAP_Footer_Link_Phone">
              {language.social_container_footer_a_2}
            </a>
          </p>
        </div>
      </div>
      <div className="signature">
        <span className="ver">2.0.0</span>
        <p>{language.signature}</p>
      </div>
    </footer>
  );
};
interface IFooter {
  // true === Hide -> the footer on the page
  hide?: boolean;
  showToTop?: boolean;
  LinkControl?: boolean;
}
export default Footer;
