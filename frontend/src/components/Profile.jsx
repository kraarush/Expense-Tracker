import React from "react";
import { Construction } from "lucide-react";
import Navbar from "./shared/Navbar";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center text-xl md:text-3xl lg:text-4xl font-semibold p-8 gap-4 h-[70vh]">
        <Construction className="w-12 h-12 text-yellow-500" />
        <p>I am working on this page!</p>
        <p className="text-base md:text-lg text-gray-600">
          The profile section is currently under development and will be
          available soon.
        </p>
      </div>
    </div>
  );
};

export default Profile;
