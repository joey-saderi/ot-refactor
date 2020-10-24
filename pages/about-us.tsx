import React from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/aboutus.json";

const AboutUs = () => {
  return (
    <Layout showToTop={true}>
      <NextSeo
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
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <div className="AboutUsPage">
          <h1>{language.h1}</h1>
          <p>{language.p}</p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
