// LineChart.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

const LineChart = ({ darkMode }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
  );
  // Define colors based on darkMode
  const gridColor = darkMode ? "lightGrey" : "rgba(0,0,0,0.1)";
  const borderColor = "aqua";
  const labelColor = darkMode ? "white" : "black";
  const tickColor = darkMode ? "white" : "black";
  const axisLineColor = darkMode ? "white" : "black";

  // Sample data for the line chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "My Line Chart",
        data: [1200, 1900, 300, 500, 200, 700],
        fill: false,
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y + " NIS";
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
          display: false,
        },
        ticks: {
          color: tickColor,
        },
        title: {
          color: labelColor,
        },
      },
      y: {
        grid: {
          color: gridColor,
          display: false,
        },
        ticks: {
          color: tickColor,
        },
        title: {
          color: labelColor,
        },
      },
    },
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
