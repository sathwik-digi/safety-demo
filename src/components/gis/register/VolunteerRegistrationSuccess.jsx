import fiftyYearsLogo from '../../../assets/Images/50-years-logo.png';

const VolunteerRegistrationSuccess = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      {/* Header Row: Info + Logo */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        {/* Text Info */}
        <div className="flex-1 min-w-[280px] max-w-4xl">
          <p className="text-sm md:text-base text-black font-medium leading-relaxed">
            Andhra Pradesh Industrial Infrastructure Corporation Ltd. (APIIC) was incorporated on 26th September, 1973 with Authorised Capital of ₹20.00 crores and paid up capital of ₹16.33 crores. APIIC is a wholly owned Undertaking of Government of Andhra Pradesh.
          </p>
        </div>

        {/* Logo */}
        <div className="w-24 md:w-32 flex-shrink-0">
          <img
            src={fiftyYearsLogo}
            alt="50 Years APIIC Logo"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-center text-black">
        Application for Volunteer Registration Is Succeeded
      </h2>

      {/* Main message */}
      <p className="text-md md:text-lg text-center text-gray-800">
        The message confirms that your application has been successfully submitted to the organization.
      </p>

      {/* Note Section */}
      <div className="space-y-2 text-sm md:text-base text-gray-700 text-center max-w-4xl mx-auto">
        <p className="text-red-600 font-medium">Note :-</p>
        <p>
          The message may also outline the next steps in the volunteer process,
          such as when you can expect to hear back or if further action is required.
        </p>
        <p>
          The organization may contact you for an interview, background check, or to schedule training.
        </p>
      </div>
    </div>
  );
};

export default VolunteerRegistrationSuccess;
