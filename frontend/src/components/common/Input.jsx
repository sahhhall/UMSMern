// components/common/Input.js
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
const Input = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
  return (
    <div className="flex flex-col ">
      <label className="mb-1 font-normal text-xs tracking-widest">
        {label}
      </label>
      <div className="relative">
        <input
          className={`border w-[250px] outline-none text-xs rounded-sm px-2 min-h-7 max-h-7 ${
            error ? "border-red-500" : "border-black"
          }`}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <div
            className="absolute right-2 bottom-2 cursor-pointer"
            onClick={handleTogglePassword}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </div>
        )}
      </div>

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default Input;
