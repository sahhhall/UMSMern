import React, { useEffect, useRef, useState } from "react";
import coverphoto from "../../assets/cover.jpeg";
import avatar from "../../assets/avatar.jpg";
import { LoaderCircle, Pen } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useUpdateMutation } from "../../redux/slices/usersApiSlices";
import { setAuthCredentials } from "../../redux/slices/authslice";
import Button from "../../components/common/Button";

const UserDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [updatedPic, setUpdatedPic] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [user, setUser] = useState({
    name: userInfo.name,
    email: userInfo.email,
    profileImg: userInfo.profileImg,
  });

  const inputRef = useRef(null);
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  const [updateProfile, { isError, isLoading }] = useUpdateMutation();

  useEffect(() => {
    if (editingName) {
      inputRef.current.focus();
    }
  }, [editingName]);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUpdatedPic(reader.result);
        setUser((prevUser) => ({
          ...prevUser,
          profileImg: reader.result,
        }));
      };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveName = async (value) => {
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      toast.error("Username must contain only characters");
      return;
    } else if (!value.trim()) {
      toast.error("Required");
      return;
    } else if (value.length >20 ) {
      toast.error("not a valid");
      return
    }
    try {
      setEditingName(false);
      const res = await updateProfile({
        _id: userInfo._id,
        name: value,
      }).unwrap();
      dispatch(setAuthCredentials({ ...res }));
      toast.success("Successfully updated");
    } catch (err) {
      toast.error(err?.data?.message || err);
    }
  };

  const handleSaveProfileImg = async () => {
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        profileImg: updatedPic,
      }).unwrap();
      dispatch(setAuthCredentials({ ...res }));
      setEditProfile(false);
      toast.success("Profile image updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err);
    }
  };

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleCancelEdit = () => {
    setEditProfile(false);
    setUpdatedPic(null);
    setUser((prevUser) => ({
      ...prevUser,
      profileImg: userInfo.profileImg,
    }));
  };

  const triggerFileInput = () => {
    inputFileRef.current.click();
    setEditProfile(true);
  };

  return (
    <div className="w-full h-[97vh] flex flex-col items-center bg-gray-100">
      <div className="w-[50rem] bg-white h-[50vh] mt-9 border rounded-md">
        <div className="w-full h-[20vh] rounded-t-md relative">
          <img
            src={coverphoto}
            alt="coverphoto"
            className="w-full h-full object-cover rounded-t-md"
          />
          <img
            className={` ${
              editProfile && isLoading && "animate-pulse"
            }  object-cover absolute bottom-[-50px] left-[3%] w-[100px] h-[100px] rounded-full border-2 border-white cursor-pointer`}
            src={user.profileImg}
            alt="avatar"
            onClick={triggerFileInput}
          />
          <input
            ref={inputFileRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleProfileUpload}
          />
          {editProfile && (
            <div className="absolute font-bold mt-2 right-6 flex space-x-2">
              {!isLoading && (
                <Button
                  bgColor="bg-black"
                  textColor="text-white"
                  onClick={handleCancelEdit}
                  text="Cancel edit"
                />
              )}
              {!isLoading && (
                <Button
                  width={isLoading}
                  bgColor="bg-black"
                  textColor="text-white"
                  onClick={handleSaveProfileImg}
                  text="save"
                />
              )}
            </div>
          )}
        </div>
        {editingName ? (
          <div className="flex mt-14 ms-4 items-center">
            <input
              ref={inputRef}
              type="text"
              name="name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveName(e.target.value);
                }
              }}
              value={user.name}
              onChange={handleChange}
              className={ ` font-semibold tracking-wide text-gray-700 border-none outline-none bg-transparent`}
            />
          </div>
        ) : (
          <div className="flex mt-14 items-center">
            <h2 className="ms-4 font-semibold tracking-wide text-gray-700 me-1">
              {user.name}
            </h2>
            <Pen
              onClick={handleEditName}
              className="cursor-pointer"
              size={13}
            />
          </div>
        )}
        <h3 className="ms-4 extra-small tracking-wide">{user.email}</h3>
      </div>
    </div>
  );
};

export default UserDashboard;
