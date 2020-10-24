import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
// import "./Accordion.scss";

const Accordion = (props: IAccordion) => {
  const [index, setIndex] = useState(0);

  const ClickHandler = (i) => {
    // If the given index is equal to the current index thi tab will be closing
    if (i === index) {
      setIndex(undefined);
    } else setIndex(i);
  };

  return props.question_set.map((item, i) => {
    return (
      <div
        key={i}
        className="FQ_BOX"
        onClick={() => {
          ClickHandler(i);
        }}
      >
        <h3
          className={i === index ? "activeQA" : ""}
          dangerouslySetInnerHTML={{ __html: item.title }}
        ></h3>
        <IoIosArrowDown
          color="#202020"
          size="2rem"
          className={["ICON_CHevron", i === index ? "ACTIVE_CHEVRON" : ""].join(
            " "
          )}
        />
        <div
          className={["QuestionPart", i === index ? "activeQA" : ""].join(" ")}
          dangerouslySetInnerHTML={{ __html: item.content }}
        ></div>
      </div>
    );
  });
};

interface IAccordion {
  /**
   * @question_set
   * A list of questions and answers
   */
  question_set: any;
}

export default Accordion;
