import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import NotFound from "../NotFound";
import Home from "../Home";
import Dashboard from "../Dashboard";

const appRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "*", element: <NotFound /> },
]);

export default appRouter;