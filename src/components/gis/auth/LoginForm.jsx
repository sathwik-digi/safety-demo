import React, { useState } from "react";
import backgroundImage from '../../../assets/Images/LoginBackground.png';
import mobileBackgroundImage from '../../../assets/Images/mobile-auth-background.png';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"
import LoadingComponent from "../../../lib/LoadingComponent";

const REACT_APP_API = import.meta.env.VITE_REACT_APP_API;

function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phoneNumber: ""
  });

  const [errors, setErrors] = useState({
    phoneNumber: ""
  });

  const newErrors = {
    phoneNumber: ""
  };


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

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
        setLoading(true);
        const mobileNumber = formData.phoneNumber
        const res = await axios.post(`https://sm-authentication-${REACT_APP_API}/auth/getOtp?mobileNumber=${mobileNumber}`);
        const response = res.data;
        if (response?.success) {
          setLoading(false);
          toast.success("OTP sent successfully");
          navigate("/auth/Otp", {
            state: { mobileNumber },
          });
        }
        else {
          setLoading(false);
          toast.error('Please enter a valid mobile number', {
            style: {
              backgroundColor: '#ff4d4f',
              color: '#fff',
            },
          });
        }
    }
  };

  return (
    <>
      {loading && <LoadingComponent />}
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

          {/* Close Button */}
          {/* <div className="absolute top-[40px] right-[60px] text-2xl cursor-pointer text-gray-800">
          ×
        </div> */}

          {/* Login Form */}
          <div className="w-full max-w-[350px] space-y-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Admin Login
              </h2>
                <p className="text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <Link to="#" className="text-[#FDB43C] hover:underline">
                    Sign up
                  </Link>
                </p>
            </div>

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
          </div>
        </div>
      </div>
    </>

  );
}

export default LoginForm;
