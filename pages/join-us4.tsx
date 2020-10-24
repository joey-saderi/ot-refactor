import React, { useEffect, useState } from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Calculator from "../src/components/calculator";
import Join_us_content from "../src/components/calculator/Join_us_content/AbTestContent";
import language from "../public/languages/fa/joinus.json";

const JoinUs1 = (props) => {
  const [Score, SetScore] = useState(null);
  useEffect(() => {
    if (props.BotScore) {
      SetScore(props.BotScore);
    }
  }, [props.BotScore]);
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
      <article className="join_us">
        <section className="banner">
          <h1>{language.h1}</h1>
          <h2>{language.h2} </h2>
          <div className="responsive calculator_container">
            {/* You can set the Button text when you call the Calculator component */}
            <Calculator
              language={language.calculator}
              AbText={language.calculator_text}
            />
          </div>
          <p className="temporary_score">{Score}</p>
        </section>
        <Join_us_content
          language={language.join_us_content}
          AbText={language.join_us_content_text}
        />
      </article>
    </Layout>
  );
};

export default JoinUs1;
