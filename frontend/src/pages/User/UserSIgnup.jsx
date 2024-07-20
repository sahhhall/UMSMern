import React, { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import TextDivider from "../../components/common/TextDivider";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [validationErr, setValidationErr] = useState({
    email: "",
    password: "",
    username: "",
    confirm: "",
  });

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
    if (name === "username") {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        error = "Username must contain only characters";
      }
      if (value.trim() === "") {
        error = "enter something"
      }
    } else if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    } else if (name === "password") {
      if (value.length < 6 || !/\d/.test(value)) {
        error = "Password must be at least 6 ";
      }
    } else if (name === "confirm") {
      if (value !== formData.password) {
        error = "Passwords do not match";
      }
    }
    setValidationErr((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const navigate = useNavigate();
  const handleLoginNavigate = () => {
    navigate("/user/login");
  };

  return (
    <div className="w-full h-[97vh] flex flex-col justify-center items-center bg-gray-100">
      <h1 className="tracking-widest font-medium text-sm max-w-[310px] mb-4">
        Sign in Stay updated on your professional world!!!
      </h1>
      <div className="w-[310px] h-[440px] border rounded-lg bg-white">
        <form className="flex w-full justify-center mt-4 flex-col items-center">
          <Input
            label="Username"
            type="text"
            name="username"
            error={validationErr.username}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            error={validationErr.email}
            onChange={handleChange}
          />
          <Input
            label="Password (6+ characters)"
            type="password"
            name="password"
            error={validationErr.password}
            onChange={handleChange}
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirm"
            error={validationErr.confirm}
            onChange={handleChange}
          />
          <p className="text-center extra-small font-normal mt-4">
            By clicking Agree & Join or Continue, you agree to the LinkedIn
          </p>
          <p className="text-center extra-small font-normal">
            User Agreement, Privacy Policy, and Cookie Policy.
          </p>
          <div className="h-3"></div>
          <Button
            width="w-[260px]"
            text="Register"
            bgColor="bg-black"
            textColor="text-white"
          />
          <TextDivider />
          <Button
            width="w-[260px]"
            text="Sign-in"
            bgColor="bg-white"
            textColor="text-black"
            onClick={handleLoginNavigate}
          />
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
