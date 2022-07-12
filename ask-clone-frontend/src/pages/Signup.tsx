import { Link } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import InputField from "../components/InputField";
import logo from "../logo.png";

const Signup: React.FC = () => {
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
          <h3 className="text-28 font-semibold ">Sign up</h3>
          <p className="text-xs">
            Already have an account ?{" "}
            <Link className="text-accent cursor-pointer" to={"/login"}>
              Log in
            </Link>
          </p>
          <InputField label="Username" type="text" placeholder="Username" />
          <InputField label="email" type="email" placeholder="email" />
          <InputField label="Password" type="password" placeholder="Password" />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
          />
          <button className="w-full text-white bg-accent hover:bg-accentdark rounded-md py-2 my-3 cursor-pointer ">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
