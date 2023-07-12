import React, { useEffect } from "react";
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";

const PieChart = (props) => {
  const { labels, data, height, colors } = props;
  useEffect(() => {
    new Chart("#chart", {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            values: data,
          },
        ],
      },
      height,
      colors,
    });
  });

  return <div id="chart" />;
};

export default PieChart;
