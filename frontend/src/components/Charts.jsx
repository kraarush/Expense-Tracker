import React, { useEffect, useState } from "react";
import axios from "axios";
import { EXPENSE_API_END_POINT } from "@/utils/api";
import { Loader2 } from "lucide-react";
import CategoryPieChart from "./CategoryPieChart";
import MonthlyBarChart from "./MonthlyBarChart";

const Charts = () => {
  const [pieChartData, setCategoryData] = useState(null);
  const [barGraphData, setMonthlyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get(
          `${EXPENSE_API_END_POINT}/category`,{withCredentials:true}
        );
        console.log(categoryRes.data.summary);
        setCategoryData(categoryRes.data.summary);

        const monthRes = await axios.get(`${EXPENSE_API_END_POINT}/month`,{withCredentials:true});
        setMonthlyData(monthRes.data.summary);
      } catch (err) {
        console.log("Error while getting chart data", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white h-64 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[50vh]">
        {barGraphData ? (
          barGraphData.length > 0 ? (
            <MonthlyBarChart data={barGraphData} />
          ) : (
            <p className="text-gray-500">No monthly expenses to show.</p>
          )
        ) : (
          <div className="flex items-center">
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            <p className="text-gray-500">Loading Monthly Chart...</p>
          </div>
        )}
      </div>
      <div className="bg-white h-64 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-h-[50vh]">
        {pieChartData ? (
          pieChartData.length > 0 ? (
            <CategoryPieChart data={pieChartData} />
          ) : (
            <p className="text-gray-500">No category data to display.</p>
          )
        ) : (
          <div className="flex items-center">
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            <p className="text-gray-500">Loading Category Chart...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
