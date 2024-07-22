import React, { useRef, useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useCreateuserMutation } from "../../redux/slices/admin/adminApiSlices";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const UserAddModal = ({ setShowModal, showModal,  refetch }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [displayImg, setDisplayImg] = useState("http://res.cloudinary.com/dgvcq2pqp/image/upload/v1707553607/lkdfahktdxo4n99wrvqh.jpg")
  const [validationErr, setValidationErr] = useState({
    email: "",
    password: "",
    name: "",
  });
  const inputFileRef = useRef(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateChange(name, value);
  };
  const triggerFileInput = () => {
    inputFileRef.current.click();
  };

  const handleChangeInput = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setDisplayImg(reader.result)
            setFormData((prev)=> ({
                ...prev,
                image: reader.result
            }))
        }
    }
  }

  const [userRegister, {isLoading}] = useCreateuserMutation()
  const validateChange = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        error = "name must contain only characters";
      }
      if (value.trim() === "") {
        error = "enter something";
      }
    } else if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    } else if (name === "password") {
      if (value.length < 6 || !/\d/.test(value)) {
        error = "Password must be at least 6 char";
      }
    }
    setValidationErr((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, name } = formData;
    if (!email || !password || !name) {
      setValidationErr({
        name: !name ? "required" : "",
        email: !email ? "required" : "",
        password: !password ? "required" : "",
      });
      return;
    }
    if (Object.values(validationErr).some((err) => err)) return;
    try {

         const res =  await userRegister({...formData}).unwrap();
        setFormData({
            name: "",
            email: "",
            password: "",
          });
          setShowModal(false);
          toast.success(res.message);
          refetch();
    } catch (error) {
        console.log(error)
        toast.error(error.data?.message || error.error);
    }
   
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-black bg-opacity-50 absolute inset-0"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="w-[310px]  bg-white p-6 rounded-lg relative z-10">
        <h1 className="text-center font-medium text-lg mb-4">Add New User</h1>
        <img
          className={`  object-cover m-auto  w-[100px] h-[100px] rounded-full border-2 border-white cursor-pointer`}
          src={displayImg}
          alt="avatar"
          onClick={triggerFileInput}
        />
        <input
          ref={inputFileRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleChangeInput}
        />
        <form className="flex w-full justify-center mt-4 flex-col items-center">
          <Input
            label="name"
            type="text"
            name="name"
            error={validationErr.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            error={validationErr.email}
            onChange={handleChange}
          />
          <Input
            label="Password (6+ characters)"
            type="password"
            name="password"
            error={validationErr.password}
            onChange={handleChange}
          />
          <div className="h-3"></div>
          <Button
            width="w-[260px]"
            text={
                isLoading ? (
                  <div className="flex animate-spin justify-center">
                    <LoaderCircle />
                  </div>
                ) : (
                  "Register"
                )
              }
            bgColor="bg-black"
            textColor="text-white"
            onClick={handleRegister}
          />
        </form>
      </div>
    </div>
  );
};

export default UserAddModal;
