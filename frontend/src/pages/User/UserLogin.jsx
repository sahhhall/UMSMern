import React, { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import TextDivider from "../../components/common/TextDivider";
import { useNavigate } from "react-router-dom";
const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErr, setValidationErr] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/user/signup");
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateChange(name, value);
  };
  const validateChange = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    }
    setValidationErr((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  return (
    <div className="w-full h-[97vh] flex flex-col justify-center items-center  bg-gray-100">
      <h1 className=" tracking-widest font-medium text-sm max-w-[310px] mb-4">
        Sign in Stay updated on your professional world!!!
      </h1>
      <div className="w-[310px] border rounded-lg  h-[330px] bg-white">
        <form className="flex  w-full justify-center mt-4 flex-col items-center">
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            error={validationErr.email}
            value={formData.email}
          />
          <Input
            label="Password (6+ characters)"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            error={validationErr.password}
          />
          <p className="w- text-center extra-small font-normal mt-4 ">
            By clicking Agree & Join or Continue, you agree to the LinkedIn
          </p>
          <p className="w- text-center extra-small font-normal ">
            User Agreement, Privacy Policy, and Cookie Policy.
          </p>
          <div className="h-3"></div>
          <Button
            width="w-[260px]"
            text="Login"
            bgColor="bg-black"
            textColor="text-white"
            onClick={handleLoginClick}
          />
          <TextDivider />
          <Button
            width="w-[260px]"
            text="Register"
            bgColor="bg-white"
            textColor="text-black"
            onClick={handleRegister}
          />
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
