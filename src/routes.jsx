import {
    createBrowserRouter
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import GisDashboardLayout from "./layouts/GisDashboardLayout";
import IrtDashboardLayout from "./layouts/IrtDashboardLayout";
import CreateAccount from "./pages/CreateAccount";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/Registration/Register";
import RegistrationSuccess from "./components/gis/register/RegistrationSuccess";
import FactoryList from "./components/gis/dashboard/FactoryList";
import Otp from "./pages/Otp";
import FactoryDetails from "./components/gis/dashboard/FactoryDetails";
import RoleBaseAccess from "./components/gis/dashboard/RoleBaseAccess";
 
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
        path:"gis",
        element: <GisDashboardLayout />,
        children:[
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "factorylist",
                element: <FactoryList />,
            },
            {
                path: "factory-details",
                element: <FactoryDetails />,
            },
            {
                path: "role-base-access",
                element: <RoleBaseAccess />,
            }
        ]
    },
    {
        path:"irt",
        element: <IrtDashboardLayout />,
        children:[
            {
                path: "dashboard",
                element: <Dashboard />,
            },
        ]
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