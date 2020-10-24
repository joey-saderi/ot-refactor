import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";

import Layout from "../../src/Layout";
import Search from "../../src/containers/Search";
import insurance from "../../public/image/SamanInsurance.png";
// import "../../src/styles/pages/index.scss";
import Link from "next/link";
import TabCreator from "../../src/components/TabCreator";
import { REQUEST_GET_LANDING_PAGE } from "../../src/API";

import language from "../../public/languages/fa/rent.json";

const Rent = () => {
  const [dynamicLinks, setDynamicLinks] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const landing_res: any = await REQUEST_GET_LANDING_PAGE({
      name: "rent",
    });
    setDynamicLinks(landing_res.data.link_set);
  };

  return (
    <Layout>
      <NextSeo
        canonical="https://otoli.net/rent"
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
          site_name: language.next_seo.site_name,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <article className="Homepage">
        <div className="banner">
          <h1>{language.banner_h1}</h1>
          <h2>{language.banner_h2}</h2>
          <div className="search_container responsive">
            <Search language={language} />
          </div>
        </div>
        <div className="insuranceBox">
          <p>{language.insuranceBox_p}</p>
          <img src={insurance} alt="تصویر بیمه سامان" />
        </div>
        <div className=" responsive second_container">
          <div className="full_width">
            <h2>{language.second_container_full_width_h2}</h2>
            <p>{language.second_container_full_width_p}</p>
          </div>
          <h2>{language.second_container_h2_2}</h2>
          <div className="three_columns">
            <section>
              <h3>{language.second_container_three_columns_2_h3_1}</h3>
              <p>{language.second_container_three_columns_2_p_1}</p>
            </section>
            <section>
              <h3>{language.second_container_three_columns_2_h3_2}</h3>
              <p>{language.second_container_three_columns_2_p_2}</p>
            </section>
            <section>
              <h3>{language.second_container_three_columns_2_h3_3}</h3>
              <p>{language.second_container_three_columns_2_p_3}</p>
            </section>
          </div>
          <h2>{language.second_container_h2_1}</h2>
          <div className="three_columns">
            <section>
              <h3>{language.second_container_three_columns_h3_1}</h3>
              <p>{language.second_container_three_columns_p_1}</p>
            </section>
            <section>
              <h3>{language.second_container_three_columns_h3_2}</h3>
              <p>{language.second_container_three_columns_p_2}</p>
            </section>
            <section>
              <h3>{language.second_container_three_columns_h3_3}</h3>
              <p>{language.second_container_three_columns_p_3} </p>
            </section>
          </div>
          <div className="add_car_section">
            <Link href="/add-car">
              <a className="Blue_BTN add_car_custom">
                {language.second_container_add_car_section_a_1}
              </a>
            </Link>
            <Link href="/join-us">
              <a>{language.second_container_add_car_section_a_2}</a>
            </Link>
          </div>
          <div className="rent_contnet">
            <h2>{language.rent_content_h2}</h2>
            <p>{language.rent_content_p_1}</p>
            <p>{language.rent_content_p_2}</p>
            <p>{language.rent_content_p_3}</p>
            <p>
              <strong>{language.rent_content_p_4}</strong>
            </p>
            <p>{language.rent_content_p_5}</p>
            <p>{language.rent_content_p_6}</p>
            <p>{language.rent_content_p_7}</p>
            <p>{language.rent_content_p_8}</p>
            <p>{language.rent_content_p_9}</p>
            <p>{language.rent_content_p_10}</p>
          </div>
          {/* Creating tab menu */}
          {/* <TabCreator data_arr={data} /> */}
        </div>
        <section className="responsive third_container">
          {dynamicLinks ? (
            <div className="RentPage_Dynamic_links">
              <ul>
                {dynamicLinks.map((item) => {
                  return (
                    <li key={item.name}>
                      <a href={item.url}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </section>
      </article>
    </Layout>
  );
};

export default Rent;
