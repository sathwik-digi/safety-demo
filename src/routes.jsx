import {
    createBrowserRouter
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateAccount from "./pages/CreateAccount";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/Registration/Register";
import RegistrationSuccess from "./components/register/RegistrationSuccess";
import FactoryList from "./components/dashboard/FactoryList";
import Otp from "./pages/Otp";
 
export const routers = createBrowserRouter([
      {
          path: "/",
          element: <RootLayout />,
          children: [
              {
                  path: "/",
                  element: <Home />,
              },
          ],
      },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/factorylist",
        element: <DashboardLayout />,
        children: [
            {
                path: "",
                element: <FactoryList />,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "signin",
                element: <Signin />,
            },
            {
                path: "create-account",
                element: <CreateAccount />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "registration-success",
                element: <RegistrationSuccess />,
            },
            {
                path: "Otp",
                element: <Otp/>,
            },
        ],
    },
]);