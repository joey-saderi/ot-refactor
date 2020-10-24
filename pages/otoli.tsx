import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";
import "../src/styles/pages/otoli.scss";
import language from "../public/languages/fa/otoli.json";

const AboutUs = () => {
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
      <section className="responsive static_pages minHeight OTILI">
        <h1>{language.h1}</h1>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <h2 className="diff_color">{language.h2_1}</h2>
            <div>
              <h3>{language.h3_1}</h3>
              <p>{language.p_1}</p>
            </div>
            <div>
              <h3>{language.h3_2}</h3>
              <p>{language.p_2}</p>
            </div>
            <div>
              <h3>{language.h3_3}</h3>
              <p>{language.p_3}</p>
            </div>
            <div>
              <h3>{language.h3_4}</h3>
              <p>{language.p_4}</p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <h2>{language.h2_2}</h2>
            <div>
              <h3>{language.h3_5}</h3>
              <p>{language.p_5}</p>
            </div>
            <div>
              <h3>{language.h3_6}</h3>
              <p>{language.p_6}</p>
            </div>
            <div>
              <h3>{language.h3_7}</h3>
              <p>{language.p_7}</p>
            </div>
          </div>
        </div>
        <h2 className="OTOLI_MIDDLE_Dif">{language.h2_3}</h2>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <div>
              <h3>{language.h3_8}</h3>
              <p>{language.p_8}</p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <div>
              <h3>{language.h3_9}</h3>
              <p>{language.p_9}</p>
            </div>
          </div>
        </div>
        <h2 className="OTOLI_MIDDLE_Dif">{language.h2_4}</h2>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <div>
              <h3>{language.h3_10}</h3>
              <p>{language.p_10}</p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <div>
              <h3>{language.h3_11}</h3>
              <p>{language.p_11}</p>
            </div>
            <div>
              <h3>{language.h3_12}</h3>
              <p>{language.p_12}</p>
            </div>
          </div>
        </div>
        <h2 className="OTOLI_MIDDLE_Dif">{language.h2_5}</h2>
        <div className="PartOne_OTOLI">
          <div className="partOne_OTOLI_D1 D1_Left">
            <div>
              <h3>{language.h3_13}</h3>
              <p>{language.p_13}</p>
            </div>
          </div>
          <div className="partOne_OTOLI_D1 D1_Right">
            <div>
              <h3>{language.h3_14}</h3>
              <p>{language.p_14}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
