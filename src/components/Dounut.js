import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./Dounut.css";
import { defaults } from "react-chartjs-2";
function Dounut(props) {
  const setMapData = () => {
    var first, second, third;
    if (Object.keys(props.data).length === 0) return null;
    first = props.data.topBlock.vaccination[props.first.identity];
    second = props.data.topBlock.vaccination[props.second.identity];
    third = props.data.topBlock.vaccination[props.third.identity];

    var data = {
      labels: [
        props.first.identity,
        props.second.identity,
        props.third.identity,
      ],
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
    <div className="byAge">
      <Doughnut
        data={setMapData()}
        options={{
          cutout: "75%",
          aspectRatio: 2.5,
          maintainAspectRatio: true,
          circumference: 180,
          rotation: -90,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
              },
            },
          },
          layout: {
            padding: {},
          },
        }}
      />
    </div>
  );
}

export default Dounut;
