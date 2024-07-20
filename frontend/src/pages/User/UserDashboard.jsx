import React, { useEffect, useRef, useState } from "react";
import coverphoto from "../../assets/cover.jpeg";
import avatar from "../../assets/avatar.jpg";
import { Pen } from "lucide-react";

const UserDashboard = () => {
  const [editingName, setEditing] = useState(false);
  const inputRef = useRef(null)
  useEffect(()=> {
    if (editingName) {
      inputRef.current.focus();
    }
  },[editingName]);
  const handleEditname = () => {
    setEditing(true)
  }
  return (
    <div className="w-full h-[97vh] flex flex-col items-center bg-gray-100">
      <div className="w-[50rem] bg-white h-[50vh] mt-9 border rounded-md ">
        <div className="w-full h-[20vh]  rounded-t-md relative">
          <img
            src={coverphoto}
            alt="coverphoto"
            className="w-full h-full object-cover rounded-t-md"
          />
          <img
            className=" object-cover absolute bottom-[-50px] left-[3%]  w-[100px] h-[100px] rounded-full border-2 border-white"
            src={avatar}
            alt="avatar"
          />
        </div>
        {editingName ? (
          <div className="flex mt-14 ms-4 items-center">
            <input ref={inputRef} type="text" value={"Muhammed Sahal"} className=" font-semibold tracking-wide text-gray-700 border-none outline-none bg-transparent" />
          </div>
        ) : (
          <div className="flex mt-14  items-center">
            <h2 className="ms-4 font-semibold tracking-wide text-gray-700 me-1  ">
              Muhammed Sahal
            </h2>
            <Pen onClick={handleEditname} className=" cursor-pointer" size={13} />
          </div>
        )}

        <h3 className="ms-4 extra-small tracking-wide ">
          sahalvavoor313@gmail.com
        </h3>
      </div>
    </div>
  );
};

export default UserDashboard;
