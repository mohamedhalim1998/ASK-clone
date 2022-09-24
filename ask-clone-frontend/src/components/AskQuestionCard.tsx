import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import SendButton from "./SendButton";
import Switch from "./Switch";

interface AskQuestionParams {
  label: string;
  hint?: string;
  allowAnonymously?: boolean;
  onSubmit?: (question: string, anonymously: boolean) => void;
}

interface QuestionState {
  question: string;
  anonymously: boolean;
}

const AskQuestionCard: FC<AskQuestionParams> = (params) => {
  const [state, setState] = useState<QuestionState>({
    question: "",
    anonymously: false,
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
        placeholder={params.hint ? params.hint : params.label}
      />
      <div className="flex flex-row py-4 w-full">
        {askAnonymouslySwitch(state.anonymously, () => {
          console.log("switch" + params.allowAnonymously);
          if (params.allowAnonymously) {
            setState({
              question: state.question,
              anonymously: !state.anonymously,
            });
          } else toast("This user doesn't allow anonymously questions");
        })}
        {SendButton(() => {
          if (params.onSubmit)
            params.onSubmit(state.question, state.anonymously);
        }, 300 - state.question.length)}
      </div>
    </div>
  );
};

const askAnonymouslySwitch = (checked: boolean, onClick: () => void) => (
  <div className="flex flex-row">
    <div className="flex flex-row cursor-pointer" onClick={onClick} >
      <Switch
        checked={checked}
      />
      <p className="pl-4 text-xs text-gray-300 my-auto">Ask anonymously</p>
    </div>
  </div>
);

export default AskQuestionCard;
