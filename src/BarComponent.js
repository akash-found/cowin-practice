import React from "react";
import { Bar } from "react-chartjs-2";
import "./BarComponent.css";

function BarComponent(props) {
  const chartData = () => {
    if (Object.keys(props.data).length === 0) return null;
    const hLabel = [];
    const dose1 = [];
    const dose2 = [];
    props.data.getBeneficiariesGroupBy.forEach((item) => {
      hLabel.push(item.title);
      dose1.push(item.partial_vaccinated);
      dose2.push(item.totally_vaccinated);
    });
    const chart_data = {
      labels: hLabel,
      datasets: [
        {
          borderColor: "#E300EB",
          label: "Dose 1",
          data: dose1,
          backgroundColor: "#E300EB",
        },
        {
          borderColor: "#00E0F5",
          label: "Dose 2",
          data: dose2,
          backgroundColor: "#00E0F5",
        },
      ],
    };
    return chart_data;
  };

  const options = function () {
    if (!Object.keys(props.data).length)
      return {
        aspectRatio: 4,
      };
    const options = {
      barThickness: 10,
      responsive: true,
      aspectRatio: 4,
      maintainAspectRatio: true,
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
        legend: {
          position: "bottom",
        },
      },
    };
    return options;
  };
  return (
    <div className="Bar-container">
      <div className="Bar-container_heading">
        <h4>Vaccination Coverage</h4>
      </div>
      <div className="Bar-container_chart">
        <Bar data={chartData()} options={options()} />
      </div>
    </div>
  );
}

export default BarComponent;
