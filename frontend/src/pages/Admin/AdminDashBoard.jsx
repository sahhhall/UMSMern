import React, { useState, useMemo } from "react";
import UserList from "../../components/UserList";
import Button from "../../components/common/Button";
import { useFetchusersQuery } from "../../redux/slices/admin/adminApiSlices";
import AddUser from "../../components/Admin/AddUser";
import AdminNav from "../../components/Admin/AdminNav";

const AdminDashBoard = () => {
  const { data: usersData, isLoading, error, refetch } = useFetchusersQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log(usersData)


  const filteredUsers = useMemo(() => {
    if (!usersData || !usersData.usersData) return [];
    return usersData?.usersData?.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // const userdata = usersData?.usersData?.filter((user)=> {
    //  let userda =  user.email;
    //  return userda.includes(searchTerm.toLowerCase())
    // })
    // return userdata
  }, [usersData, searchTerm]);

  return (<>
  <AdminNav/>
  <div className="w-full h-screen flex flex-col items-center bg-gray-100">
      <div className="flex justify-end items-end w-full max-w-4xl p-4 gap-4">
        <input
          type="text"
          onChange={handleSearch}
          className="px-6  border rounded-md py-1 bg-gray-100"
          placeholder="Search users..."
          value={searchTerm}
        />
        <AddUser refetch={refetch} />
      </div>

      <div className="w-full max-w-4xl overflow-scroll max-h-[450px] bg-white min-h-[50vh] mt-2 border rounded-md p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching users: {error.message}</p>
        ) : (
          filteredUsers.map(user => (
            <UserList  key={user._id} user={user} refetch={refetch} />
          ))
        )}
      </div>
    </div>
  </>
    
  );
};

export default AdminDashBoard;
