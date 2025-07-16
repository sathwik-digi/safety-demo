import React from "react";
import Irtlogo from "../../assets/Images/irt-logo.png"

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-2xl font-bold text-black mb-6">
        REGISTRATION SUCCEEDED
      </h1>

      <p className="text-lg text-gray-800 mb-2">
        Before you can login, your account must be manually activated by an administrator.
      </p>

      <p className="text-red-500 font-medium mt-6 mb-2">Note :-</p>
      <p className="text-gray-700">
        An email containing your customer ID and password has been sent to your e-mail address
      </p>
      <p className="text-gray-700 mt-1">
        You should change your password as soon as you log in for the first time.
      </p>

      <img
        src={Irtlogo}
        alt="irt logo"
        className="w-40 h-20 mt-8"
      />
    </div>
  );
};

export default RegistrationSuccess;
