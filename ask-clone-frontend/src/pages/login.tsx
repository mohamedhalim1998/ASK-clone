import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import InputField from "../components/InputField";
import logo from "../logo.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/AuthReducer";
import { RootState } from "../store/Store";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

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

  const initData: LoginForm = {
    username: "",
    password: "",
    rememberme: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
    rememberme: Yup.boolean().required(),
  });

  const { register, handleSubmit, watch } = useForm<LoginForm>({
    defaultValues: initData,
  });
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
    validationSchema
    .validate(data)
    .then((values) => {
        dispatch(login(data.username, data.password));
    })
    .catch((reason) => {
      console.log(reason);
      toast.error("Some fields are missing")
    });
  
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Login"
              type="text"
              placeholder="Username or e-mail"
              register={register("username")}
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Password"
              register={register("password")}
            />

            <div className="flex flex-row w-full justify-between mt-4 mb-1">
              <Checkbox
                label="Remember me"
                isChecked={watch("rememberme")}
                register={register("rememberme", { value: false })}
              />
              <Link className="text-xs  text-accent cursor-pointer" to={"/"}>
                Forget password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-accent hover:bg-accentdark rounded-md py-2 my-3 cursor-pointer "
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
