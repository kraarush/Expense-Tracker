import React from "react";
import { ReactTyped } from "react-typed";

const Typed = ({ messages }) => {
  return (
    <div className="text-center w-full px-4">
      <ReactTyped
        strings={messages || ["Currently site is under development", "Hello from dev team"]}
        typeSpeed={90}
        backSpeed={60}
        className="block"
        loop
      />
    </div>
  );
};
export default Typed;
