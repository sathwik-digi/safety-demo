import React, { useState } from "react";
import backgroundImage from '../../../assets/Images/LoginBackground.png';
import mobileBackgroundImage from '../../../assets/Images/mobile-auth-background.png';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function OtpScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSignIn = () => {
    // You can validate OTP here if needed
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full font-['Segoe_UI',_sans-serif]">
         {/* Left Side Background */}
         <div className="">
           <img
             src={backgroundImage}
             className="hidden md:block w-[80vw] h-screen object-cover"
             alt="Desktop background"
           />
           <img
             src={mobileBackgroundImage}
             className="block md:hidden w-[100vw] h-[50vw]"
             alt="Mobile background"
           />
         </div>
   
      <div className="w-[500px] flex flex-col justify-start pt-10 items-end pr-[140px] bg-white relative">
        {/* <div className="absolute top-[150px] right-[130px] text-2xl cursor-pointer text-gray-800">×</div> */}

        <div className="w-full max-w-[350px]">
          <h2 className="text-2xl mb-5 text-gray-900">Sign in</h2>

          <div className="grid w-full max-w-sm mt-5 items-center gap-3">
            <Label htmlFor="otp">OTP</Label>
            <Input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            onClick={handleSignIn}
            className="bg-[#FFD36A] text-white p-6 w-full rounded-full font-bold text-base mt-5 hover:bg-[#e6c859]"
          >
            Sign in
          </Button>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500 underline cursor-pointer">Need help?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpScreen;
