import React from "react";
import Featurescard from "./shared/Featurescard";

const Features = () => {
  return (
    <>
      <div className="mx-4 max-w-3xl sm:max-w-6xl lg:mx-auto my-16 ">
        <div className="text-start text-2xl sm:text-2xl md:text-3xl font-semibold text-[#1248b2]">
          Features
        </div>

        <div className="flex flex-col items-center md:flex-row gap-3 lg:gap-16 mx-auto my-6 md:justify-center">
          <Featurescard
            link={
              "https://img.icons8.com/?size=100&id=70640&format=png&color=000000"
            }
            name={"Dashboard"}
            desciption={"Get a complete view of your income and spendings"}
          />

          <Featurescard
            link={
              "https://img.icons8.com/?size=100&id=74556&format=png&color=000000"
            }
            name={"Track Spendings"}
            desciption={
              "Easily categorize your expenses and stay on top of your budget"
            }
          />

          <Featurescard
            link={
              "https://img.icons8.com/?size=100&id=123455&format=png&color=000000"
            }
            name={"Add New Expense"}
            desciption={
              "Add detailed expenses instantly to track your finances better"
            }
          />
        </div>
      </div>
    </>
  );
};

export default Features;
