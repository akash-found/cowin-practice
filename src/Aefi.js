import React from "react";
import { Line } from "react-chartjs-2";
import "./Aefi.css";
function Aefi(props) {
  const chartData = () => {
    if (Object.keys(props.data).length === 0) return null;
    const hLabel = [];
    const aefi = [];
    props.data.last30DaysAefi.forEach((item) => {
      hLabel.push(
        new Date(item.vaccine_date).getDate() +
          " " +
          new Date(item.vaccine_date).toLocaleString("default", {
            month: "short",
          })
      );

      aefi.push(item.aefi);
    });
    const chart_data = {
      labels: hLabel,
      datasets: [
        {
          borderColor: "#F54394",
          fill: { target: "origin", above: "#FEECF4" },
          label: "Aefi",
          data: aefi,
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
      maintainAspectRatio: true,
      tension: 0.32,
      scales: {
        y: {
          grid: { color: "white" },
          ticks: {
            autoSkip: false,

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
        legend: {
          position: "bottom",
        },
      },
    };
    return options;
  };
  return (
    <div className="aefi-container">
      <div className="aefi-container_heading">
        <h4>Aefi Reported</h4>
        <h4>Overall:{props.data.aefiPercentage}</h4>
      </div>
      <div className="aefi-container_chart">
        <Line data={chartData()} options={options()} />
      </div>
    </div>
  );
}

export default Aefi;
