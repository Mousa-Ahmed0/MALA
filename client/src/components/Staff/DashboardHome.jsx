import React, { useState } from "react";
import MyChart from "../MyChart";
export default function DashboardHome({ user }) {
  const [chartLabels, setChartLabels] = useState([
    ["Staff"],
    ["Patients"],
    ["Doctors"],
  ]);
  const [chartDataColors, setChartDataColors] = useState([
    ["aqua"],
    ["red"],
    ["green"],
  ]);
  const [chartData, setChartData] = useState([[3], [25], [5]]);

  return (
    <div className="ST-section ST-Dashboard">
      Hellow {user.firstname} {user.lastname}, your id is: {user.ident}
      <MyChart
        chartLabels={chartLabels}
        chartDataColors={chartDataColors}
        chartData={chartData}
      />
    </div>
  );
}
