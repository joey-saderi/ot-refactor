import React, { useState, useEffect } from "react";
import Checkbox from "../../../components/form/Checkbox";
import { IoIosOptions } from "react-icons/io";

const Requests_filter = ({
  filter_list,
  active_filters,
  language,
}: IRequests_filter) => {
  const [status, setStatus] = useState([
    { value: "new", text: "در انتظار تایید" },
    { value: "approved", text: "در انتظار پرداخت" },
    { value: "rejected", text: "رد شد" },
    // { value: "cancelled", text: "لغو شد" },
    { value: "paid", text: "در انتظار تحویل خودرو" },
    // { value: "not_delivered", text: "سفر به شکل دستی لغو شد " },
    { value: "delivered", text: " در حال سفر" },
    { value: "returned", text: " پایان اجاره" },
  ]);
  const [show_filter, setShow_filter] = useState(false);

  const [status_id, setStatus_id] = useState([]);

  useEffect(() => {
    if (active_filters.length > 0) {
      setStatus_id(active_filters);
    }
  }, [active_filters]);
  return (
    <>
      {/* filter mobile */}
      {/* {total_count === 0 && !result ? null : ( */}
      <span className="show_filter" onClick={() => setShow_filter(true)}>
        <IoIosOptions size="2rem" color="#656565" />
        {language.show_filters}
      </span>
      {/* )} */}
      {/* filter toggle Icon */}
      {show_filter && (
        <div
          onClick={() => setShow_filter(false)}
          className="with_drawer"
        ></div>
      )}
      <section
        className={[
          "filter_section",
          show_filter ? "show_Filter_section" : null,
          // total_count === 0 && !result
          //   ? "notAllowedToShowFilter"
          //   : null,
        ].join(" ")}
      >
        <h3>{language.status_of_request}</h3>
        {/* render a list of status's base on status value */}
        <Checkbox
          initialValue={status_id}
          name="status"
          clearField={(i) => {
            setStatus_id((setStatus_id) =>
              setStatus_id.filter((item) => {
                return item !== i.value;
              })
            );
            filter_list(i.value, "remove");
          }}
          Select={(i) => {
            setStatus_id((setStatus_id) => setStatus_id.concat(i.value));
            filter_list(i.value, "add");
          }}
          data={status}
        />
      </section>
    </>
  );
};

interface IRequests_filter {
  filter_list: any;
  active_filters: any;
  language: any;
  // result: any;
}

export default Requests_filter;
