let initialValue = 0;
let outGoingString = "";
let unit = "";

const NumbersAndCurrencyUnit = (props: IProps) => {
  initialValue = typeof props.value === "string" ? +props.value : props.value;
  if (initialValue === 0) return "";
  outGoingString = "";
  unit = "";
  CheckingTheNumber(initialValue);
  let polishTheOutGoing = outGoingString.replace(/(\s)(?!$)/g, " و ");

  return polishTheOutGoing.replace(/_/g, " ");
};

const CheckingTheNumber = (value) => {
  let slicedString = null;

  switch (true) {
    case value < 10:
      outGoingString += `${value}`;
      break;
    case value / 10 >= 1 && value / 10 < 10:
      outGoingString += `${value}`;
      break;
    case value / 100 >= 1 && value / 100 < 10:
      slicedString = `${value}`.slice(0, 3);
      outGoingString += `${slicedString}`;
      initialValue = +slicedString;
      break;
    case value / 1000 >= 1 && value / 1000 < 1000:
      slicedString = `${value}`.slice(0, -3);
      outGoingString += `${slicedString}_هزار `;
      initialValue = +`${value}`.slice(-3);
      if (initialValue > 0) {
        CheckingTheNumber(initialValue);
      }
      break;
    case value / 1000000 >= 1 && value / 1000000 < 1000:
      slicedString = `${value}`.slice(0, -6);
      outGoingString += `${slicedString}_میلیون `;
      initialValue = +`${value}`.slice(-6);
      if (initialValue > 0) {
        CheckingTheNumber(initialValue);
      }
      break;
    case value / 1000000000 >= 1 && value / 1000000000 < 1000:
      slicedString = `${value}`.slice(0, -9);
      outGoingString += `${slicedString}_میلیارد `;
      initialValue = +`${value}`.slice(-9);
      if (initialValue > 0) {
        CheckingTheNumber(initialValue);
      }
      break;
    default:
      console.log("Some thing is Wrong!");
      break;
  }
};

interface IProps {
  value: string | number;
}

export default NumbersAndCurrencyUnit;
