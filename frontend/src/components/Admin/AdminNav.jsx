import React from "react";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth } from "../../redux/slices/authslice";
import { useLogoutMutation } from "../../redux/slices/usersApiSlices";
import { toast } from "react-hot-toast";
import { useLogoutadminMutation } from "../../redux/slices/admin/adminApiSlices";
import { logoutAuthAdmin } from "../../redux/slices/admin/adminAuthSlice";

const AdminNav = () => {
  const navItems = ["Showcase", "Docs", "Blog", "Template", "Enterprise"];
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.adminauth);
  const dispatch = useDispatch();
  const [logoutAdminApi] = useLogoutadminMutation();



  const handleAdminLogout = async() => {
    try {
        await logoutAdminApi().unwrap();
        dispatch(logoutAuthAdmin());
        navigate('/admin')
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full flex justify-between border-b-2 py-4 ps-4 pe-5">
      <div className="flex sm:w-50 items-center sm:gap-1 lg:gap-6">
        <h1
          className="font-extrabold text-3xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          UMS
        </h1>
        {navItems.map((item, index) => (
          <h3
            key={index}
            className="text-gray-600 text-sm hover:text-black cursor-pointer"
          >
            {item}
          </h3>
        ))}
      </div>
      <div className="flex gap-7">
       
      
        {adminInfo && (
          <Button
            onClick={handleAdminLogout}
            text="Logout"
            bgColor="bg-white"
            textColor="text-black"
          />
        )}
      </div>
    </div>
  );
};

export default AdminNav;
