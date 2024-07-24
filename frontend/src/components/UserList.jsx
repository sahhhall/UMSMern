import React, { useState, useRef, useEffect } from "react";
import Button from "./common/Button";
import Modal from "./common/Modal";
import {
  useDeleteuserMutation,
  useEdituserMutation,
} from "../redux/slices/admin/adminApiSlices";
import { toast } from "react-hot-toast";
import { Pen } from "lucide-react";

const UserList = ({ user, refetch }) => {
  const [deleting, setDeleting] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [updatedPic, setUpdatedPic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    profileImg: user.profileImg,
  });

  const inputRef = useRef(null);
  const inputFileRef = useRef(null);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteuserMutation();
  const [editUser, { isLoading: isUpdating }] = useEdituserMutation();

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
        setUserData((prevUserData) => ({
          ...prevUserData,
          profileImg: reader.result,
        }));
      };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
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
    } else if (value.length > 20) {
      toast.error("Not a valid name");
      return;
    }
    try {
      setEditingName(false);
      const res = await editUser({
        data: { name: value },
        id: user._id,
      }).unwrap();
      if (refetch) refetch();
      toast.success("Name updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err);
    }
  };

  const handleSaveProfileImg = async () => {
    try {
      const res = await editUser({
        data: { profileImg: updatedPic },
        id: user._id,
      }).unwrap();
      if (refetch) refetch();
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
    setUserData((prevUserData) => ({
      ...prevUserData,
      profileImg: user.profileImg,
    }));
  };

  const triggerFileInput = () => {
    inputFileRef.current.click();
    setEditProfile(true);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteUser(user._id).unwrap();
      setDeleting(false);
      setShowModal(false);
      if (refetch) refetch();
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Error deleting user");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`${
        editProfile && isUpdating && "animate-pulse bg-slate-100"
      } mt-3 w-full items-center flex justify-between border border-gray-200 min-h-[10rem]`}
    >
      {showModal && (
        <Modal 
          onClose={closeModal}
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />
      )}
      <div className="ps-9 rounded-full">
        <img
          className="object-cover w-20 h-20 border rounded-full cursor-pointer"
          src={userData.profileImg}
          alt="profile"
          onClick={triggerFileInput}
        />
        <input
          ref={inputFileRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleProfileUpload}
        />
      </div>
      <div>
        {editingName ? (
          <input
            ref={inputRef}
            type="text"
            name="name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveName(e.target.value);
              }
            }}
            value={userData.name}
            onChange={handleChange}
            className="font-semibold tracking-wide text-gray-700 border-none outline-none bg-transparent"
          />
        ) : (
          <div className="flex items-center">
            <h3 className="font-semibold tracking-wide text-gray-700">
              {userData.name}
            </h3>
            <Pen
              onClick={handleEditName}
              className="cursor-pointer ml-2"
              size={13}
            />
          </div>
        )}
        <p className=" text-xs tracking-wide font-bold " >{userData.email}</p>
      </div>
      <div className="pe-5 flex gap-5">
        {editProfile && (
          <div className="flex space-x-2">
            {!isUpdating && (
              <Button
                bgColor="bg-black"
                textColor="text-white"
                onClick={handleCancelEdit}
                text="Cancel edit"
              />
            )}
            {!isUpdating && (
              <Button
                bgColor="bg-black"
                textColor="text-white"
                onClick={handleSaveProfileImg}
                text="Save"
              />
            )}
          </div>
        )}
        {!editProfile && (
          <Button
            onClick={openModal}
            text="Delete"
            bgColor="bg-red-700"
            textColor="text-white"
            disabled={isDeleting}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
