import React, { useEffect, useState } from "react";
import { REQUEST_GET_USER_CARS } from "../../../API";
import Router from "next/router";
import Car from "./car";
// import "./profile_car.scss";
import CarLoading from "../../../components/cartPlaceholder/CarLoadingProfile";
import Radio from "../../../components/form/Radio";
import Button from "../../../components/form/Button";
import { IoIosArrowDown } from "react-icons/io";

let useFilter = false;
let filterNumber = 0;
let page = 1;

const Profile_Cars = ({ is_mine, profile_Id, language }: IProfile_Cars) => {
  const [result, setResult] = useState(null);
  const [active, setActive] = useState(1);
  const [showMoreButton, setShowMoreButton] = useState(false);

  useEffect(() => {
    fetchApi();
    return () => {
      useFilter = false;
      page = 1;
      filterNumber = 0;
    };
  }, []);

  const fetchApi = async (page?) => {
    let data: any = {};
    // reset the results
    if (page <= 1) {
      setResult(null);
    }
    if (useFilter) {
      data = {
        id: profile_Id,
        is_out_of_service: filterNumber,
        page: page,
      };
    } else {
      data = { id: profile_Id, page: page };
    }
    try {
      const user_cars_res: any = await REQUEST_GET_USER_CARS(data);
      if (page > 1) {
        setResult((result) => result.concat(user_cars_res.items));
      } else {
        setResult(user_cars_res.items);
      }
      let uncompleted_item = user_cars_res.items.filter(
        (item) => !item.cancellation_policy
      );
      if (uncompleted_item.length > 0) {
        localStorage["red_dot"] = 1;
      } else {
        localStorage.removeItem("red_dot");
      }
      if (user_cars_res.total_count > 14 && user_cars_res.remained_count > 0) {
        setShowMoreButton(true);
      } else setShowMoreButton(false);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  // check the filter to sort by avtive or out of service status
  const activeFilter = (i) => {
    page = 1;
    if (i === 1) {
      useFilter = false;
      fetchApi(1);
    } else if (i === 2) {
      useFilter = true;
      filterNumber = 1;
      fetchApi(1);
    } else if (i === 3) {
      useFilter = true;
      filterNumber = 3;
      fetchApi(1);
    }
  };

  return (
    <article className="Profile_car_container">
      {is_mine && result
        ? result.length > 3 && (
            <div className="service_filer">
              <Radio
                name="show_car_Radio"
                error_status={false}
                SelectHandler={(i) => {
                  setActive(+i);
                  activeFilter(i);
                }}
                defaultCheck={active}
                data={[
                  {
                    label: language.all,
                    value: 1,
                  },
                  {
                    label: language.inactive,
                    value: 2,
                  },
                  {
                    label: language.active,
                    value: 3,
                  },
                ]}
              />
            </div>
          )
        : null}
      {result ? (
        result.length > 0 ? (
          result.map((item, i) => {
            // car section
            return is_mine ? (
              <Car
                language={language.car}
                key={i}
                data={item}
                is_mine={true}
                getListAgain={() => fetchApi(1)}
              />
            ) : !item.is_out_of_service ? (
              <Car
                language={language.car}
                key={i}
                data={item}
                is_mine={false}
                getListAgain={() => fetchApi(1)}
              />
            ) : null;
          })
        ) : null
      ) : (
        // (
        //   <div className="noCar_added">
        //     <p>خودرویی یافت نشد.</p>
        //     <Button
        //       value="+ افزودن خودرو"
        //       class="Blue_BTN HEAP_Profile_Btn_AddCar"
        //       click={() => {
        //         Router.push("/add-car");
        //       }}
        //       loading={false}
        //     />
        //   </div>
        // )
        <>
          <CarLoading />
          <CarLoading />
          <CarLoading />
          <CarLoading />
        </>
      )}
      {showMoreButton ? (
        <div className="Load_more_car_container">
          <span
            className="Load_more_car HEAP_Profile_Btn_ShowMore"
            onClick={() => {
              page = 1 + page;
              fetchApi(page);
            }}
          >
            <IoIosArrowDown color="#202020" size="1.8rem" />
            {language.show_more_cars}
          </span>
        </div>
      ) : null}
    </article>
  );
};

interface IProfile_Cars {
  is_mine: boolean;
  profile_Id: number;
  language: any;
}

export default Profile_Cars;
