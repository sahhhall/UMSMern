import React, { useState } from "react";
import Button from "./common/Button";
import { useDeleteuserMutation } from "../redux/slices/admin/adminApiSlices";
import { toast } from "react-hot-toast";

const UserList = ({ user, refetch }) => {
  const [deleteUser, { isLoading, isError, isSuccess }] = useDeleteuserMutation();
  const [deletingn, setdltng] = useState(false)
  const handleDelete = async () => {
    try {
      setdltng(true)
      const res = await deleteUser(user._id).unwrap();
      console.log(res);
      setdltng(false)
      if (refetch) refetch();
      toast.success('User deleted successfully'); 
    } catch (err) {
      console.log(err?.data?.message || err);
      toast.error('Error deleting user'); 
    }
  };

  return (
    <div className= {`${deletingn && ('animate-pulse' ,'bg-slate-100') } mt-3  w-full items-center flex justify-between border border-gray-200 min-h-[10rem]`}>
      <div className="ps-9 rounded-full">
        <img
          className="object-cover w-20 h-20 border rounded-full"
          src={user.profileImg}
          alt="profile"
        />
      </div>
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <div className="pe-5 flex gap-5">
        <Button text="Edit" bgColor="bg-black" textColor="text-white" />
        <Button
          onClick={handleDelete}
          text="Delete"
          bgColor="bg-red-700"
          textColor="text-white"
          disabled={isLoading} 
        />
      </div>
    </div>
  );
};

export default UserList;
