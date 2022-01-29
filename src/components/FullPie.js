import React from "react";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import "./FullPie.css";
function FullPie(props) {
  const setMapData = () => {
    var first, second, third;
    if (Object.keys(props.data).length === 0) return null;
    first = props.data.vaccinationByAge[props.first.identity];
    second = props.data.vaccinationByAge[props.second.identity];
    third = props.data.vaccinationByAge[props.third.identity];

    var data = {
      labels: ["18-45", "45-60", "above 60"],
      datasets: [
        {
          data: [first, second, third],
          backgroundColor: [
            props.first.color,
            props.second.color,
            props.third.color,
          ],
        },
      ],
    };
    return data;
  };
  return (
    <div className="full">
      <Doughnut
        data={setMapData()}
        options={{
          aspectRatio: 1.5,
          maintainAspectRatio: true,

          plugins: {
            legend: { position: "bottom", labels: { usePointStyle: true } },
          },
          layout: {
            padding: {
              bottom: 0,
              left: 0,
              right: 0,
            },
          },
        }}
      />
    </div>
  );
}

export default FullPie;
