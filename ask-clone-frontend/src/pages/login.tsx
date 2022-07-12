import React from "react";
import { Link } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import InputField from "../components/InputField";
import logo from "../logo.png";
function Login() {
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
          />
          <InputField label="Password" type="password" placeholder="Password" />

          <div className="flex flex-row w-full justify-between mt-4 mb-1">
            <Checkbox label="Remember me" />
            <Link className="text-xs  text-accent cursor-pointer" to={"/"}>
              Forget password?
            </Link>
          </div>
          <button className="w-full text-white bg-accent hover:bg-accentdark rounded-md py-2 my-3 cursor-pointer ">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
