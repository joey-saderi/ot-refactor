import React from "react";
// import "./landingPageContent.scss";

const Landing_Page_Content = ({ data, language }: ILanding_Page_Content) => {
  return (
    <article className="responsive landing_dynamic_content">
      <section
        className="Landing_content"
        dangerouslySetInnerHTML={{ __html: `${data.content}` }}
      ></section>
      {data.link_set.length > 0 && (
        <div className="Landing_Links">
          <h3>{language.Landing_Page_Content.Landing_Links}</h3>
          <ul>
            {data.link_set.map((item) => {
              return (
                <li key={item.name}>
                  <a
                    className="HEAP_LandingPages_Link_RelatedLinks"
                    href={item.url}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
};

interface ILanding_Page_Content {
  data: any;
  language: any;
}
export default Landing_Page_Content;
