import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import InputField from "../components/InputField";
import logo from "../logo.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/AuthReducer";
import { RootState } from "../store/Store";

interface LoginForm {
  username: string;
  password: string;
  rememberme: boolean;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    if (token !== "") {
      navigate("/", { replace: true });
    }
  }, [token]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberme: false,
  } as LoginForm);
  const changeName = (val: string) => {
    const data = { ...formData };
    data.username = val;
    setFormData(data);
  };
  const changePassword = (val: string) => {
    const data = { ...formData };
    data.password = val;
    setFormData(data);
  };
  const changeRememberMe = (val: boolean) => {
    const data = { ...formData };
    data.rememberme = val;
    setFormData(data);
  };

  return (
    <div
      style={{
        background: "#131619",
      }}
      className="h-screen w-screen"
    >
      <div className="flex flex-col max-w-sm mx-auto">
        <img src={logo} alt="logo" className="w-1/5 mx-auto py-4" />
        <div
          style={{
            background: "#FFFFFF",
          }}
          className="w-full flex-grow p-4 rounded-md"
        >
          <h3 className="text-28 font-semibold ">Log in</h3>
          <p className="text-xs">
            Don’t have an account yet?{" "}
            <Link className="text-accent cursor-pointer" to={"/signup"}>
              Sign up
            </Link>
          </p>

          <InputField
            label="Login"
            type="text"
            placeholder="Username or e-mail"
            value={formData.username}
            onChange={changeName}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={changePassword}
          />

          <div className="flex flex-row w-full justify-between mt-4 mb-1">
            <Checkbox
              label="Remember me"
              isChecked={formData.rememberme}
              setIsChecked={changeRememberMe}
            />
            <Link className="text-xs  text-accent cursor-pointer" to={"/"}>
              Forget password?
            </Link>
          </div>
          <button
            className="w-full text-white bg-accent hover:bg-accentdark rounded-md py-2 my-3 cursor-pointer "
            onClick={() => {
              console.log("login");
              dispatch(login(formData.username, formData.password));
            }}
          >
            Log In
          </button>
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
}
export default Login;
