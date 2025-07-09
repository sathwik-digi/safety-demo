import React from "react";
import notification from "../assets/Icons/notification-icon.png"
import settings from "../assets/Icons/settings-icon.png"
function Header() {
  return (
    <div className="flex p-3 gap-2 border-b-1 border-gray-200 items-center flex-row-reverse">
      <img src={settings} className="h-5 w-5" />
      <img src={notification} className="h-8 w-8" />
    </div>
  );
}

export default Header;