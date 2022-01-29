import React from "react";
import { Line } from "react-chartjs-2";
import "./RuralUrban.css";
function RuralUrban(props) {
  const chartData = () => {
    if (Object.keys(props.data).length === 0) return null;
    const hLabel = [];
    const rural = [];
    const urban = [];
    for (var i = 15; i < 30; i++) {
      hLabel.push(
        new Date(props.data.last30DaysVaccination[i].vaccine_date).getDate() +
          " " +
          new Date(
            props.data.last30DaysVaccination[i].vaccine_date
          ).toLocaleString("default", {
            month: "short",
          })
      );

      rural.push(props.data.last30DaysVaccination[i].rural);
      urban.push(props.data.last30DaysVaccination[i].urban);
    }
    const chart_data = {
      labels: hLabel,
      datasets: [
        {
          borderColor: "#15E8FB",
          fill: { target: "origin", above: "rgba(21, 232, 251,0.1)" },
          label: "Rural",
          data: rural,
        },
        {
          borderColor: "rgb(98, 135, 209)",
          fill: { target: "origin", above: "rgba(98, 135, 209,0.1)" },
          label: "Urban",
          data: urban,
        },
      ],
    };
    return chart_data;
  };

  const options = function () {
    if (!Object.keys(props.data).length)
      return {
        aspectRatio: 2.5,
      };
    const options = {
      responsive: true,
      aspectRatio: 2.5,
      tension: 0.32,
      maintainAspectRatio: true,
      scales: {
        y: {
          grid: { color: "#FAFCFD" },
          ticks: {
            autoSkip: false,

            font: {
              size: 9,
            },
          },
        },
        x: {
          grid: { color: "#FAFCFD" },
          ticks: {
            autoSkip: false,

            font: {
              size: 10,
            },
          },
        },
      },
      plugins: {
        filler: {
          propagate: true,
        },
        legend: {
          position: "bottom",
        },
      },
    };
    return options;
  };
  return (
    <div className="Rural-Urban-container">
      <div className="Rural-Urban-container_heading">
        <h4>Rural vs Urban Trend</h4>
      </div>
      <div className="Rural-Urban-container_chart">
        <Line data={chartData()} options={options()} />
      </div>
    </div>
  );
}

export default RuralUrban;
