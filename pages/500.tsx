import React from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import _500 from "../public/image/500.png";
import language from "../public/languages/fa/_500.json";

const page_500 = () => {
  return (
    <Layout>
      <NextSeo
        title={language.title}
        description={language.description}
        openGraph={{
          title: language.title,
          description: language.description,
        }}
        twitter={{
          handle: language.handle,
          site: language.site,
          cardType: language.cardType,
        }}
      />
      <article className="minHeight _500container">
        <img src={_500} alt="500" className="_404PageImage" />
        <span>{language.span}</span>
        <p>{language.p_1}</p>
        <p>
          {language.dial} <a href={`tel:${language.call}`}>{language.call}</a>
        </p>
        <Link href="/">
          <a className="_404PageAnchor Blue_BTN">{language.return}</a>
        </Link>
      </article>
    </Layout>
  );
};

export default page_500;
