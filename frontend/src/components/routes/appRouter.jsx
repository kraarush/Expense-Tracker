import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import NotFound from "../NotFound";
import Home from "../Home";
import Dashboard from "../Dashboard";
import AddExpense from "../AddExpense";
import ShowAllExpense from "../ShowAllExpense";
import SingleExpense from "../SingleExpense";
import Profile from "../Profile";

const appRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/add-expense", element: <AddExpense /> },
    { path: "/expense/:id", element: <SingleExpense /> },
    { path: "/all-expense", element: <ShowAllExpense /> },
    { path: "/profile", element: <Profile /> },

    { path: "*", element: <NotFound /> },
]);

export default appRouter;