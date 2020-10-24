let initialValue = 0;
let outGoingString = "";
let unit = "";

const PersianCurrency = (props: IProps) => {
  initialValue = typeof props.value === "string" ? +props.value : props.value;
  outGoingString = "";
  unit = "";
  CheckingTheNumber(initialValue);
  return outGoingString;
};

const CheckingTheNumber = (value) => {
  let slicedString = null;

  switch (true) {
    case value / 100 >= 1 && value / 100 < 10:
      console.log(2);
      slicedString = `${value}`.slice(0, 3);
      console.log("برگشت", numberTOPersianWord(slicedString));
      initialValue = +slicedString;
      break;
    case value / 1000 >= 1 && value / 1000 < 1000:
      console.log(3);
      slicedString = `${value}`.slice(0, -3); 
      outGoingString = numberTOPersianWord(slicedString) + "هزار"
      initialValue = +`${value}`.slice(-3);
      if (initialValue > 0) {
        CheckingTheNumber(initialValue);
      }
      break;
    case value / 1000000 >= 1 && value / 1000000 < 1000:
      unit = "میلیون";
      console.log(4);
      slicedString = `${value}`.slice(0, -6);
      console.log("|546654", `${value}`.slice(0, -3));
      numberTOPersianWord(slicedString);
      initialValue = +`${value}`.slice(-6);
      if (initialValue > 0) {
        CheckingTheNumber(initialValue);
      }
      break;
    case value / 1000000000 >= 1 && value / 1000000000 < 1000:
      console.log(5);
      unit = "ملیارد";
      slicedString = `${value}`.slice(0, -9);
      numberTOPersianWord(slicedString);
      initialValue = +`${value}`.slice(-9);
      if (initialValue > 0) {
        CheckingTheNumber(initialValue);
      }
      break;
    default:
      console.log(6);

      // unit = "";
      break;
  }
};

const numberTOPersianWord = (value) => {
  console.log("value", outGoingString);
  let _1To10 = [
    "",
    "یک ",
    "دو ",
    "سه ",
    "چهار ",
    "پنج ",
    "شش ",
    "هفت ",
    "هشت",
    "نه ",
  ];
  let _10To19 = [
    "ده ",
    "یازده ",
    "دوازده ",
    "سیزده ",
    "چهارده ",
    "پانزده ",
    "شانزده ",
    "هفده ",
    "هجده ",
    "نوزده ",
  ];
  let _dahgan = [
    "",
    "",
    "بیست ",
    "سی ",
    "چهل ",
    "پنجاه ",
    "شصد ",
    "هفتاد ",
    "هشتاد ",
    "نود ",
  ];
  let _sadgan = [
    "",
    "یک‌صد ",
    "دویست ",
    "سیصد ",
    "چهارصد ",
    "پانصد ",
    "ششصد ",
    "هفتصد ",
    "هشتصد ",
    "نهصد ",
  ];
  if (value >= 100) {
    outGoingString += _sadgan[`${value}`.slice(0, 1)];
    numberTOPersianWord(+`${value}`.slice(1));
  } else if (value < 100 && value >= 20) {
    let dahgan = +`${value}`.slice(0, 1);
    outGoingString += _dahgan[dahgan];
    numberTOPersianWord(+`${value}`.slice(1));
  } else if (value < 20 && value >= 10) {
    outGoingString += _10To19[value % 10];
  } else {
    outGoingString += _1To10[value];
  }
  return outGoingString;
};

interface IProps {
  value: string | number;
}

export default PersianCurrency;
