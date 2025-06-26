import React from "react";

const Charts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white h-64 rounded-lg shadow flex items-center justify-center  border border-gray-500">
        <span className="text-gray-400">Expense Categories Chart</span>
      </div>
      <div className="bg-white h-64 rounded-lg shadow flex items-center justify-center  border border-gray-500">
        <span className="text-gray-400">Monthly Expenses Chart</span>
      </div>
    </div>
  );
};

export default Charts;
