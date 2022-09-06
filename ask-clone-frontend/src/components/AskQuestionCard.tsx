import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ImageIcon, SendIcon } from "../utils/Icons";
import Switch from "./Switch";

interface AskQuestionParams {
  label: string;
  hint?: string;
  onSubmit?: (question: string, anonymously: boolean) => void;
  showImage?: boolean;
  hideAnonymously?: boolean;
  removeLimit?: boolean;
  username?: string;
  fullname?: string;
  profilePic?: string;
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
      {params.username &&
        asker(params.username, params.fullname, params.profilePic)}
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
        {!params.hideAnonymously &&
          askAnonymouslySwitch(
            state.anonymously,
            () => {
              setState({
                question: state.question,
                anonymously: !state.anonymously,
              });
            },
            params.showImage
          )}
        {askButton(
          300 - state.question.length,
          () => {
            if (params.onSubmit)
              params.onSubmit(state.question, state.anonymously);
          },
          !params.removeLimit
        )}
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
    {showImage && <ImageIcon />}
    <div className="flex flex-row cursor-pointer" onClick={onClick}>
      <Switch checked={checked} />
      <p className="pl-4 text-xs text-gray-300 my-auto">Ask anonymously</p>
    </div>
  </div>
);

const askButton = (
  remain: number,
  onSubmit: () => void,
  showCounter: boolean = true
) => (
  <div className="flex flex-row ml-auto self-end">
    {showCounter && (
      <p className="pl-4 text-xs font-semibold text-gray-300 my-auto">
        {remain}
      </p>
    )}
    <button
      className="mx-2 px-6 py-2 bg-accent rounded-md content-center hover:bg-accentdark"
      onClick={onSubmit}
    >
      <SendIcon />
    </button>
  </div>
);
function asker(username: string, fullname?: string, profilePic?: string) {
  return (
    <div className="flex felx-row">
      {ProfileImage(profilePic)}
      <Link
        className="my-auto font-semibold text-sm mx-2 text-gray-400"
        to={`/user/${username}`}
      >
        {fullname}
      </Link>
    </div>
  );
}
const ProfileImage = (url?: string) => {
  return (
    <div
      className="rounded-full bg-center w-10 h-10 bg-cover opacity-80"
      style={{
        backgroundImage: ` url(http://localhost:8080/image/${url})`,
      }}
    />
  );
};

export default AskQuestionCard;
