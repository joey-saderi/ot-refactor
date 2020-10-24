import React from "react";
import Layout from "../src/Layout";
import Set_car_timing from "../src/containers/Set_car_timing";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/setcartimig.json";

const SetTimeAndPrice = () => {
  return (
    <Layout LinkControl={true}>
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
      <Set_car_timing language={language} />
    </Layout>
  );
};

export default SetTimeAndPrice;
