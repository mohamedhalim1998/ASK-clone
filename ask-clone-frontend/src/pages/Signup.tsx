import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import logo from "../logo.png";
import { signup } from "../store/AuthReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/Store";

interface SignupForm {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    if (token !== "") {
      toast.success("signup sucessfully");
      navigate("/", { replace: true });
    }
  }, [token]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  } as SignupForm);
  const changeUsername = (val: string) => {
    const data = { ...formData };
    data.username = val;
    setFormData(data);
  };
  const changeEmail = (val: string) => {
    const data = { ...formData };
    data.email = val;
    setFormData(data);
  };
  const changePassword = (val: string) => {
    const data = { ...formData };
    data.password = val;
    setFormData(data);
  };
  const changePasswordConfirm = (val: string) => {
    const data = { ...formData };
    data.passwordConfirm = val;
    setFormData(data);
  };

  const validateForm = () => {
    toast.dismiss();
    if (formData.username.length === 0) {
      toast.error("user name is required");
      return;
    }
    if (formData.email.length === 0) {
      toast.error("email is required");
      return;
    }
    if (
      formData.password.length === 0 &&
      formData.passwordConfirm.length === 0
    ) {
      toast.error("passwords is required");
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      toast.error("passwords aren't matched");
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("email is not valid");
      return;
    }
    registerUser();
  };
  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const registerUser = async () => {
    dispatch(signup(formData.username, formData.email, formData.password));
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
          <h3 className="text-28 font-semibold ">Sign up</h3>
          <p className="text-xs">
            Already have an account ?{" "}
            <Link className="text-accent cursor-pointer" to={"/login"}>
              Log in
            </Link>
          </p>
          <InputField
            label="Username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={changeUsername}
          />
          <InputField
            label="email"
            type="email"
            placeholder="email"
            value={formData.email}
            onChange={changeEmail}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={changePassword}
          />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            value={formData.passwordConfirm}
            onChange={changePasswordConfirm}
          />
          <button
            className="w-full text-white bg-accent hover:bg-accentdark rounded-md py-2 my-3 cursor-pointer "
            onClick={(e) => {
              validateForm();
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
