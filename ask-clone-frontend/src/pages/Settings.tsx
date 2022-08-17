import _ from "lodash";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import Switch from "../components/Switch";
import TextAreaField from "../components/TextAreaField";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  changeSettings,
  getProfileInfo,
  ProfileState,
  updateLoading,
} from "../store/ProfileReducer";

export interface ProfileInfo {
  fullname: string;
  location: string;
  bio: string;
  links: string;
  day: number;
  month: number;
  year: number;
  allowAnoymousQuestions: boolean;
  status: boolean;
  gender: string;
  profileImage: FileList | undefined;
  coverImage: FileList | undefined;
}

function Settings() {
  const dispatch = useAppDispatch();
  const profileState: ProfileState = useAppSelector((state) => state.profile);
  const loading: boolean = useAppSelector((state) => state.profile.loading);
  useEffect(() => {
    dispatch(updateLoading(true));
    dispatch(getProfileInfo());
  }, []);
  console.log(profileState);
  const initState: ProfileInfo = Object.assign(
    {
      coverImage: undefined,
      profileImage: undefined,
    },
    profileState
  ) as ProfileInfo;
  console.log(initState);

  const { register, handleSubmit, watch, reset } = useForm<ProfileInfo>({
    defaultValues: initState,
  });
  const onSubmit: SubmitHandler<ProfileInfo> = (data) => {
    dispatch(changeSettings(data));
  };
  useEffect(() => {
    if (!loading) {
      console.log("reset form");
      reset(initState);
    }
  }, [loading]);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="w-2/4 mx-auto text-white ">
        <form
          className="w-2/3 bg-white rounded-md text-gray-800"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-3 py-4">
            <InputField
              label="Full name"
              placeholder="Full Name"
              type="text"
              //   value={watch("fullname")}
              register={register("fullname")}
            />
            <InputField
              label="Location"
              placeholder="The blue planet"
              type="text"
              register={register("location")}
            />
            <TextAreaField
              label="Bio"
              placeholder="Bio"
              register={register("bio")}
            />
            <TextAreaField
              label="Url"
              placeholder="urls"
              register={register("url")}
            />

            <BirthdaySelect
              registerDay={register("day")}
              registerMonth={register("month")}
              registerYear={register("year")}
            />
            <div>
              <h5 className="text-xs font-semibold mt-4 mb-1">Gender</h5>
              <select
                id="gender"
                className="bg-white p-4 m-2 border rounded-md"
                defaultValue={"MALE"}
                {...register("gender")}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
          </div>
          <div className="px-3 py-4">
            <SwitchRow
              label="Allow anonymous questions"
              checked={watch("allowAnoymousQuestions")}
              register={register("allowAnoymousQuestions")}
            />
            <div className="w-full my-2 h-px bg-gray-300"></div>
            <SwitchRow
              label="Show Status"
              checked={watch("status")}
              register={register("status")}
            />
          </div>
          <Divider />
          <div className="px-3 py-4">
            <ChangeImage
              label="Change Image"
              register={register("profileImage")}
              src={`http://localhost:8080/profile/image/${profileState.profileImageUrl}`}
            />
            <ChangeImage
              label="Change Cover"
              register={register("coverImage")}
              src={`http://localhost:8080/profile/image/${profileState.coverImageUrl}`}
            />
          </div>
          <Divider />
          <div className="flex flex-row w-full py-4 px-3">
            <button
              className="w-1/2 text-white bg-accent hover:bg-accentdark rounded-md py-2 my-3 mx-2 cursor-pointer"
              type="submit"
            >
              Save
            </button>
            <button className="w-1/2 text-gray-900 border border-black rounded-md py-2 my-3 mx-2 cursor-pointer ">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ChangeImageParams {
  label: string;
  register?: UseFormRegisterReturn;
  src?: string;
}
const ChangeImage: FC<ChangeImageParams> = (params) => {
  const [src, setSrc] = useState<string>(
    params.src
      ? params.src
      : "https://cbgd.ask.fm/wallpapers2/055/309/952/768/original/flyisland.jpg"
  );
  const fileReader = new FileReader();

  fileReader.onloadend = (e) => {
    console.log(e.target);
    setSrc(e.target!.result as string);
  };

  return (
    <div className="flex flex-row py-4">
      <div className="w-16 h-16 rounded-full overflow-hidden ">
        <img className="object-cover w-full h-full" src={src} alt="" />
      </div>
      <label className="text-accentdark font-medium my-auto px-2 cursor-pointer">
        {params.label}
        <input
          type="file"
          {...params.register}
          className="hidden"
          onChange={(e) => {
            params.register?.onChange(e);
            const target = e.target as HTMLInputElement;
            if (target.files != null) {
              fileReader.readAsDataURL(target.files[0]);
            }
          }}
        />
      </label>
    </div>
  );
};

interface SwitchRowParams {
  label: string;
  checked?: boolean;
  register?: UseFormRegisterReturn;
}
const SwitchRow: FC<SwitchRowParams> = (params) => {
  return (
    <div className="flex flex-row justify-between cursor-pointer">
      <p className="text-accentdark font-medium">{params.label}</p>
      <Switch checked={params.checked} register={params.register} />
    </div>
  );
};
const Divider = () => {
  return <div className="h-2 w-full bg-gray-300"></div>;
};

interface BirthdaySelectParams {
  registerDay?: UseFormRegisterReturn;
  registerMonth?: UseFormRegisterReturn;
  registerYear?: UseFormRegisterReturn;
}

const BirthdaySelect: FC<BirthdaySelectParams> = (params) => {
  return (
    <div>
      <h5 className="text-xs font-semibold mt-4 mb-1">Birthday</h5>
      <div className="flex felx-row">
        <SelectInRange
          name="day"
          start={1}
          end={32}
          register={params.registerDay}
        />
        <SelectInRange
          name="month"
          start={1}
          end={13}
          register={params.registerMonth}
        />
        <SelectInRange
          name="year"
          start={1900}
          end={2023}
          register={params.registerYear}
        />
      </div>
    </div>
  );
};

interface SelectInRangeParams {
  start: number;
  end: number;
  name: string;
  register?: UseFormRegisterReturn;
}

const SelectInRange: FC<SelectInRangeParams> = (params) => {
  return (
    <select
      name={params.name}
      id={params.name}
      className="flex-grow bg-white p-4 m-2 border rounded-md"
      {...params.register}
    >
      {_.range(params.start, params.end).map((val) => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};
export default Settings;
