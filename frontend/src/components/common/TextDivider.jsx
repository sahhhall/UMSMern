import React from "react";

const TextDivider = () => {
  return (
    <div className="flex items-center w-[260px] my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default TextDivider;
