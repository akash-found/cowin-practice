import React from "react";
import "./vacList.css";
function VacList(props) {
  console.log(props.selectedState);
  console.log(props.selectedDistrict);
  if (props.selectedState.name === "Select State") {
    var heading1 = "Vaccination By State/UT";
    var heading2 = "State/UT";
  } else if (props.selectedDistrict.name === "Select District") {
    var heading1 = "Vaccination By District";
    var heading2 = "District";
  } else {
    var heading1 = "Vaccination By Centers";
    var heading2 = "Centers";
  }
  const setData = () => {
    if (Object.keys(props.data).length === 0) return null;
    var data = props.data.getBeneficiariesGroupBy;
    data.sort(function (a, b) {
      return b.total - a.total;
    });
    var temp = data.map((element) => {
      return (
        <li key={element.id} className="list">
          <div className="vac-list_title">
            <div>{element.title}</div>
          </div>
          <div className="container-vac_header_lower_total">
            {element.today}
          </div>
          <div className="container-vac_header_lower_total">
            {element.total}
          </div>
        </li>
      );
    });
    return temp;
  };

  return (
    <div className="container-vac">
      <div className="container-vac_header">
        <div className="container-vac_header_upper">{heading1}</div>
        <div className="container-vac_header_lower">
          <div className="vac-list_title">{heading2}</div>
          <div className="vac-list_title2">Today</div>
          <div className="vac-list_title2">Total</div>
        </div>
      </div>
      <ul className="vac_ul">{setData()}</ul>
    </div>
  );
}
export default VacList;
