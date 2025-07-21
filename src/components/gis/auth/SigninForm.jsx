import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../../assets/Images/LoginBackground.png';
import mobileBackgroundImage from '../../../assets/Images/mobile-auth-background.png';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

const SigninForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    credentials: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    credentials: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { email: "", credentials: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Please enter Email address";
      isValid = false;
    }
    if (!formData.credentials.trim()) {
      newErrors.credentials = "Please enter the credentials";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) {
      navigate("/auth/create-account");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full font-['Segoe_UI',_sans-serif]">

      {/* Background Images */}
      <div className="w-full md:w-[70vw] h-[30vh] md:h-screen">
        <img
          src={backgroundImage}
          className="hidden md:block w-full h-full object-cover"
          alt="Desktop background"
        />
        <img
          src={mobileBackgroundImage}
          className="block md:hidden w-full h-full object-cover"
          alt="Mobile background"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-[550px] flex justify-center items-start md:pt-42 pt-10 px-4 md:px-16 bg-white relative">
        <div className="absolute top-6 right-6 text-2xl cursor-pointer text-gray-800 md:top-[150px] md:right-[130px]">×</div>

        <div className="w-full max-w-[350px]">
          <h2 className="text-2xl mb-5 text-gray-900">Sign in</h2>

          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email">Email or phone number</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="grid w-full mt-5 items-center gap-3">
            <Label htmlFor="credentials">Credentials</Label>
            <Input
              type="password"
              id="credentials"
              placeholder="Credentials"
              value={formData.credentials}
              onChange={handleChange}
            />
            {errors.credentials && <p className="text-red-500 text-sm">{errors.credentials}</p>}
          </div>

          <Button
            type="submit"
            onClick={handleSignIn}
            className="bg-[#FFD36A] text-white p-6 w-full rounded-full font-bold text-base mt-5 hover:bg-[#e6c859]"
          >
            Sign in
          </Button>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-gray-800">
                Remember me
              </Label>
            </div>
            <span className="text-sm text-gray-500 underline cursor-pointer">Need help?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
