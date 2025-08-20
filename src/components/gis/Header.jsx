import React from "react";
import notification from "../../assets/Icons/notification-icon.png"
import settings from "../../assets/Icons/settings-icon.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Header({ home = "" }) {

  const navigate = useNavigate();
  return (
    <>
      <div className={`flex p-2 gap-2 mb-2 md:mb-0 ${home ? "" : "border-b-1 border-gray-200"} items-center flex-row-reverse`}>
        <img src={settings} className="h-5 w-5" />
        <img src={notification} className="h-8 w-8" />
      </div>
      {home && (
        <div className="mb-8 flex gap-3 md:gap-5 pl-3 md:justify-end md:mr-20 absolute top-2 md:relative">
          <Button className="bg-white shadow-xl/10 md:shadow-xl/20 text-[10px] md:text-[15px]" onClick={() => navigate('/auth/volunteer-login')} >Volunteer Login</Button>
          <div className="border-r-[1.5px] border-[#bcbcbc]"></div>
          <Button className="bg-white shadow-xl/10 md:shadow-xl/20 text-[10px] md:text-[15px]" onClick={() => navigate('/auth/volunteer-registration')} >Volunteer Registration</Button>
        </div>
      )

      }

    </>
  );
}

export default Header;