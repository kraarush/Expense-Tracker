import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import {
  FaTachometerAlt,
  FaPlus,
  FaChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import DashboardCard from "./shared/DashboardCard";
import Charts from "./Charts";
import ExpenseTable from "./Expensetable";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
      </aside>

      <div className="grid grid-cols-5">
        <div className="px-6 pb-6 h-full border-r border-gray-300 my-5">
          <div className="text-3xl font-bold mb-8">
            <span className="text-[#1248b2]">Ex</span>pensio
          </div>

          <nav className="space-y-4 text-gray-700 font-medium">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 text-[#1248b2] p-2 rounded-lg hover:bg-blue-50 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTachometerAlt /> Dashboard
            </Link>
            <Link
              to="/add-expense"
              className="flex items-center gap-3 hover:text-[#1248b2] p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FaPlus /> Add Expense
            </Link>
            <Link
              to="/all-expense"
              className="flex items-center gap-3 hover:text-[#1248b2] p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FaChartBar /> All Expenses
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 hover:text-[#1248b2] p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <Home size={20} /> Home page
            </Link>
          </nav>
        </div>

        <main className="min-h-screen col-span-4">
          <header className="bg-white border-b px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden text-2xl text-gray-700 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <FaBars />
              </button>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
          </header>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <DashboardCard
                link={
                  "https://img.icons8.com/?size=100&id=37128&format=png&color=000000"
                }
                name={"Total Income"}
                value={50000}
              />
              <DashboardCard
                link={
                  "https://img.icons8.com/?size=100&id=7991&format=png&color=000000"
                }
                name={"Total Expenses"}
                value={30000}
              />
              <DashboardCard
                link={
                  "https://img.icons8.com/?size=100&id=13013&format=png&color=000000"
                }
                name={"Balance"}
                value={20000}
              />
            </div>

            <div className="space-y-6">
              
              <div className="flex flex-col gap-6 my-10">
                <h2 className="font-semibold text-xl">Expense charts</h2>
                <Charts />
              </div>

              <div className="my-10">
                <h2 className="font-semibold text-xl">Recent Expenses</h2>
                <ExpenseTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
