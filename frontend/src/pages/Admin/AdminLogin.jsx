import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import TextDivider from "../../components/common/TextDivider";
const AdminLogin = () => {
  const navigate = useNavigate()
  const handleLoginClick = (e) => {
    e.preventDefault();
  };
  const handleChange = () => {};
  return (
    <div className="w-full h-[97vh] flex flex-col justify-center items-center  bg-gray-100">
      <h1 className=" tracking-widest font-medium text-sm max-w-[310px] mb-4">
        Sign in As Admin!!!
      </h1>
      <div className="w-[310px] border rounded-lg  h-[290px] bg-white">
        <form className="  flex  w-full justify-center mt-8 flex-col items-center">
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            error={false}
          />
          <Input
            label="Password (6+ characters)"
            type="password"
            name="password"
            onChange={handleChange}
            error={"hi"}
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
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
