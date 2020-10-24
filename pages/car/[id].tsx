import React from "react";
import Layout from "../../src/Layout";
import CarPage from "../../src/containers/car/carpage";
import { NextSeo } from "next-seo";
import language from "../../public/languages/fa/carpage.json";

const Car = () => {
  return (
    <Layout>
      <NextSeo
        noindex={true}
      />
      <CarPage language={language}/>
    </Layout>
  );
};
export default Car;
