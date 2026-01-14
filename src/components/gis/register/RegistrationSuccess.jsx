import React from "react";
import apGovLogo from '../../../assets/Images/ap-gov-logo.png';
import fiftyYearsLogo from '../../../assets/Images/50-years-logo.png';

const RegistrationSuccess = () => {
  return (
    <>
      {/* header */}
      <div className="flex justify-between items-start flex-wrap mx-20 my-20">
        {/* Text Info */}
        <div className="flex-1 min-w-[280px] max-w-4xl">
          <p className="text-sm md:text-base text-black font-medium leading-relaxed">
            Andhra Pradesh Industrial Infrastructure Corporation Ltd. (APIIC) was incorporated on 26th September, 1973 with Authorised Capital of ₹20.00 crores and paid up capital of ₹16.33 crores. APIIC is a wholly owned Undertaking of Government of Andhra Pradesh.
          </p>
        </div>

        {/* Logo */}
        <div className="flex gap-5">
          <img
            src={apGovLogo}
            alt="ap-gov-logo"
            className="w-30 h-30 object-contain"
          />
          <img
            src={fiftyYearsLogo}
            alt="50 Years APIIC Logo"
            className="w-28 h-30 object-contain"
          />
        </div>
      </div>

      {/* content */}
      <div className="min-h-screen flex flex-col items-center bg-white text-center px-4">
        <h1 className="text-[32px] font-semibold text-black mb-6">
          REGISTRATION SUCCEEDED
        </h1>

        <p className="text-[24px] text-gray-800 mb-2">
          Before you can login, your account must be manually activated by an administrator.
        </p>

        <p className="text-red-500 font-medium mt-6 mb-2 text-[20px]">Note :-</p>
        <p className="text-gray-700 text-[20px]">
          Before you can login, your account must be manually activated by an administrator.
        </p>
        <p className="text-gray-700 mt-1 text-[20px]">
          You should change your password as soon as you log in for the first time.
        </p>
      </div>
    </>

  );
};

export default RegistrationSuccess;
