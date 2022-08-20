import React, { FC, useState } from "react";
import Switch from "./Switch";

interface AskQuestionParams {
  label: string;
  onSubmit?: (question: string, anonymously: boolean) => void;
  showImage?: boolean;
}

interface QuestionState {
  question: string;
  anonymously: boolean;
}

const AskQuestionCard: FC<AskQuestionParams> = (params) => {
  const [state, setState] = useState<QuestionState>({
    question: "",
    anonymously: true,
  });
  return (
    <div className="bg-themeblack w-full rounded-md py-2 px-4 ">
      <h3 className="font-semibold text-base py-2 ">{params.label}</h3>
      <textarea
        value={state.question}
        onChange={(e) => {
          setState({
            question: e.target.value,
            anonymously: state.anonymously,
          });
        }}
        className="placeholder:text-gray-400 rounded-md w-full h-12 px-2 py-3 text-base text-gray-800 min-h-6 max-h-24"
        placeholder={params.label}
      />
      <div className="flex flex-row py-4  justify-between">
        {askAnonymouslySwitch(
          state.anonymously,
          () => {
            setState({
              question: state.question,
              anonymously: !state.anonymously,
            });
          },
          params.showImage
        )}
        {askButton(300 - state.question.length, () => {
          if (params.onSubmit)
            params.onSubmit(state.question, state.anonymously);
        })}
      </div>
    </div>
  );
};

const askAnonymouslySwitch = (
  checked: boolean,
  onClick: () => void,
  showImage?: boolean
) => (
  <div className="flex flex-row">
    {showImage && (
      <svg
        className="w-8 h-8 my-auto mr-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    )}
    <div className="flex flex-row cursor-pointer" onClick={onClick}>
      <Switch checked={checked} />
      <p className="pl-4 text-xs text-gray-300 my-auto">Ask anonymously</p>
    </div>
  </div>
);

const askButton = (remain: number, onSubmit: () => void) => (
  <div className="flex flex-row ">
    <p className="pl-4 text-xs font-semibold text-gray-300 my-auto">{remain}</p>
    <button
      className="mx-2 px-6 py-2 bg-accent rounded-md content-center hover:bg-accentdark"
      onClick={onSubmit}
    >
      <SendIcon />
    </button>
  </div>
);

const SendIcon = () => {
  return (
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
  );
};
export default AskQuestionCard;
