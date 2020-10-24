import React from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/insurancepolicies.json";

const InsurancePolicies = () => {
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
      <section className="responsive static_pages minHeight">
        <h1>{language.h1}</h1>
        <p>{language.p_1}</p>
        <p>
          <strong>
            <u>{language.p_2}</u>
          </strong>
        </p>
        <h2>
          <u>{language.h2_1}</u>
        </h2>
        <p>{language.p_3}</p>
        <ul>
          <li>{language.p_3_ul_li_1}</li>
          <li>{language.p_3_ul_li_2}</li>
          <li>{language.p_3_ul_li_3}</li>
          <li>{language.p_3_ul_li_4}</li>
          <li>{language.p_3_ul_li_5}</li>
        </ul>
        <h2>{language.h2_2}</h2>
        <p>{language.p_4}</p>
        <p>
          <strong>{language.p_5_strong} </strong>
          {language.p_5}
        </p>
        <p>
          <strong>{language.p_6_strong} </strong>
          {language.p_6}
        </p>
        <p>
          <strong>{language.p_7_strong} </strong>
          {language.p_7}
        </p>
        <p>
          <strong>{language.p_8_strong} </strong>
          {language.p_8}
        </p>
        <p>
          <strong>{language.p_9_strong} </strong>
          {language.p_9}
        </p>
        <p>
          <strong>{language.p_10_strong} </strong>
          {language.p_10}
        </p>
        <p>
          <strong>{language.p_11_strong} </strong>
          {language.p_11}
        </p>
        <h2>
          <u>{language.h2_3}</u>
        </h2>
        <h3>{language.h2_3_h3_1}</h3>
        <p>{language.p_12}</p>
        <ul>
          <li>{language.p_12_ul_li_1}</li>
          <li>{language.p_12_ul_li_2}</li>
          <li>{language.p_12_ul_li_3}</li>
          <li>{language.p_12_ul_li_4}</li>
          <li>{language.p_12_ul_li_5}</li>
        </ul>
        <h3>{language.h2_3_h3_2}</h3>
        <p>{language.p_13}</p>
        <h2>
          <u>{language.h2_4}</u>
        </h2>
        <h3>{language.h2_4_h3_1}</h3>
        <p>{language.p_14}</p>
        <ul>
          <li>{language.p_14_ul_li_1}</li>
          <li>{language.p_14_ul_li_2}</li>
          <li>{language.p_14_ul_li_3}</li>
          <li>{language.p_14_ul_li_4}</li>
          <li>{language.p_14_ul_li_5}</li>
          <li>{language.p_14_ul_li_6}</li>
        </ul>
        <h3>{language.h2_4_h3_2}</h3>
        <p>{language.p_15}</p>
        <ul>
          <li>{language.p_15_ul_li_1}</li>
          <li>{language.p_15_ul_li_2}</li>
          <li>{language.p_15_ul_li_3}</li>
          <li>{language.p_15_ul_li_4}</li>
          <li>{language.p_15_ul_li_5}</li>
          <li>{language.p_15_ul_li_6}</li>
          <li>{language.p_15_ul_li_7}</li>
          <li>{language.p_15_ul_li_8}</li>
          <li>{language.p_15_ul_li_9}</li>
        </ul>
        <h2>
          <u>{language.h2_5}</u>
        </h2>
        <h3>{language.h2_5_h3_1}</h3>
        <p>{language.p_16}</p>
        <h3>{language.h2_5_h3_2}</h3>
        <p>{language.p_17}</p>
        <h3>{language.h2_5_h3_3}</h3>
        <p>{language.p_18}</p>
        <h2>{language.h2_6}</h2>
        <p>{language.p_19}</p>
        <h2>{language.h2_7}</h2>
        <p>{language.p_20}</p>
        <h2>{language.h2_8}</h2>
        <p>{language.p_21}</p>
        <h2>
          <u>{language.h2_9}</u>
        </h2>
        <h3>{language.h2_9_h3_1}</h3>
        <p>{language.p_22}</p>
        <h4>{language.h2_9_h4_1}</h4>
        <ul>
          <li>{language.h2_9_h4_1_li_1}</li>
          <li>{language.h2_9_h4_1_li_2}</li>
          <li>{language.h2_9_h4_1_li_3}</li>
        </ul>
        <h4>{language.h2_9_h4_2}</h4>
        <ul>
          <li>{language.h2_9_h4_2_li_1}</li>
          <li>{language.h2_9_h4_2_li_2}</li>
        </ul>
        <h4>{language.h2_9_h4_3}</h4>
        <p>{language.p_23}</p>
        <h2>{language.h2_10}</h2>
        <h3>{language.h2_10_h3_1}</h3>
        <p>{language.p_24}</p>
        <h3>{language.h2_10_h3_2}</h3>
        <p>{language.p_25}</p>
        <p>
          <strong>{language.p_26_strong} </strong>
          {language.p_26}
        </p>
        <p>
          <strong>{language.p_27_strong} </strong>
          {language.p_27}
        </p>
        <p>
          <strong>{language.p_28_strong} </strong>
          {language.p_28}
        </p>
        <p>
          <strong>{language.p_29_strong} </strong>
          {language.p_29}
        </p>
        <h3>{language.h2_10_h3_3}</h3>
        <p>{language.p_30}</p>
        <h2>
          <u>{language.h2_11}</u>
        </h2>
        <p>{language.p_31}</p>
        <p>
          <strong>{language.p_32_strong} </strong>
          {language.p_32}
        </p>
        <p>
          <u>
            <strong>{language.p_33_strong} </strong>
            {language.p_33}
          </u>
        </p>
        <h2>
          <u>{language.h2_12}</u>
        </h2>
        <h3>{language.h2_12_h3_1}</h3>
        <p>{language.p_34}</p>
        <h3>{language.h2_12_h3_2}</h3>
        <p>{language.p_35}</p>
        <h3>{language.h2_12_h3_3}</h3>
        <p>{language.p_36}</p>
        <h3>{language.h2_12_h3_4}</h3>
        <p>{language.p_37}</p>

        <h2>{language.h2_13}</h2>
        <h3>{language.h2_13_h3}</h3>
        <p>
          <strong>{language.p_38_strong} </strong>
          {language.p_38}
        </p>
        <h2>{language.h2_14}</h2>
        <ul>
          <li>
            <strong>{language.h2_14_li_1}</strong>
          </li>
          <p className="intends">{language.p_39}</p>
          <li>
            <strong>{language.h2_14_li_2}</strong>
          </li>
          <ul className="intends">
            <li>{language.h2_14_li_2_li_1}</li>
            <li>{language.h2_14_li_2_li_2}</li>
            <li>{language.h2_14_li_2_li_3}</li>
            <li>{language.h2_14_li_2_li_4}</li>
            <li>{language.h2_14_li_2_li_5}</li>
            <li>{language.h2_14_li_2_li_6}</li>
            <li>{language.h2_14_li_2_li_7}</li>
            <li>{language.h2_14_li_2_li_8}</li>
            <li>{language.h2_14_li_2_li_9}</li>
          </ul>

          <p>
            <strong>{language.p_40_strong} </strong>
            {language.p_40}
          </p>
          <p>
            <strong>{language.p_41_strong} </strong>
            {language.p_41}
          </p>
          <p>{language.p_42}</p>
          <p>
            <strong>{language.p_43_strong} </strong>
            {language.p_43}
          </p>
          <li>
            <strong>{language.h2_14_li_3}</strong>
          </li>
          <p>{language.p_44}</p>
          <li>
            <strong>{language.h2_14_li_4}</strong>
          </li>
          <p>{language.p_45}</p>
          <ul className="intends">
            <li>{language.p_45_li_1}</li>
            <li>{language.p_45_li_2}</li>
          </ul>
          <p>
            <strong>{language.p_46_strong}</strong>
            {language.p_46}
          </p>
          <li>
            <strong>{language.p_45_li_3}</strong>
          </li>
          <p>{language.p_47}</p>
          <li>
            <u>
              <strong>{language.p_45_li_4}</strong>
            </u>
          </li>
          <p>{language.p_48}</p>
          <li>
            <strong>{language.p_45_li_5}</strong>
          </li>
          <p>{language.p_49}</p>
          <p>{language.p_50}</p>
          <p>{language.p_51}</p>
          <p>{language.p_52}</p>
        </ul>
      </section>
    </Layout>
  );
};

export default InsurancePolicies;
