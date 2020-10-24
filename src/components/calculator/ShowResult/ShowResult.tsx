import React from "react";

const ShowResult = ({ weekly, monthly, daily, language }: IShowResult) => {
  return (
    <div className="CalculatorResult" id="CalculatorResult">
      <div className="eachSvgBox">
        {weekly > 0 && (
          <h3 className="CalcH3" data-test-id="weekly">
            {weekly < 1000000
              ? /**
                 * @weekly
                 *  If it's smaller then 1.000.000 for instance 999.000 then the result should be 999
                 *  If it's equal or larger then 1.000.000 like 9.999.000 output is 9.9
                 */
                weekly.toString().slice(0, 3)
              : weekly.toLocaleString().slice(0, 5)}
            <p>
              {weekly >= 1000000 ? language.million : language.thousand}{" "}
              {language.toman}
            </p>
          </h3>
        )}
        <div className="SvgDisc">
          <svg viewBox="0 0 600 600">
            <g transform="translate(300, 300)">
              <g className="arcs">
                <defs>
                  <linearGradient
                    id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-gradient"
                    x1="0"
                    x2="100%"
                  >
                    <stop
                      className="gaugeGradient-start"
                      offset="0%"
                      stopColor="rgb(75,163,206)"
                      stopOpacity="1"
                    ></stop>
                    <stop
                      className="gaugeGradient-end"
                      offset="100%"
                      stopColor="#a3678b"
                      stopOpacity="1"
                    ></stop>
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient
                    id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient"
                    x1="0"
                    x2="100%"
                  >
                    <stop
                      className="gaugeGradient-start"
                      offset="0%"
                      stopColor="rgb(75,163,206)"
                      stopOpacity="1"
                    ></stop>
                    <stop
                      className="gaugeGradient-end"
                      offset="100%"
                      stopColor="#a3678b"
                      stopOpacity="1"
                    ></stop>
                  </linearGradient>
                </defs>
                <path
                  className="gauge-backgroundArc"
                  d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                  style={{ fill: "rgb(230, 230, 230)" }}
                ></path>
                <path
                  className="gauge-arc"
                  fill="url(#12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient)"
                  d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                ></path>
                <path className="gauge-target"></path>
              </g>
            </g>
          </svg>
        </div>
        <p className="UnderText">{language.weekly}</p>
      </div>
      <div className="eachSvgBox">
        {monthly && (
          <h3 className="CalcH3" data-test-id="monthly">
            {/**
             * @monthly
             *  The monthly value always is larger than one million
             *  Instance: 9.999.000 output is 9.9
             */
            monthly.toLocaleString().slice(0, 5)}
            <p>{language.million_toman}</p>
          </h3>
        )}
        <div className="SvgDisc">
          <svg viewBox="0 0 600 600">
            <g transform="translate(300, 300)">
              <g className="arcs">
                <defs>
                  <linearGradient
                    id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-gradient"
                    x1="0"
                    x2="100%"
                  >
                    <stop
                      className="gaugeGradient-start"
                      offset="0%"
                      stopColor="rgb(75,163,206)"
                      stopOpacity="1"
                    ></stop>
                    <stop
                      className="gaugeGradient-end"
                      offset="100%"
                      stopColor="#a3678b"
                      stopOpacity="1"
                    ></stop>
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient
                    id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient"
                    x1="0"
                    x2="100%"
                  >
                    <stop
                      className="gaugeGradient-start"
                      offset="0%"
                      stopColor="rgb(75,163,206)"
                      stopOpacity="1"
                    ></stop>
                    <stop
                      className="gaugeGradient-end"
                      offset="100%"
                      stopColor="#a3678b"
                      stopOpacity="1"
                    ></stop>
                  </linearGradient>
                </defs>
                <path
                  className="gauge-backgroundArc"
                  d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                  style={{ fill: "rgb(230, 230, 230)" }}
                ></path>
                <path
                  className="gauge-arc"
                  fill="url(#12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient)"
                  d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                ></path>
                <path className="gauge-target"></path>
              </g>
            </g>
          </svg>
        </div>
        <p className="UnderText">{language.monthly}</p>
      </div>
      <div className="eachSvgBox">
        {daily > 0 && (
          <h3 className="CalcH3" data-test-id="daily">
            {/**
             * @daily
             *  If it's smaller then 100.000 for instance 99.000 then the result should be 99
             *  If it's equal or bigger then 100.000 for instance 101.000 then the result should be 101
             *  If it's equal or larger then 1.000.000 like 9.999.000 output is 9.9
             */
            daily < 1000000
              ? daily < 100000
                ? daily.toString().slice(0, 2)
                : daily.toString().slice(0, 3)
              : daily.toLocaleString().slice(0, 5)}
            <p>
              {daily >= 1000000 ? language.million : language.thousand}{" "}
              {language.toman}
            </p>
          </h3>
        )}
        <div className="SvgDisc">
          <svg viewBox="0 0 600 600">
            <g transform="translate(300, 300)">
              <g className="arcs">
                <defs>
                  <linearGradient
                    id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-gradient"
                    x1="0"
                    x2="100%"
                  >
                    <stop
                      className="gaugeGradient-start"
                      offset="0%"
                      stopColor="rgb(75,163,206)"
                      stopOpacity="1"
                    ></stop>
                    <stop
                      className="gaugeGradient-end"
                      offset="100%"
                      stopColor="#a3678b"
                      stopOpacity="1"
                    ></stop>
                  </linearGradient>
                </defs>
                <defs>
                  <linearGradient
                    id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient"
                    x1="0"
                    x2="100%"
                  >
                    <stop
                      className="gaugeGradient-start"
                      offset="0%"
                      stopColor="rgb(75,163,206)"
                      stopOpacity="1"
                    ></stop>
                    <stop
                      className="gaugeGradient-end"
                      offset="100%"
                      stopColor="#a3678b"
                      stopOpacity="1"
                    ></stop>
                  </linearGradient>
                </defs>
                <path
                  className="gauge-backgroundArc"
                  d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                  style={{ fill: "rgb(230, 230, 230)" }}
                ></path>
                <path
                  className="gauge-arc"
                  fill="url(#12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient)"
                  d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                ></path>
                <path className="gauge-target"></path>
              </g>
            </g>
          </svg>
        </div>
        <p className="UnderText">{language.daily}</p>
      </div>
    </div>
  );
};

interface IShowResult {
  weekly: number;
  monthly: number;
  daily: number;
  language: any;
}

export default ShowResult;
