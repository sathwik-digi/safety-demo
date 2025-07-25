import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/gis/Header";
import IRTSiteLogo from "../assets/Images/irt-logo.png";
import DashboardIcon from "../assets/Icons/dashboard-icon.png";
import InventoryManagementIcon from "../assets/Icons/inventorymanagement-icon.png";
import DocumentManagementIcon from "../assets/Icons/documentmanagement-icon.png";
import LMSIcon from "../assets/Icons/lms-icon.png";
import BlogIcon from "../assets/Icons/blog.png";
import FactoryIcon from "../assets/Icons/blog.png";
import settings from "../assets/Icons/settings.png";
import HelpIcon from "../assets/Icons/help-circle.png";
import LogOutIcon from "../assets/Icons/log-out.png";
import UnionIcon from "../assets/Icons/Union.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";

function GisDashboardLayout() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarContent = () => (
    <div className="p-5 flex flex-col gap-5 bg-white">
      <div className="flex justify-center items-center mb-4">
        <img
          src={IRTSiteLogo}
          alt="IRT Site Logo"
          className="w-[177px] h-[64px] object-contain"
        />
      </div>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/gis/dashboard")}> <img src={DashboardIcon} alt="Dashboard icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#344054]">Dashboard</p> </div>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/gis/role-base-access")}> <img src={DashboardIcon} alt="Dashboard icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#344054]">Sub Admin</p> </div>
      <div className="flex items-center gap-3 cursor-pointer"> <img src={InventoryManagementIcon} alt="Inventory icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#344054]">Inventory Management</p> </div>
      <div className="flex items-center gap-3 cursor-pointer"> <img src={DocumentManagementIcon} alt="Document icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#344054]">Document Management</p> </div>
      <div className="flex items-center gap-3 cursor-pointer"> <img src={LMSIcon} alt="LMS icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#344054]">LMS</p> </div>
      <div className="flex items-center gap-3 cursor-pointer"> <img src={BlogIcon} alt="Blog icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#344054]">Blog</p> </div>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/gis/factorylist")}> <img src={FactoryIcon} alt="Factory icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#344054]">Factory List</p> </div>
      <div className="pt-[50px] pb-[80px]"> <p className="text-[10px] font-medium text-[#757575] tracking-wide uppercase mb-2">Settings</p>
        <div className="flex items-center justify-between cursor-pointer"> <div className="flex items-center gap-3"> <img src={settings} alt="Settings icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#344054]">Settings</p> </div> <img src={UnionIcon} alt="Chevron icon" className="w-[9.33px] h-[5.33px]" style={{ color: "#757575" }} /> </div>
      </div>
      <div className="flex items-center gap-3 cursor-pointer"> <img src={HelpIcon} alt="Help icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#344054]">Help</p> </div>
      <div className="flex items-center gap-3 cursor-pointer"> <img src={LogOutIcon} alt="Logout icon" className="w-5 h-5" /> <p className="text-[14px] font-medium text-[#D55F5A]">Logout Account</p> </div>
    </div>
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      {!isMobile ? (
        <div className="fixed top-0 left-0 w-[18%] h-screen border-r-2 border-[#b8b9ba] bg-white z-50">
          <SidebarContent />
        </div>
      ) : null}

      {/* Header and Content */}
      <div className={!isMobile ? "ml-[18%] w-[82%]" : "w-full"}>
        <div className="w-full flex items-center justify-between p-4 border-b bg-white">
          {isMobile && (
            <Sheet>
              <SheetTrigger className="mr-4">
                <AlignLeft className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px]">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          )}
          {/* <img
            src={IRTSiteLogo}
            alt="IRT Site Logo"
            className="h-[50px] object-contain"
          /> */}
        </div>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default GisDashboardLayout;
