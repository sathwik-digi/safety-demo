import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeBgImage from "../../assets/Images/Home-page-bg.jpg";
import HomeBgImageForMobile from "../../assets/Images/Home-page-bgmobile.jpg";
import { Button } from "@/components/ui/button";

function HomePage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
    className="h-screen w-screen flex justify-center items-center bg-center md:bg-cover"
    style={{
      backgroundImage: `url(${isMobile ? HomeBgImageForMobile : HomeBgImage})`,
      backgroundSize: isMobile ? "cover" : "cover",
      backgroundRepeat: "no-repeat",
    }}
  >
      <div className="flex flex-row gap-60 md:100 xl:gap-140 md:mt-40">
        <h2 className="text-white max-w-[35rem] hidden md:block">
          Andhra Pradesh Industrial Infrastructure Corporation Ltd.
          (APIIC) was incorporated on 26th September, 1973 with
          Authorised Capital of Rs.20.00 crores and paid up capital
          of Rs.16.33 crores. APIIC is a wholly owned Undertaking of
          Government of Andhra Pradesh.
        </h2>
        <div className="flex flex-col gap-4 mt-30 md:mt-0">
          <Button
            className="bg-white w-70 rounded-[20px]"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
          <Button
            className="bg-white w-70 rounded-[20px]"
            onClick={() => navigate("/auth/register")}
          >
            Industry Registration
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
