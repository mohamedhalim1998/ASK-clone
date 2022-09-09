import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import logo from "../logo.png";
import { signup } from "../store/AuthReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/Store";
import * as Yup from "yup";
import { useEffect } from "react";
import SubmitButton from "../components/SubmitButton";
import SignupForm from "../model/SignupForm";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<SignupForm>();
  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    console.log(data);
    validationSchema
      .validate(data)
      .then((values) => {
        dispatch(signup(values.username, values.password, values.email));
      })
      .catch((reason) => {
        console.log(reason);
        toast.error(reason.toString().replace("ValidationError: ", ""));
      });
  };
  const validationSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match!")
      .required(),
  });
  const verified = useAppSelector((state: RootState) => state.auth.verified);

  useEffect(() => {
    if (verified) {
      toast.success("signup sucessfully");
      navigate("/user/settings", { replace: true });
    }
  }, [verified]);
  return (
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Username"
            type="text"
            placeholder="Username"
            register={register("username")}
          />
          <InputField
            label="email"
            type="email"
            placeholder="email"
            register={register("email")}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Password"
            register={register("password")}
          />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            register={register("passwordConfirm")}
          />
          <SubmitButton label="Sign up" />
        </form>
      </div>
    </div>
  );
};
export default Signup;
