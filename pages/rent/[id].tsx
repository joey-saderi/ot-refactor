import React, { useEffect } from "react";
import Landing_page_container from "../../src/containers/LandignPageContainer";
import Layout from "../../src/Layout";
import { REQUEST_GET_LANDING_PAGE } from "../../src/API";
import { NextSeo } from "next-seo";
import Landing_Page_Content from "../../src/containers/LandignPageContainer/landingPageContent";
import Router from "next/router";
import language from "../../public/languages/fa/dynamic_pages.json";

const Rent_dynamic = (props) => {
  useEffect(() => {
    if (!props.Landing_page) {
      Router.push("/404");
    }
  }, []);

  return props.Landing_page ? (
    <Layout>
      <NextSeo
        title={props.Landing_page.meta_title}
        description={props.Landing_page.meta_description}
        canonical={props.Landing_page.canonical_url}
        openGraph={{
          title: `${props.Landing_page.meta_title}`,
          description: props.Landing_page.meta_description,
          site_name: language.site_name,
        }}
        twitter={{
          handle: language.handle,
          site: language.site,
          cardType: language.cardType,
        }}
      />
      <Landing_page_container landing_data={props.Landing_page} language={language}/>
      <Landing_Page_Content data={props.Landing_page} language={language} />
    </Layout>
  ) : null;
};

/**
 *
 * @param props
 *  This page needs to render server-side and get the id of dynamic route
 *  At incoming data there are meta data for dynamic page that should set on Next-Seo
 *  With the id we do rest of work
 */
export async function getServerSideProps(props) {
  try {
    const landing_res: any = await REQUEST_GET_LANDING_PAGE({
      name: props.query.id,
    });
    return {
      props: {
        Landing_page: landing_res.data,
      },
    };
  } catch (error) {
    console.log("!Error", error);
    return {
      props: {
        Landing_page: false,
      },
    };
  }
}

export default Rent_dynamic;
