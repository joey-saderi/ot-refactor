import React from "react";
import pelak from "../../../public/image/pelak.png";
// import "./pelak.scss";

const PelakView = (props: IPelakView) => {
  return (
    <div className="pelak_view_container">
      <img src={pelak} alt="license_number_image" />
      <p className="first">{props.registration_plate_first_part}</p>
      <p className="second">{props.registration_plate_second_part}</p>
      <p className="third">{props.registration_plate_third_part}</p>
      <p className="forth">{props.registration_plate_forth_part}</p>
    </div>
  );
};
interface IPelakView {
  // It's the first box from left
  registration_plate_first_part: string;
  // It's the second box from left
  registration_plate_second_part: string;
  // It's the third box from left
  registration_plate_third_part: string;
  // It's the fourth box from left
  registration_plate_forth_part: string;
}

export default PelakView;
