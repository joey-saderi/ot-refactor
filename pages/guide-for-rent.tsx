import React from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import language from "../public/languages/fa/guideforrent.json";

const guideForRent = () => {
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
        <h2>{language.h2_1}</h2>
        <h3>{language.h3_1}</h3>
        <ul>
          <li>{language.h3_1_li_1}</li>
          <li>{language.h3_1_li_2}</li>
          <li>{language.h3_1_li_3}</li>
        </ul>
        <h3>{language.h3_2}</h3>
        <ul>
          <li>{language.h3_2_li_1}</li>
          <li>{language.h3_2_li_2}</li>
          <li>{language.h3_2_li_3}</li>
        </ul>
        <h3>{language.h3_3}</h3>
        <ul>
          <li>
            {language.h3_3_li_1_a_1}
            <Link href="/insurance-policies">
              <a href="">{language.h3_3_li_1_insurance}</a>
            </Link>
            {language.h3_3_li_1_a_2}
          </li>
          <li>{language.h3_3_li_2}</li>
          <li>{language.h3_3_li_3}</li>
          <li>{language.h3_3_li_4}</li>
        </ul>
        <h3>{language.h3_4}</h3>
        <ul>
          <li>{language.h3_4_li_1}</li>
          <li>{language.h3_4_li_2}</li>
          <li>{language.h3_4_li_3}</li>
          <li>{language.h3_4_li_4}</li>
        </ul>
        <h3>{language.h3_5}</h3>
        <ul>
          <li>{language.h3_5_li_1}</li>
          <li>{language.h3_5_li_2}</li>
          <li>{language.h3_5_li_3}</li>
        </ul>
        <h2>{language.h2_2}</h2>
        <h3>{language.h3_6}</h3>
        <ul>
          <li>{language.h3_6_li_1}</li>
          <li>{language.h3_6_li_2}</li>
          <li>{language.h3_6_li_3}</li>
          <li>{language.h3_6_li_4}</li>
          <li>{language.h3_6_li_5}</li>
          <li>{language.h3_6_li_6}</li>
          <li>{language.h3_6_li_7}</li>
          <li>{language.h3_6_li_8}</li>
        </ul>
        <h3>{language.h3_7}</h3>
        <ul>
          <li>{language.h3_7_li_1}</li>
          <li>{language.h3_7_li_2}</li>
          <li>{language.h3_7_li_3}</li>
          <li>{language.h3_7_li_4}</li>
          <li>{language.h3_7_li_5}</li>
        </ul>
        <h2>{language.h2_3}</h2>
        <h3>{language.h3_8}</h3>
        <ul>
          <li>{language.h3_8_li_1}</li>
          <li>{language.h3_8_li_2}</li>
          <li>{language.h3_8_li_3}</li>
          <li>{language.h3_8_li_4}</li>
          <li>{language.h3_8_li_5}</li>
        </ul>
        <h2>{language.h2_4}</h2>
        <h3>{language.h3_9}</h3>
        <ul>
          <li>{language.h3_9_li_1}</li>
          <li>{language.h3_9_li_2}</li>
          <li>{language.h3_9_li_3}</li>
          <li>{language.h3_9_li_4}</li>
          <li>{language.h3_9_li_5}</li>
        </ul>
        <h3>{language.h3_10}</h3>
        <ul>
          <li>{language.h3_10_li}</li>
        </ul>
      </section>
    </Layout>
  );
};

export default guideForRent;
