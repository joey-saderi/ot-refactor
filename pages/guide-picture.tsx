import React from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/guidepicture.json";

const guidePicture = () => {
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
      <section className="responsive static_pages minHeight">
        <h1>{language.h1}</h1>
        <p>{language.p}</p>
        <h2>{language.h2_1}</h2>
        <ul>
          <li>{language.li_1}</li>
          <li>{language.li_2}</li>
          <li>{language.li_3}</li>
          <li>{language.li_4}</li>
          <li>{language.li_5}</li>
          <li>{language.li_6}</li>
          <li>{language.li_7}</li>
          <li>{language.li_8}</li>
        </ul>
        <h2>{language.h2_2}</h2>
        <ul>
          <li>{language.li_9}</li>
          <li>{language.li_10}</li>
          <li>{language.li_11}</li>
          <li>{language.li_12}</li>
          <li>{language.li_13}</li>
          <li>{language.li_14}</li>
          <li>{language.li_15}</li>
        </ul>
      </section>
    </Layout>
  );
};

export default guidePicture;
