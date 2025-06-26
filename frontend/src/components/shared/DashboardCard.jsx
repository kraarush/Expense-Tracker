import React from "react";

const DashboardCard = ({ link, name, value }) => {
  return (
    <div className="flex flex-col lg:flex-row max-w-[300px] bg-white py-6 px-8 rounded-lg shadow gap-3 border items-center justify-around">
      <div className="w-15">
        <img src={link} alt="cardImage" />
      </div>
      <div>
        <p className="text-gray-600">{name}</p>
        <h2 className="text-2xl font-bold">₹{value}</h2>
      </div>
    </div>
  );
};

export default DashboardCard;
