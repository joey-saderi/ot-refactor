import React from "react";
import Layout from "../src/Layout";
import Add_car from "../src/containers/Add_car";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/addcar.json";

const AddCar = () => {
  return (
    <Layout LinkControl={true}>
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
      <Add_car language={language} />
    </Layout>
  );
};

export default AddCar;
