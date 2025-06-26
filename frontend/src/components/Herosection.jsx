import React from "react";
import Typed from "./shared/Typed";

const Herosection = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center my-16 gap-5">
        <div className="md:text-6xl sm:text-3xl text-2xl text-center">
          <h1 className="font-bold">
            Track, Manage & <br />
            Own Your <span className="text-[#1248b2]">Expenses</span>
          </h1>
        </div>

        <div className="flex justify-center max-[460px]:min-h-[60px] w-full px-4 m-3 text-lg sm:text-2xl md:text-4xl text-gray-500">
          <Typed
            messages={[
              "Take control of your money 💰",
              "Track every expense, effortlessly 📊",
              "Manage your finances like a pro 🧠",
              "Save smart, spend wiser 💡",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Herosection;