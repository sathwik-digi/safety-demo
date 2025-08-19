import React from "react";
import notification from "../../assets/Icons/notification-icon.png"
import settings from "../../assets/Icons/settings-icon.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Header({ home = "" }) {

  const navigate = useNavigate();
  return (
    <>
      <div className={`flex p-2 gap-2 ${home ? "" : "border-b-1 border-gray-200"} items-center flex-row-reverse`}>
        <img src={settings} className="h-5 w-5" />
        <img src={notification} className="h-8 w-8" />
      </div>
      {home && (
        <div className="mb-8 flex gap-5 justify-end mr-20">
          <Button className="bg-white shadow-xl/20" onClick={()=>navigate('/auth/volunteer-login')} >Volunteer Login</Button>
          <div className="border-r-[1.5px] border-[#bcbcbc]"></div>
          <Button className="bg-white shadow-xl/20" onClick={()=>navigate('/auth/volunteer-registration')} >Volunteer Registration</Button>
        </div>
      )

      }

    </>
  );
}

export default Header;