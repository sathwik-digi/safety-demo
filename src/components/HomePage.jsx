import React from "react";
import { useNavigate } from "react-router-dom";
import HomeBgImage from "../assets/Images/Home-page-bg.jpg";
import { Button } from "@/components/ui/button";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeBgImage})` }}>
      <div className="grid grid-cols-2 justify-items-center gap-40 absolute top-120 left-[7vw]">
        <h2 className="text-white w-140">
          Andhra Pradesh Industrial Infrastructure Corporation Ltd.
          (APIIC) was incorporated on 26th September, 1973 with
          Authorised Capital of Rs.20.00 crores and paid up capital
          of Rs.16.33 crores. APIIC is a wholly owned Undertaking of
          Government of Andhra Pradesh.
        </h2>
        <div className="flex flex-col gap-4 ">
          <Button className="bg-white w-70 rounded-[20px]" onClick={()=>navigate('/auth/login')}>Login</Button>
          <Button className="bg-white w-70 rounded-[20px]" onClick={()=>navigate('/auth/register')}>Register</Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;