import React, { useState } from "react";
import Radio from "../../../components/form/Radio";

// import "./insurance.scss";

const Insurance = (props: IInsurance) => {
  const [value, setValue] = useState(2);
  return (
    <Radio
      name="has_insurance"
      SelectHandler={(i) => {
        setValue(i);
        props.hasInsurance(i);
      }}
      defaultCheck={value}
      data={[
        {
          label: `بسته ویژه بیمه سامان (${props.insurance_price.toLocaleString()} تومان)`,
          // this text will shown under the radio button
          extra_text:
            "شامل پوشش‌های: سرقت، تصادف، حوادث طبیعی و پاشیده شدن رنگ و مواد شیمیایی در مدت اجاره",
          value: 2,
        },
        {
          label: "به بیمه نیاز ندارم",
          extra_text:
            "در طول مدت اجاره مسئولیت نگهداری از خودرو با شما خواهد بود. با خرید بیمه اجاره که توسط بیمه سامان صادر می‌شود، شما تنها متعهد به جبران مواردی خواهید بود که تحت پوشش بیمه خریداری شده نیست.",
          value: 1,
        },
      ]}
    />
  );
};

interface IInsurance {
  // set the insurance status in parent component
  hasInsurance: any;
  insurance_price: number;
}

export default Insurance;
