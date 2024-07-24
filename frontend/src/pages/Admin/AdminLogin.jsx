import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { setAdminCredentials } from "../../redux/slices/admin/adminAuthSlice";
import { useAuthadminMutation } from "../../redux/slices/admin/adminApiSlices";
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErr, setValidationErr] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.adminauth);
  const [adminlogin, { isLoading }] = useAuthadminMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (adminInfo) navigate("/admin/home");
  }, [navigate, adminInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setValidationErr({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }
    if (validationErr.email) return
    try {
      const { email, password } = formData;
      const res = await adminlogin({ email, password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      setFormData({
        email: "",
        password: "",
      });
      navigate("/admin/home");
      toast.success(`welcome back ${res.name}`);
    } catch (err) {
      console.log(err.data?.message || err.error);
      setLoginError(err.data?.message);
      setValidationErr({
        email: true,
        password: true,
      });
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateChange(name, value);
  };
  const validateChange = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    }
    setValidationErr((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  return (
    <div className="w-full h-[97vh] flex flex-col justify-center items-center  bg-gray-100">
      <h1 className=" tracking-widest font-medium text-sm max-w-[310px] mb-4">
        Admin Sign in Stay updated on your professional world!!!
      </h1>
      <div className="w-[310px] border rounded-lg  h-[230px] bg-white">
        <form className="flex  w-full justify-center mt-4 flex-col items-center">
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
            error={validationErr.email}
            value={formData.email}
          />
          <Input
            label="Password (6+ characters)"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            error={validationErr.password}
          />
          {loginError && (
            <div className=" mt-0 w-full ms-14 text-red-600 text-xs">
              {loginError}
            </div>
          )}
          <p className="w- text-center extra-small font-normal mt-4 ">
            By clicking Agree & Join or Continue, you agree to the LinkedIn
          </p>
          <p className="w- text-center extra-small font-normal ">
            User Agreement, Privacy Policy, and Cookie Policy.
          </p>
          <div className="h-3"></div>
          <Button
            width="w-[260px]"
            text={
              isLoading ? (
                <div className="flex animate-spin justify-center">
                  <LoaderCircle />
                </div>
              ) : (
                "Login"
              )
            }
            bgColor="bg-black"
            textColor="text-white"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
