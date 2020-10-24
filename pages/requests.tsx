import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";
import Requests_page from "../src/containers/Requests_page";
import language from "../public/languages/fa/requestspage.json";

const Request = () => {
  return (
    <Layout>
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
      <Requests_page language={language.requests_page} />
    </Layout>
  );
};

export default Request;
