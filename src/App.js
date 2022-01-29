import "./App.css";
import LineChart from "./components/LineChart";
import React, { useState, useEffect } from "react";
import cowin_logo from "./cowin-logo.svg";
import cowin_logo_top from "./cowin-logo-2.svg";
import home_india from "./home_india.svg";
import Dounut from "./components/Dounut";
import FullPie from "./components/FullPie";
import VacList from "./VacList";
import vaccine_logo from "./vaccine.svg";
import building_logo from "./building.svg";
import peoples_group from "./peoples-group.svg";
import InformationBar from "./components/InformationBar";
import Aefi from "./Aefi";
import RuralUrban from "./RuralUrban";
import BarComponent from "./BarComponent";
import Footer from "./components/Footer";
import Dropdown from "./Dropdown";
import totalDistricts from "./data.json";
var stateElements = [];
function App() {
  const [districtList, setDistrictList] = useState(null);
  const [dataVaccine, setDataVaccine] = useState({});
  const [ageDose, setAgeDose] = useState("Doses");
  const [selectedState, setSelectedState] = useState({
    name: "Select State",
    id: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    name: "Select District",
    id: "",
  });
  const [dataPublic, setDataPublic] = useState({});
  const [todayLast, setTodayLast] = useState("Today");
  console.log("length of state elements " + stateElements.length);
  useEffect(() => {
    async function fetchdata() {
      var date = new Date(Date.now());

      fetch(
        `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`
      )
        .then((response) => response.json())
        .then((data) => {
          setDataPublic(data);
        });
      fetch(
        ` https://api.cowin.gov.in/api/v1/reports/v2/getVacPublicReports?state_id=${
          selectedState.id
        }&district_id=&date=${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`
      )
        .then((response) => response.json())
        .then(function (data) {
          setDataVaccine(data);
        });
    }
    fetchdata();
  }, []);
  // array that stores names and IDs of the states
  if (Object.keys(dataPublic).length && stateElements.length === 0) {
    stateElements = dataPublic.getBeneficiariesGroupBy.map((element) => {
      return (
        <option id={element.id} value={element.title} key={element.id}>
          {element.title}
        </option>
      );
    });
  }
  var districtElements = [];
  if (selectedState.name !== "Select State") {
    districtElements = totalDistricts.map((element) => {
      if (element.state_id == selectedState.id) {
        return (
          <option
            id={element.district_id}
            value={element.district_name}
            key={element.district_id}
          >
            {element.district_name}
          </option>
        );
      }
    });
  }

  function stateSetter(e) {
    var date = new Date(Date.now());

    var value = e.target.childNodes[e.target.selectedIndex].value;
    var index = e.target.childNodes[e.target.selectedIndex].id;
    fetch(
      `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=${index}&district_id=&date=${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`
    )
      .then((response) => response.json())
      .then(function (data) {
        setSelectedState({ name: value, id: index });
        setDataPublic(data);
        setTodayLast("Today");
        setSelectedDistrict({
          name: "Select District",
          id: "",
        });
      });
  }
  function districtSetter(e) {
    var date = new Date(Date.now());

    var value = e.target.childNodes[e.target.selectedIndex].value;
    var index = e.target.childNodes[e.target.selectedIndex].id;
    fetch(
      `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=${
        selectedState.id
      }&district_id=${index}&date=${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`
    )
      .then((response) => response.json())
      .then(function (data) {
        setSelectedDistrict({ name: value, id: index });
        setDataPublic(data);
        setTodayLast("Today");
      });
  }

  function fetchTheData(e, typ, a) {
    var date = new Date(Date.now());

    if (typ) {
      fetch(
        ` https://api.cowin.gov.in/api/v1/reports/v2/getVacPublicReports?state_id=${
          selectedState.id
        }&district_id=&date=${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`
      )
        .then((response) => response.json())
        .then(function (data) {
          setDataVaccine(data);
          setTodayLast(e.target.innerHTML);
        });
    } else {
      fetch(
        `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=${
          selectedState.id
        }&district_id=&date=${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`
      )
        .then((response) => response.json())
        .then(function (data) {
          setDataPublic(data);
          setTodayLast(e.target.innerHTML);
        });
    }
  }
  function ageDoseSetter(e) {
    setAgeDose(e.target.innerHTML);
  }
  console.log("here is the selected state= " + selectedState.name);

  return (
    <div className="App">
      <div className="first-navigation">
        <div className="first-navigation_inner">
          <div className="first-navigation_first-half">
            <div className="logo">
              <img src={cowin_logo_top} alt="logo top"></img>{" "}
            </div>
            <a href="https://india.gov.in">
              Ministry Of Health And Family Welfare
            </a>
          </div>
          <div className="first-navigation_second-half">
            <a>Verify Certificate |</a>
            <a>Skip To Main Content |</a>
            <div className="language">English</div>
          </div>
        </div>
      </div>
      <div className="second-navigation">
        <div className="second-navigation_inner">
          <div className="second-navigation_first-half">
            <div className="cowin-logo">
              <img src={cowin_logo} alt="COWIN LOGO"></img>
            </div>
          </div>
          <div className="second-navigation_second-half">
            <Dropdown name={"VACCINATION SERVICES"}>
              <li className="Dropdown-list-element">Register Members</li>
              <li className="Dropdown-list-element">
                Search Vaccination Centers
              </li>
              <li className="Dropdown-list-element">Book Vaccination Slots</li>
              <li className="Dropdown-list-element">Manage Appointment</li>
              <li className="Dropdown-list-element">Download Certificate</li>
            </Dropdown>
            <Dropdown name={"PLATFORMS"}>
              <li className="Dropdown-list-element">CoWIN International</li>
              <li className="Dropdown-list-element">Vaccinator</li>
              <li className="Dropdown-list-element">Department Login</li>
              <li className="Dropdown-list-element">Verify Certificate</li>
            </Dropdown>
            <Dropdown name={"RESOURCES"}>
              <li className="Dropdown-list-element">How To Get Vaccinated</li>
              <li className="Dropdown-list-element">Dos And Don'ts</li>
              <li className="Dropdown-list-element">Overview</li>
              <li className="Dropdown-list-element">API Guidelines</li>
              <li className="Dropdown-list-element">Grievance Guidelines</li>
            </Dropdown>
            <Dropdown name={"SUPPORT"}>
              <li className="Dropdown-list-element">
                Frequently Asked Questions
              </li>
              <li className="Dropdown-list-element">Certificate Corrections</li>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="body-wrapper">
        <div className="selection-div">
          <div className="India">
            <img className="india-logo" alt="LogoIndia" src={home_india}></img>
            <div> India</div>
          </div>
          <div className="selection-div-options">
            <select
              className="select-state"
              value={selectedState.name}
              onChange={stateSetter}
            >
              <option value="Select State">Select State</option>
              {stateElements}
            </select>
            <select
              className="select-district"
              value={selectedDistrict.name}
              onChange={districtSetter}
            >
              <option value="Select District">Select District</option>
              {districtElements}
            </select>
          </div>
        </div>
        <div className="provisional-message">
          <div className="provisional-message-first">
            *The figure displayed in the dose counter are provisional and are
            subject to reconciliation.
          </div>
          <div className="provisional-message-second">Last updated</div>
        </div>
        <div className="info-bar-container">
          <InformationBar
            data={dataPublic}
            path="vaccination"
            first={{ title: "Total Vaccination Doses", value: "total" }}
            second={{ title: "Dose 1", value: "tot_dose_1" }}
            third={{ title: "Dose 2", value: "tot_dose_2" }}
            logo={vaccine_logo}
          />
          <InformationBar
            data={dataPublic}
            path="sites"
            first={{ title: "Sites Conducting Vaccination", value: "total" }}
            second={{ title: "Government", value: "govt" }}
            third={{ title: "Private", value: "pvt" }}
            logo={building_logo}
          />
          {!Object.keys(dataPublic).length ? (
            <InformationBar
              data={dataPublic}
              path="registration"
              first={{ title: "Total Registrations", value: "total" }}
              second={{ title: "Age 18-45", value: "cit_18_45" }}
              third={{ title: "Age 45+", value: "cit_45_above" }}
              logo={peoples_group}
            />
          ) : dataPublic.topBlock.registration.total === null ? (
            ""
          ) : (
            <InformationBar
              data={dataPublic}
              path="registration"
              first={{ title: "Total Registrations", value: "total" }}
              second={{ title: "Age 18-45", value: "cit_18_45" }}
              third={{ title: "Age 45+", value: "cit_45_above" }}
              logo={peoples_group}
            />
          )}
        </div>
        <LineChart
          data={todayLast === "Today" ? dataPublic : dataVaccine}
          fetchTheData={fetchTheData}
          aD={ageDose}
          category={todayLast}
          ageDoseSetter={ageDoseSetter}
        />

        <div className="pie-container">
          <div className="pie-container_first-child">
            <h4 className="pie-heading">Vaccination - Category</h4>
            <Dounut
              data={dataPublic}
              first={{ identity: "male", color: "#2974FF" }}
              second={{ identity: "female", color: "#FF1A81" }}
              third={{ identity: "others", color: "green" }}
            />
            <Dounut
              data={dataPublic}
              first={{ identity: "covishield", color: "#006EAD" }}
              second={{ identity: "covaxin", color: "#69D01B" }}
              third={{ identity: "sputnik", color: "green" }}
            />
          </div>
          <div className="pie-container_second-child">
            <h4 className="pie-heading">Vaccination By Age</h4>
            <FullPie
              data={dataPublic}
              second={{ identity: "vac_45_60", color: "#64C2A6" }}
              third={{ identity: "above_60", color: "#2D87BB" }}
              first={{ identity: "vac_18_45", color: "#AADEA7" }}
            />
          </div>
          <div className="pie-container_third-child">
            <VacList
              data={dataPublic}
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
            />
          </div>
        </div>
        <div className="lines-container">
          <Aefi data={dataPublic} />
          <RuralUrban data={dataVaccine} />
        </div>
        {selectedDistrict.name === "Select District" ? (
          <BarComponent data={dataPublic} />
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export default App;
