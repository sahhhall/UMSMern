import React from "react";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth } from "../../redux/slices/authslice";
import { useLogoutMutation } from "../../redux/slices/usersApiSlices";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navItems = ["Showcase", "Docs", "Blog", "Template", "Enterprise"];
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
 
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
 
  const handleLoginClick = () => {
    navigate("/user/login");
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logoutAuth());
      navigate("/");
    } catch (err) {
      toast.error(err)
    }
  };
 

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
        <input
          type="text"
          placeholder="Search users....."
          className="px-6 border rounded-md outline-none bg-gray-100"
        />
        {userInfo ? (
            <div className="flex gap-2">
              <Link to="/user/profile">
                <Button
                  onClick={null}
                  text="Profile"
                  bgColor="bg-white"
                  textColor="text-black"
                />
              </Link>
              <Button
                onClick={handleLogout}
                text="Logout"
                bgColor="bg-black"
                textColor="text-white"
              />
            </div>
          ) : (
            <Button
              onClick={handleLoginClick}
              text="Login"
              bgColor="bg-black"
              textColor="text-white"
            />
          )}
       
      </div>
    </div>
  );
};

export default Navbar;
