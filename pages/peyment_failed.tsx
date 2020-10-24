import React from "react";
import Layout from "../src/Layout";
import Router from "next/router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "../src/components/form/Button";
import "../src/styles/pages/Failed_payment.scss";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/paymentfaild.json";

const Failed_payment = () => {
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
      <article className="responsive minHeight failed_payment">
        <section className="alarm_container">
          <IoIosCloseCircleOutline size="10rem" color="a3678b" />
          <p>{language.cancel}</p>
        </section>
        <Button
          class="Blue_BTN local_style"
          click={() => Router.push("/")}
          value={language.main_page}
          loading={false}
        />
      </article>
    </Layout>
  );
};

export default Failed_payment;
