import React, { useState } from "react";
import backgroundImage from '../../../assets/Images/LoginBackground.png';
import mobileBackgroundImage from '../../../assets/Images/mobile-auth-background.png';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"
const REACT_APP_API = import.meta.env.VITE_REACT_APP_API;

function LoginForm() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phoneNumber: ""
  });

  const newErrors = {
    email: "",
    password: "",
    phoneNumber: ""
  };


  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let isValid = true;

    
    if (!isAdminMode) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      }
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
        isValid = false;
      }
    } else {
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      if (isAdminMode) {
        const mobileNumber=formData.phoneNumber
        console.log(mobileNumber,"Mbile number")
       
       const res = await axios.post(`${REACT_APP_API}/v1/auth/getOtp?mobileNumber=${mobileNumber}`);
        console.log(res,"Res")
        const response =res.data;
        console.log(response,"response")
        if(response.success){
          navigate("/auth/Otp", {
            state: { mobileNumber },
          });
          
        }
        else{
          toast.error('Please enter a valid mobile number', {
            style: {
              backgroundColor: '#ff4d4f',
              color: '#fff',
            },
          });
        }
      } else {
        const res = await axios.post(`${REACT_APP_API}/v1/auth/login`, {
          email: formData.email,
          password: formData.password,
          mobileNumber: "",
          otp: ""
        });
        const response = res.data;

        if (response.success) {
          navigate("/gis/dashboard");
        }
        else {
          toast.error('Please check your mail and password', {
            style: {
              backgroundColor: '#ff4d4f',
              color: '#fff',
            },
          });
        }
      }
    }
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

      {/* Right Side Form */}
      <div className="w-full md:w-[550px] flex flex-col justify-start md:pt-42 pt-10 px-4 md:px-16 bg-white relative">
        {/* Toggle */}
        <div className="flex ml-50 mb-1">
          <div className="flex items-center space-x-2">
            <Switch id="admin-mode" checked={isAdminMode} onCheckedChange={setIsAdminMode} />
            <Label htmlFor="admin-mode">{isAdminMode ? "Switch to User" : "Switch to Admin"}</Label>
          </div>
        </div>

        {/* Close Button */}
        {/* <div className="absolute top-[40px] right-[60px] text-2xl cursor-pointer text-gray-800">
          ×
        </div> */}

        {/* Login Form */}
        <div className="w-full max-w-[350px] space-y-6">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3" />
            <h2 className="text-2xl font-semibold text-gray-900">
              {isAdminMode ? "Admin Login" : "User Login"}
            </h2>
            {!isAdminMode && (
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link to="/auth/register" className="text-[#FDB43C] hover:underline">
                  Sign up
                </Link>
              </p>
            )}
          </div>

          {isAdminMode ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  maxLength={10}
                  pattern="\d{10}"
                  required
                />

                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>

              <div className="text-sm text-gray-600">Need help?</div>

              <Button
                type="submit"
                onClick={handleLogin}
                className="bg-[#FFD36A] text-white p-4 w-full rounded-full font-bold text-base hover:bg-[#e6c859]"
              >
                Get OTP
              </Button>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email">Your email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Your password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="flex justify-end">
                <span className="text-sm text-gray-500 underline cursor-pointer">
                  Forgot your password?
                </span>
              </div>

              <Button
                type="submit"
                onClick={handleLogin}
                className="bg-[#FFD36A] text-white p-4 w-full rounded-full font-bold text-base hover:bg-[#e6c859]"
              >
                Log in
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
