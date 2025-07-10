import React from "react";
import backgroundImage from '../../assets/Images/LoginBackground.png';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/auth/signin");
  };

  return (
    <div className="flex h-screen w-full font-['Segoe_UI',_sans-serif]">
      {/* Left Side Background */}
      <div
        className="flex-1 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Right Side Form */}
      <div className="w-[550px] flex flex-col justify-start pt-[100px] items-end pr-[140px] bg-white relative">
        {/* Close Button */}
        <div className="absolute top-[40px] right-[60px] text-2xl cursor-pointer text-gray-800">
          ×
        </div>

        <div className="w-full max-w-[350px] space-y-6">
          {/* Title & Sign Up Link */}
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Log in</h2>
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/auth/register" className="text-[#FDB43C] hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Your email</Label>
            <Input id="email" type="email" placeholder="Email" />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Your password</Label>
            <Input id="password" type="password" placeholder="Password" />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <span className="text-sm text-gray-500 underline cursor-pointer">
              Forgot your password
            </span>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            onClick={handleLogIn}
            className="bg-[#FFD36A] text-white p-4 w-full rounded-full font-bold text-base hover:bg-[#e6c859]"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
