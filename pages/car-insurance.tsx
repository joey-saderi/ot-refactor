import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";
import language from "../public/languages/fa/carinsurance.json";
const car_insurance_page = () => {
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight">
        <h1>{language.h1}</h1>
        <h2>{language.h2}</h2>
        <p>{language.p_1}</p>
        <ul>
          <li>
            <strong>{language.string_1} </strong>
            {language.li_1}
          </li>
          <li>
            <strong>{language.string_2} </strong> {language.li_2}
          </li>
          <li>
            <strong>{language.string_3} </strong>
            {language.li_3}
          </li>
          <li>
            <strong>{language.li_4}</strong>
          </li>
          <li>
            <strong>{language.li_5}</strong>
          </li>
        </ul>
        <p> {language.li_6}</p>
      </article>
    </Layout>
  );
};

export default car_insurance_page;
