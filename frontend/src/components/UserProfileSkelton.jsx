import React from "react";

const UserProfileSkelton = () => {
  return (
    <div className="w-full h-[97vh] flex flex-col items-center bg-gray-100">
      <div className="w-[50rem] bg-white h-[50vh] mt-9 border rounded-md ">
        <div className="w-full h-[20vh]  top-[31px] rounded-t-md  bg-gray-200 animate-pulse"></div>
        <div className="flex mt-14 ms-4 items-center">
          <div className="w-[200px] h-[20px] bg-gray-300 animate-pulse"></div>
        </div>
        <div className="flex mt-2 ms-4 items-center">
          <div className="w-[250px] h-[15px] bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkelton;
