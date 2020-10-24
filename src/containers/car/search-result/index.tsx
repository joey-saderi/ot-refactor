import React, { useEffect } from "react";
import economic from "../../../../public/image/affordable.svg";
import offRoad from "../../../../public/image/SUV.svg";
import Car from "./car";
// import "./search_result.scss";
import CarLoading from "../../../components/cartPlaceholder/CarLoading";

let quickAccessClick = false;
const SearchResultList = ({
  showLocation,
  noQuickAccess,
  setFilterForSearch,
  result,
  tagClick,
  language,
}: ISearchResultList) => {
  useEffect(() => {
    if (result) {
      if (result.length > 0) {
        let startString = result[0].start_date.split("/");
        let endString = result[0].end_date.split("/");
        let start = {
          year: +startString[0],
          month: +startString[1],
          day: +startString[2],
        };
        let end = {
          year: +endString[0],
          month: +endString[1],
          day: +endString[2],
        };
        localStorage["start"] = JSON.stringify(start);
        localStorage["end"] = JSON.stringify(end);
      }
    }
  }, [result]);

  useEffect(() => {
    return () => {
      quickAccessClick = false;
    };
  }, []);

  return (
    <section className='search_result_section minHeight'>
      {result ? (
        result.length > 0 ? (
          result.map((item, i) => {
            return i === 14 && !quickAccessClick && !noQuickAccess ? (
              <>
                <Car
                  key={i}
                  data={item}
                  showLocation={showLocation}
                  tagClick={tagClick}
                  language={language}
                />
                <section className='quick_access_middle_searchResult'>
                  <h2>دسترسی سریع</h2>
                  <div className='quick_access_child_container'>
                    <div
                      className='HEAP_Search_Result_Quick_Access_SUV'
                      onClick={() => {
                        window.scrollTo(0, 0);
                        quickAccessClick = true;
                        setFilterForSearch({
                          body_style_id: { value: [2], status: true },
                        });
                      }}
                    >
                      <img src={offRoad} alt='خودروهای شاسی‌بلند' />
                      <p>خودروهای شاسی‌بلند</p>
                    </div>
                    <div
                      className='HEAP_Search_Result_Quick_Access_Economy'
                      onClick={() => {
                        window.scrollTo(0, 0);
                        quickAccessClick = true;
                        setFilterForSearch({
                          o: "-price",
                          price: {
                            value: ["0.00", "1000000.00"],
                            status: true,
                          },
                        });
                      }}
                    >
                      <img src={economic} alt='خودروهای اقتصادی' />
                      <p>خودروهای اقتصادی</p>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <Car
                key={i}
                data={item}
                showLocation={showLocation}
                tagClick={tagClick}
                language={language}
              />
            );
          })
        ) : (
          <p className='Not_Result'>
            {language.search_result_section.Not_Result_part_1}
            <br />
            <br />
            {language.search_result_section.Not_Result_part_2}
            <br />
            {language.search_result_section.Not_Result_part_3}
            <a href='tel:02188567759'>
              {language.search_result_section.Not_Result_part_4}
            </a>
            {language.search_result_section.Not_Result_part_5}
          </p>
        )
      ) : (
        <>
          <CarLoading />
          <CarLoading />
          <CarLoading />
          <CarLoading />
          <CarLoading />
          <CarLoading />
        </>
      )}
    </section>
  );
};

interface ISearchResultList {
  noQuickAccess?: boolean;
  showLocation?: boolean;
  result: any;
  setFilterForSearch?: any;
  tagClick?: any;
  language: any;
}

export default SearchResultList;
