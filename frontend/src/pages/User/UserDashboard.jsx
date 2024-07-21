import React, { useEffect, useRef, useState } from "react";
import coverphoto from "../../assets/cover.jpeg";
import avatar from "../../assets/avatar.jpg";
import { Pen } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useUpdateMutation } from "../../redux/slices/usersApiSlices";
import { setAuthCredentials } from "../../redux/slices/authslice";

const UserDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [editingName, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: userInfo.name,
    email: userInfo.email,
  });
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [updateProfile, { isError, isLoading }] = useUpdateMutation();
  useEffect(() => {
    if (editingName) {
      inputRef.current.focus();
    }
  }, [editingName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveEdit = async (value, name) => {
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      toast.error("Username must contain only characters");
      return;
    } else if (!value.trim()) {
      toast.error("Required");
      return;
    }
    try {
      setEditing(false);
      const res = await updateProfile({
        _id: userInfo._id,
        name: value,
      }).unwrap();
      console.log(res);
      dispatch(setAuthCredentials({ ...res }));
      toast.success("successfully updated");
    } catch (err) {
      toast.error(err?.data?.message || err);
    }
  };

  const handleEditname = () => {
    setEditing(true);
  };
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
            <input
              ref={inputRef}
              type="text"
              name="name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveEdit(e.target.value, e.target.name);
                }
              }}
              value={user.name}
              onChange={handleChange}
              className=" font-semibold tracking-wide text-gray-700 border-none outline-none bg-transparent"
            />
          </div>
        ) : (
          <div className="flex mt-14  items-center">
            <h2 className="ms-4 font-semibold tracking-wide text-gray-700 me-1  ">
              {user.name}
            </h2>
            <Pen
              onClick={handleEditname}
              className=" cursor-pointer"
              size={13}
            />
          </div>
        )}

        <h3 className="ms-4 extra-small tracking-wide ">{user.email}</h3>
      </div>
    </div>
  );
};

export default UserDashboard;
