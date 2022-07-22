import React, { FC } from "react";
import Checkbox from "./Checkbox";
import InputField from "./InputField";
import Switch from "./Switch";

const AskQuestionCard: FC = () => {
  return (
    <div className="bg-themeblack w-full rounded-md py-2 px-4 ">
      <h3 className="font-semibold text-base py-2 ">👋Ask people</h3>
      <textarea
        className="placeholder:text-gray-300 rounded-md w-full h-12 px-2 py-3 text-base"
        placeholder="Ask people nearby..."
      />
      <div className="flex flex-row py-4  justify-between">
        {askAnonymouslySwitch}
        {askButton}
      </div>
    </div>
  );
};
const askAnonymouslySwitch = (
  <div className="flex flex-row">
    <Switch />
    <p className="pl-4 text-xs text-gray-300">Ask anonymously</p>
  </div>
);

const askButton = (
  <div className="flex flex-row ">
    <p className="pl-4 text-xs text-gray-300 my-auto">300</p>
    <button className="mx-2 px-6 py-2 bg-accent rounded-md content-center hover:bg-accentdark">
      <svg
        style={{ color: "white" }}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-send "
        viewBox="0 0 16 16"
      >
        {" "}
        <path
          d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
          fill="white"
        ></path>{" "}
      </svg>
    </button>
  </div>
);
export default AskQuestionCard;
