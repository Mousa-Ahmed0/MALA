import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const ChartExample = ({ chartLabels, chartData, chartDataColors }) => {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  // Sample data for the chart
  const data = {
    labels: ["users"],
    datasets: [
      {
        label: chartLabels[0],
        data: chartData[0],
        backgroundColor: chartDataColors[0],
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: chartLabels[1],
        data: chartData[1],
        backgroundColor: chartDataColors[1],
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: chartLabels[2],
        data: chartData[2],
        backgroundColor: chartDataColors[2],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};
  return (
    <div>
      <h2>Bar Chart Example</h2>
      <Bar data={data} options={options}></Bar>
    </div>
  );
};

export default ChartExample;
