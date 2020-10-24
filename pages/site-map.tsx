import React, { useEffect, useState } from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { REQUEST_GET_URLS_FOR_SITE_MAP } from "../src/API";
import language from "../public/languages/fa/sitemap.json";

const Site_map = () => {
  const [UrlList, UrlSetter] = useState([]);

  useEffect(() => {
    fetchAPIs();
  }, []);

  /**
   * Get the list of Dynamic Urls
   */
  const fetchAPIs = async () => {
    try {
      const res: any = await REQUEST_GET_URLS_FOR_SITE_MAP();
      UrlSetter(res.items);
    } catch (error) {
      console.log("!Error", error);
    }
  };

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
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight site_map_page">
        {UrlList.length > 0 && (
          <ul>
            {UrlList.map((i) => {
              return (
                <li style={{ margin: "5px 0" }} key={i.unique_id}>
                  <Link href="/rent/[id]" as={`/rent/${i.unique_id}`}>
                    <a>{i.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </article>
    </Layout>
  );
};

export default Site_map;
