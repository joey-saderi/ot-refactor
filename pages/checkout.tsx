import React from "react";
import Layout from "../src/Layout";
import Checkout_Container from "../src/containers/Checkout_Container";
import language from "../public/languages/fa/checkout.json";

const Checkout = () => {
  return (
    <Layout hide={true}>
      <Checkout_Container language = {language}/>
    </Layout>
  );
};

export default Checkout;
