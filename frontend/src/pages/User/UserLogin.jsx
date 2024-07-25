import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import TextDivider from "../../components/common/TextDivider";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/slices/usersApiSlices";
import { setAuthCredentials } from "../../redux/slices/authslice";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";
const UserLogin = () => {
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
  const dispatch = useDispatch();
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

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
      console.log(email, password);
      const res = await login({ email, password }).unwrap();
      dispatch(setAuthCredentials({ ...res }));
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
      toast.success(`welcome back ${res.name}`);
    } catch (err) {
      console.log(err.data?.message || err.error);
      setLoginError(err.data?.message);
      setValidationErr({
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
        Sign in Stay updated on your professional world!!!
      </h1>
      <div className="w-[310px] border rounded-lg  h-[330px] bg-white">
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
          <TextDivider />
          <Link to={"/user/signup"}>
            <Button
              width="w-[260px]"
              text="Register"
              bgColor="bg-white"
              textColor="text-black"
            />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
