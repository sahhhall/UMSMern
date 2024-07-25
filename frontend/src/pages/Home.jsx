import React from "react";
import Button from "../components/common/Button";

const Home = () => {
  return (
    <div className="h-[71vh] flex items-center  justify-center flex-col">
      <h1 className="text-6xl text-gradient  font-extrabold">
        The User Mangagment for the Web
      </h1>
      <h3 className="text-gray-400 text-xl font-normal mt-9">
        Used by some of the world's largest companies, UMS enables you to
        create
      </h3>
      <h3 className="text-gray-400 text-xl font-normal">
        high-quality web applications with the power of React components.
      </h3>
      <div className=" space-x-2 mt-9">
        <Button  text="Get Started" bgColor="bg-black" textColor="text-white" />
        <Button text="Login" bgColor="bg-white" textColor="text-black" />
      </div>
    </div>
  );
};

export default Home;
