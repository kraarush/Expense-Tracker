import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: "Expenses (₹)",
        data: data.map(item => item.total),
        backgroundColor: "#4BC0C0"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1000
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-around">
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <div className="w-full h-4/5 px-2">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyBarChart;
