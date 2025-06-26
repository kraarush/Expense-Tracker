import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: "Expenses",
        data: data.map(item => item.total),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56",
          "#4BC0C0", "#9966FF", "#FF9F40"
        ],
        borderColor: "#fff",
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-around">
      <h2 className="text-xl font-semibold">Category-wise Expenses</h2>
      <div className="h-4/5 ">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default CategoryPieChart;
