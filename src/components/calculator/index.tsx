import React, { useEffect, useState } from "react";
import {
  REQUEST_GET_CAR_BRAND,
  REQUEST_GET_CAR_MODEL,
  REQUEST_GET_CAR_PRICE_ESTIMATION,
} from "../../API";
import DropdownSearch from "../form/Dropdown";
import TextInput from "../form/TextInput";
import Button from "../form/Button";
import ShowResult from "./ShowResult/ShowResult";
import Link from "next/link";

const Calculator = ({ AbText, language }: ICalculator) => {
  const [brandList, setBrandList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState({
    name: null,
    id: null,
  });
  const [brandError, setBrandError] = useState({ status: false, message: "" });
  const [model, setModel] = useState({
    name: null,
    id: null,
  });
  const [modelError, setModelError] = useState({ status: false, message: "" });
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [showCalculateBox, setShowCalculateBox] = useState(true);
  const [saveCarInfo, setSaveCarInfo] = useState({
    brand: null,
    model: null,
    value: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (value) {
      setValueError({ status: false, message: "" });
    }
  }, [value]);
  useEffect(() => {
    if (brand.id) {
      setBrandError({ status: false, message: "" });
    }
  }, [brand.id]);
  useEffect(() => {
    if (model.id) {
      setModelError({ status: false, message: "" });
    }
  }, [model.id]);

  const fetchData = async () => {
    /**
     * Get the Bran list from API
     */
    try {
      const brand_list_res: any = await REQUEST_GET_CAR_BRAND();
      setBrandList(brand_list_res.carBrands);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  /**
   *
   * @param brand_id
   * Get the model List From API base on Brand Id
   */
  const fetchModelList = async (brand_id) => {
    try {
      const model_list_res: any = await REQUEST_GET_CAR_MODEL(brand_id);
      setModelList(model_list_res.data);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  const calculator = async (e) => {
    e.preventDefault();
    setLoading(true);
    /**
     * validation to ignore empty values or if the inputted value is smaller then 10 million
     */
    if (!brand.id) {
      setBrandError({ status: true, message: language.form_error_1 });
      setLoading(false);
      return;
    } else if (!model.id) {
      setModelError({ status: true, message: language.form_error_2 });
      setLoading(false);
      return;
    } else if (value === "") {
      setValueError({ status: true, message: language.form_error_3 });
      setLoading(false);
      return;
    }
    if (+value < 20000000) {
      setValueError({ status: true, message: language.form_error_4 });
      setLoading(false);
      return;
    }

    try {
      // Don't care about the result
      const estimation_res = await REQUEST_GET_CAR_PRICE_ESTIMATION({
        car_id: model.id,
        price: value,
      });
      setLoading(false);
      localStorage["car_info"] = JSON.stringify(saveCarInfo);
      // Show the calculator box
      setShowCalculateBox(false);
      // Reset old values in case they were set
      setDaily(0);
      setWeekly(0);
      setMonthly(0);

      // Convert the car value to Numner
      let conToNum = Number(value);
      // Constant base for daily rent: 0.0022
      let eachDaily = conToNum * 0.0018;

      //  Round the daily value before calculating monthly and weekly income
      let Round = Math.ceil(eachDaily / 10) * 10;

      // Multiply by 7 for weekly income
      let eachWeek = Round * 7;

      // Multiply by 30 for monthly income
      let eachMonth = Round * 30;

      setDaily(eachDaily);
      setWeekly(eachWeek);
      setMonthly(eachMonth);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  return (
    <>
      {showCalculateBox ? (
        <>
          <h2>{language.h2}</h2>
          <p className="title">{language.p_title}</p>
          <form data-test-id="form" onSubmit={calculator}>
            <div className="calculator_dropDown">
              <DropdownSearch
                data-test-id="brand"
                search_place_holder={language.brand_place_holder}
                defaultVal={brand.name}
                data={brandList}
                // clearField={() =>
                //   setBrand({
                //     id: null,
                //     name: null,
                //   })
                // }
                Select={(v) => {
                  fetchModelList(v.value);
                  setSaveCarInfo((saveCarInfo) => {
                    return { ...saveCarInfo, brand: v };
                  });
                  setBrand({
                    id: v.value,
                    name: v.text,
                  });
                  try {
                    if (window["heap"]) {
                      window["heap"].addUserProperties({
                        Calc_Car_Brand: `${v.text}`,
                      });
                    }
                  } catch (e) {
                    console.log("Em...I think heap not work correctly :/");
                  }
                }}
                placeholder={language.brand}
                InputDisable={true}
                error_status={brandError.status}
              />
              <span className="error_Field">{brandError.message}</span>
            </div>
            <div className="calculator_dropDown">
              <DropdownSearch
                defaultVal={model.name}
                data={modelList}
                search_place_holder={language.model_place_holder}
                // clearField={() => {
                //   setModel({ id: null, name: null });
                // }}
                disabled={!brand.id ? true : false}
                InputDisable={true}
                Select={(v) => {
                  setSaveCarInfo((saveCarInfo) => {
                    return { ...saveCarInfo, model: v };
                  });
                  try {
                    if (window["heap"]) {
                      window["heap"].addUserProperties({
                        Calc_Car_Brand: `${v.text}`,
                      });
                    }
                  } catch (e) {
                    console.log("Em...I think heap not work correctly :/");
                  }
                  setModel({ id: v.value, name: v.name });
                }}
                placeholder={language.model}
                error_status={modelError.status}
              />
              <span className="error_Field">{modelError.message}</span>
            </div>
            <div className="value_container">
              <TextInput
                name="value"
                number={true}
                onChangeHandler={(e) => {
                  setSaveCarInfo((saveCarInfo) => {
                    return { ...saveCarInfo, value: e };
                  });
                  setValue(e);
                }}
                clearField={() => setValue("")}
                autoFocus={false}
                error={{
                  status: valueError.status,
                  message: valueError.message,
                }}
                min={7}
                max={14}
                value={value}
                placeholder={language.value}
                validation={{
                  number: true,
                  min: 20000000,
                  messages: {
                    required: language.error_value_1,
                    min: language.error_value_2,
                  },
                  required: true,
                }}
              />
              <span>{language.toman}</span>
            </div>
            <Button
              data-test-id="local_Button_joinUs"
              // onClick on this button nothing happened, the event listening to submitting the form
              value={language.estimate}
              click={() => {}}
              class="Blue_BTN local_Button_joinUs"
              loading={loading}
            />
          </form>
        </>
      ) : (
        <>
          <ShowResult
            language={language.show_result}
            daily={daily}
            weekly={weekly}
            monthly={monthly}
          />
          <div className="addCarnowInlanding">
            <Link href="/add-car">
              <a
                className="Blue_BTN addCar_top_joinus_a"
                data-test-id="addCar_top_joinus_a"
              >
                {AbText ? AbText : language.add_your_car}
              </a>
            </Link>
          </div>
          {/* show the calculation box */}
          <p
            className="tryAgainCalc"
            onClick={() => {
              window.scrollTo(0, 0);
              // Reset the car value
              setValue("");
              setBrand({
                name: null,
                id: null,
              });
              setModel({
                name: null,
                id: null,
              });
              setLoading(false);
              setShowCalculateBox(true);
            }}
          >
            {language.calculate_again}
          </p>
        </>
      )}
    </>
  );
};

interface ICalculator {
  AbText?: string;
  language: any;
}

export default Calculator;
