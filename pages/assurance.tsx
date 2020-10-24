import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";
import language from "../public/languages/fa/assurance.json";

const assurance = () => {
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
        <h1>{language.h3}</h1>
        <p>{language.p} </p>
        <ul>
          <li>{language.li_1}</li>
          <li>{language.li_2}</li>
          <li>{language.li_3}</li>
          <li>{language.li_4}</li>
          <li>{language.li_5}</li>
          <li>{language.li_6}</li>
        </ul>
      </article>
    </Layout>
  );
};

export default assurance;
