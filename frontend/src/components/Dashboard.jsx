import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlus,
  FaChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { LogOut, Home } from "lucide-react";
import DashboardCard from "./shared/DashboardCard";
import Charts from "./Charts";
import ExpenseTable from "./Expensetable";
import { EXPENSE_API_END_POINT, USER_API_END_POINT } from "@/utils/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalExpense, setTotalExpense] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      dispatch(setUser(null));
      await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      toast.success("You have been logged out successfully!!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout, try again later");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get(
          `${EXPENSE_API_END_POINT}/category`,
          { withCredentials: true }
        );
        setTotalExpense(categoryRes.data.totalMoney);
      } catch (err) {
        console.log("Error while getting chart data", err.message);
      }
    };

    fetchData();
  }, []);

  const navLinks = [
    { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/add-expense", icon: <FaPlus />, label: "Add Expense" },
    { to: "/all-expense", icon: <FaChartBar />, label: "All Expenses" },
    { onClick: logout, icon: <LogOut />, label: "Logout" }, // ✅ modified
    { to: "/", icon: <Home size={20} />, label: "Home Page" },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 px-6 py-5">
        <div className="text-3xl font-bold mb-8">
          <span className="text-[#1248b2]">Ex</span>pensio
        </div>
        <nav className="space-y-4 text-gray-700 font-medium">
          {navLinks.map(({ to, onClick, icon, label }) =>
            to ? (
              <Link
                key={label}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              >
                {icon} {label}
              </Link>
            ) : (
              <button
                key={label}
                onClick={onClick}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 w-full text-left"
              >
                {icon} {label}
              </button>
            )
          )}
        </nav>
      </aside>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-white bg-opacity-30 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 w-90 h-full bg-white z-50 shadow-md px-6 py-5 text-2xl">
            <div className="flex justify-end mb-4">
              <FaTimes
                onClick={() => setSidebarOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="text-3xl font-bold mb-8">
              <span className="text-[#1248b2]">Ex</span>pensio
            </div>
            <nav className="space-y-4 text-gray-700 font-medium">
              {navLinks.map(({ to, onClick, icon, label }) =>
                to ? (
                  <Link
                    key={label}
                    to={to}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    {icon} {label}
                  </Link>
                ) : (
                  <button
                    key={label}
                    onClick={onClick}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 w-full text-left"
                  >
                    {icon} {label}
                  </button>
                )
              )}
            </nav>
          </aside>
        </>
      )}

      <main className="flex-1">
        <header className="bg-white border-b px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center justify-between gap-4 w-full">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Dashboard
            </h1>
            <button
              className="lg:hidden text-2xl text-gray-700 hover:text-gray-900"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 ">
            <DashboardCard
              link="https://img.icons8.com/?size=100&id=37128&format=png&color=000000"
              name="Total Income"
              value={50000}
            />
            <DashboardCard
              link="https://img.icons8.com/?size=100&id=7991&format=png&color=000000"
              name="Total Expenses"
              value={totalExpense}
            />
            <DashboardCard
              link="https://img.icons8.com/?size=100&id=13013&format=png&color=000000"
              name="Balance"
              value={50000 - totalExpense}
            />
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="font-semibold text-xl mb-4">Expense Charts</h2>
              <Charts />
            </div>

            <div>
              <h2 className="font-semibold text-xl mb-4">Recent Expenses</h2>
              <ExpenseTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
