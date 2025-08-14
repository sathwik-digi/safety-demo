import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/gis/Header";
import IRTSiteLogo from "../assets/Images/irt-logo.png";
import settings from "../assets/Icons/settings.png";
import HelpIcon from "../assets/Icons/help-circle.png";
import LogOutIcon from "../assets/Icons/log-out.png";
import UnionIcon from "../assets/Icons/Union.png";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { clearCookie, getCookie } from "../https"
import { accessToken } from "../constants";
import RenderIrtSvgIcon from "../lib/RenderIrtSvgIcon";

function IrtDashboardLayout() {

  const token = getCookie(accessToken);
  const siteName = getCookie("siteName");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  else if (siteName === "gis") {
    return <Navigate to="/gis/dashboard" replace />
  }

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const menuItems = [
    { label: "Dashboard", path: "/irt/dashboard" },
    { label: "IRT Tree", path: "/irt/incident-tree" },
    { label: "Status" },
    { label: "Messages" },
    { label: "Location", path: "/irt/location" },
    { label: "Member's" },
    { label: "View Task" },
    { label: "View Incident", path: "/irt/viewincident" },
    { label: "Forms", path:"/irt/forms"}
  ];

  const logoutHandler = () => {
    clearCookie();
    navigate("/auth/login");
  }

  const handleClick = (item, index) => {
    if (item.path) {
      navigate(item.path)
    }
    setActiveTab(index);
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 w-[18%] h-screen border-r-2 border-[#b8b9ba] p-5 flex-col gap-5 bg-white z-50">
        <div className="flex justify-center items-center mb-4">
          <img
            src={IRTSiteLogo}
            alt="IRT Site Logo"
            className="w-[177px] h-[64px] object-contain"
          />
        </div>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleClick(item, index)}
          >
            <RenderIrtSvgIcon index={index} activeTab={activeTab} />
            <p className="text-[14px] font-medium text-[#344054]">{item.label}</p>
          </div>
        ))}

        <div className="pt-[50px] pb-[80px]">
          <p className="text-[10px] font-medium text-[#757575] tracking-wide uppercase mb-2">
            Settings
          </p>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <img src={settings} alt="Settings icon" className="w-5 h-5" />
              <p className="text-[14px] font-medium text-[#344054]">Settings</p>
            </div>
            <img
              src={UnionIcon}
              alt="Chevron icon"
              className="w-[9.33px] h-[5.33px]"
              style={{ color: "#757575" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <img src={HelpIcon} alt="Help icon" className="w-5 h-5" />
          <p className="text-[14px] font-medium text-[#344054]">Help</p>
        </div>

        <div className="flex items-center gap-3 cursor-pointer" onClick={logoutHandler}>
          <img src={LogOutIcon} alt="Logout icon" className="w-5 h-5" />
          <p className="text-[14px] font-medium text-[#D55F5A]">Logout Account</p>
        </div>
      </div>

      {/* Mobile Sidebar Sheet */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-4 py-4 bg-white border-b">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  {menuItems.map((item, index) => (
                    <SheetClose asChild key={index}>
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => item.path && navigate(item.path)}
                      >
                        <RenderIrtSvgIcon index={index} activeTab={activeTab} />
                        <p className="text-[14px] font-medium text-[#344054]">{item.label}</p>
                      </div>
                    </SheetClose>
                  ))}
                  <div className="flex items-center gap-3 cursor-pointer">
                    <img src={settings} alt="Settings icon" className="w-5 h-5" />
                    <p className="text-[14px] font-medium text-[#344054]">Settings</p>
                  </div>
                  <div className="flex items-center gap-3 cursor-pointer">
                    <img src={HelpIcon} alt="Help icon" className="w-5 h-5" />
                    <p className="text-[14px] font-medium text-[#344054]">Help</p>
                  </div>
                  <div className="flex items-center gap-3 cursor-pointer" onClick={logoutHandler}>
                    <img src={LogOutIcon} alt="Logout icon" className="w-5 h-5" />
                    <p className="text-[14px] font-medium text-[#D55F5A]">Logout Account</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <img src={IRTSiteLogo} alt="IRT Logo" className="h-10 object-contain" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-[18%] w-full md:w-[82%] mt-[60px] md:mt-0">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default IrtDashboardLayout;
