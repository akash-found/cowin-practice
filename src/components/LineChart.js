import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import "./LineChart.css";

function LineChart(props) {
  const setMapData = () => {
    if (Object.keys(props.data).length === 0) return null;

    if (props.aD === "Doses") {
      var hLabel = [],
        dose_one = [],
        dose_two = [];
      var total = [];
      if (props.category === "Today") {
        var total = [];
        props.data.vaccinationDoneByTime.forEach((item) => {
          hLabel.push(new String(item.label).slice(6));

          total.push(item.count);
          dose_one.push(item.dose_one);
          dose_two.push(item.dose_two);
        });
      } else if (props.category === "Last 30 Days") {
        props.data.last30DaysVaccination.forEach((item) => {
          hLabel.push(
            new Date(item.vaccine_date).getDate() +
              " " +
              new Date(item.vaccine_date).toLocaleString("default", {
                month: "short",
              })
          );
          total.push(item.total);
          dose_one.push(item.dose_1);
          dose_two.push(item.dose_2);
        });
      } else {
        props.data.weeklyReport.forEach((item) => {
          hLabel.push(item.label);
          total.push(item.total);
          dose_one.push(item.dose1);
          dose_two.push(item.dose2);
        });
      }
      const temp = hLabel.filter((element) => element !== "07:00-08:00");

      const chart_data = {
        labels: hLabel,
        datasets: [
          {
            borderColor: "#FBA91A",
            backgroundColor: "rgba(251, 168, 24,0.1)",
            fill: { target: "origin", above: "rgba(251, 168, 24,0.1)" },
            label: "Both doses",
            data: dose_two,
            borderWidth: 2,
          },
          {
            borderColor: "rgb(98, 135, 209)",
            backgroundColor: "rgba(0, 31, 96,0.1)",
            fill: { target: "origin", above: "rgba(98, 135, 209,0.1)" },
            label: "One dose",
            data: dose_one,
            borderWidth: 2,
          },

          {
            borderColor: "#1BE9FB",
            backgroundColor: "rgba(27, 233, 251,0.3)",
            fill: { target: "origin", above: "rgba(27, 233, 251,0.1)" },
            label: "Total doses",
            data: total,
            borderWidth: 2,
          },
        ],
      };

      return chart_data;
    } else {
      var hLabel = [],
        total = [],
        v_18_45 = [],
        v_45_60 = [],
        v_60 = [];
      if (props.category === "Today") {
        props.data.vaccinationDoneByTimeAgeWise.forEach((item) => {
          hLabel.push(new String(item.label).slice(6));
          total.push(item.total);
          v_18_45.push(item.vac_18_45);
          v_45_60.push(item.vac_45_60);
          v_60.push(item.vac_60_above);
        });
      } else if (props.category === "Last 30 Days") {
        props.data.last30DaysAgeWiseVaccination.forEach((item) => {
          hLabel.push(
            new Date(item.vaccine_date).getDate() +
              " " +
              new Date(item.vaccine_date).toLocaleString("default", {
                month: "short",
              })
          );
          total.push(item.total);
          v_18_45.push(item.vac_18_45);
          v_45_60.push(item.vac_45_60);
          v_60.push(item.vac_60_above);
        });
      } else {
        props.data.weeklyVacAgeWiseReport.forEach((item) => {
          hLabel.push(item.label);
          total.push(item.total);
          v_18_45.push(item.vac_18_45);
          v_45_60.push(item.vac_45_60);
          v_60.push(item.vac_60_above);
        });
      }

      const chart_data = {
        labels: hLabel,
        datasets: [
          {
            borderColor: "rgba(20, 232, 251,1)",
            label: "18-44",
            backgroundColor: "rgba( 20, 232, 251,0.1)",
            data: v_18_45,
            fill: { target: "origin", above: "rgba( 20, 232, 251,0.1)" },
            borderWidth: 2,
          },
          {
            borderColor: "rgba(180, 215, 213,1)",
            label: "45-60",
            backgroundColor: "rgba( 180, 215, 213,0.1)",
            data: v_45_60,
            fill: { target: "origin", above: "rgba( 180, 215, 213,0.1)" },
            borderWidth: 2,
          },
          {
            borderColor: "rgba(98, 135, 209,1)",
            label: "60 above",
            data: v_60,
            backgroundColor: "rgba( 98, 135, 209,0.1)",
            fill: { target: "origin", above: "rgba( 98, 135, 209,0.1)" },
            borderWidth: 2,
          },
          {
            borderColor: "rgba(222, 137, 113,1)",
            backgroundColor: "rgba( 222, 137, 113,0.1)",
            label: "Total doses",
            data: total,
            fill: {
              target: "origin",
              above: "rgba( 222, 137, 113,0.1)",
            },
            borderWidth: 2,
          },
        ],
      };
      return chart_data;
    }
  };

  const options = function () {
    if (!Object.keys(props.data).length)
      return {
        aspectRatio: 3.2,
      };
    const options = {
      responsive: true,
      pointRadius: 3,
      pointBackgroundColor: "rgba(107, 109, 112,0.6)",
      aspectRatio: 3.2,
      maintainAspectRatio: true,
      tension: 0.32,
      interaction: {
        intersect: true,
        mode: "x",
      },
      scales: {
        y: {
          grid: { color: "white" },
          ticks: {
            autoSkip: false,
            callback: function (value, index, values) {
              return value / 1000 + "K";
            },

            font: {
              size: 9,
            },
          },
        },
        x: {
          grid: { color: "white" },
          ticks: {
            autoSkip: false,

            font: {
              size: 10,
            },
          },
        },
      },
      plugins: {
        propagate: true,
        legend: {
          position: "bottom",
        },
      },
    };
    return options;
  };
  console.log(props.category === "Age");

  return (
    <div className="Linechart_container">
      <div className=".Linechart_trends">
        <h4>Vaccination Trends</h4>
      </div>
      <div className="linechart_navigation">
        <div className="age-dose">
          <button
            className={
              props.aD === "Age"
                ? "linechart-navigation-selected"
                : "linechart-navigation-not-selected"
            }
            onClick={props.ageDoseSetter}
          >
            Age
          </button>
          <button
            className={
              props.aD === "Doses"
                ? "linechart-navigation-selected"
                : "linechart-navigation-not-selected"
            }
            onClick={props.ageDoseSetter}
          >
            Doses
          </button>
        </div>
        <div className="categories">
          <button
            className={
              props.category === "Today"
                ? "linechart-navigation-selected"
                : "linechart-navigation-not-selected"
            }
            onClick={(e) => props.fetchTheData(e, 0)}
          >
            Today
          </button>
          <button
            className={
              props.category === "Last 30 Days"
                ? "linechart-navigation-selected"
                : "linechart-navigation-not-selected"
            }
            onClick={(e) => props.fetchTheData(e, 1)}
          >
            Last 30 Days
          </button>
          <button
            className={
              props.category == "All Time"
                ? "linechart-navigation-selected"
                : "linechart-navigation-not-selected"
            }
            onClick={(e) => props.fetchTheData(e, 1)}
          >
            All Time
          </button>
        </div>
      </div>
      <div className="line-container">
        <Line data={setMapData()} options={options()} />
      </div>
    </div>
  );
}

export default LineChart;
