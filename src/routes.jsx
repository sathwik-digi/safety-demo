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
import RoleBaseAccess from "./components/gis/dashboard/sub-admin/RoleBaseAccess";
import DashboardPage from "./components/irt/dashboard/DashboardPage";
import AddIncident from "./components/irt/dashboard/AddIncident";
import ViewIncident from "./components/irt/dashboard/ViewIncident";
import ViewIncidentTaskDetails from "./components/irt/dashboard/ViewIncidentTaskDetails";
import IncidentTree from "./components/irt/dashboard/IncidentTree";
import EditRole from "./components/gis/dashboard/sub-admin/EditRole";
import RolePermissions from "./components/gis/dashboard/sub-admin/RolePermissions";
import VolunteerRegistrationForm  from "./components/gis/register/VolunteerRegistrationForm";
import VolunteerRegistrationSuccess from "./components/gis/register/VolunteerRegistrationSuccess";
import DynamicForm from "./components/DynamicForm";
import LocationPage from "./components/irt/dashboard/LocationPage";
import Forms from "./components/Forms";
import UserForms from "./components/UserForms";
import FormDetails from './components/FormDetails';
import UserAnswers from './components/UserAnswers';
import VolunteerLogin from "./components/gis/auth/VolunteerLogin";
import GISDynamicForm from './components/gis/DynamicForm';
import GisForms from './components/gis/Forms';
import GisFormDetails from "./components/gis/GisFormDetails";
import GisUserAnswers from "./components/gis/GisUserAnswers";
import GisDistrictForms from "./components/gis/GisDistrictForms";
import GisDistrictAnswerForm from "./components/gis/GisDistrictAnswerForm";
 
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
            },
            {
                path: "edit-role",
                element: <EditRole />,
            },
            {
                path: "role-permissions",
                element: <RolePermissions />,
            },
            {
                path:"formCreation",
                element:<GISDynamicForm/>
            },
            {
                path:"gisForms",
                element:<GisForms/>
            },
            {
                path:"formDetails",
                element:<GisFormDetails/>
            },
            {
                path:"userAnswers",
                element:<GisUserAnswers/>
            },
            {
                path:"gisDistrictForms",
                element:<GisDistrictForms/>
            },
            {
                path:"gis-district-answerform",
                element:<GisDistrictAnswerForm/>
            }
           
        ]
    },
    {
        path:"irt",
        element: <IrtDashboardLayout />,
        children:[
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "addincident",
                element: <AddIncident />,
            },
            {
                path: "viewincident",
                element: <ViewIncident />,
            },
            {
                path: "viewincidenttaskdetails",
                element: <ViewIncidentTaskDetails />,
            },
            {
                path: "incident-tree",
                element: <IncidentTree />,
            },
            {
                path:"formCreation",
                element:<DynamicForm/>
            },
            {
                path:"location",
                element:<LocationPage />
            },

            {
                path:"forms",
                element:<Forms/>
            },
            {
                path:"userForms",
                element:<UserForms/>
            },
            {
                path:"formDetails",
                element:<FormDetails/>
            },
            {
                path:"userAnswers",
                element:<UserAnswers/>
            }
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
                path: "volunteer-login",
                element: <VolunteerLogin />,
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
            {
                path:"volunteer-registration",
                element:<VolunteerRegistrationForm/>
            },
            {
                path:"volunteerRegistrationSuccess",
                element:<VolunteerRegistrationSuccess/>
            }
        ],
    },
]);