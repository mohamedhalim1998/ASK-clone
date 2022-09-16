import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ImageIcon } from "../utils/Icons";
import ProfileImage from "./ProfileImage";
import SendButton from "./SendButton";
interface AskQuestionParams {
  label: string;
  onSubmit: (answer: string, answerImage: FileList) => void;
  username?: string;
  fullname?: string;
  profilePic?: string;
}

interface QuestionState {
  answer: string;
  anonymously: boolean;
  imageFile?: FileList;
}

const AnswerQuestionCard: FC<AskQuestionParams> = (params) => {
  const fileReader = new FileReader();

  const [state, setState] = useState<QuestionState>({
    answer: "",
    anonymously: true,
  });

  const [src, setSrc] = useState<string>();
  fileReader.onloadend = (e) => {
    console.log(e.target);
    console.log(state);
    setSrc(e.target!.result as string);
  };
  return (
    <div className="bg-themeblack w-full rounded-md py-2 px-4 ">
      {params.username &&
        asker(params.username, params.fullname, params.profilePic)}
      <h3 className="font-semibold text-base py-2 ">{params.label}</h3>
      <textarea
        value={state.answer}
        onChange={(e) => {
          setState({
            answer: e.target.value,
            anonymously: state.anonymously,
            imageFile: state.imageFile,
          });
        }}
        className="placeholder:text-gray-400 rounded-md w-full h-12 px-2 py-3 text-base text-gray-800 min-h-6 max-h-24"
        placeholder="Answer"
      />

      {src && (
        <div className="w-full rounded-md my-4 overflow-hidden ">
          <img className="object-cover w-full h-full" src={src} alt="" />
        </div>
      )}

      <div className="flex flex-row py-4 w-full">
        <ChangeImage
          onChange={(files) => {
            setState({
              answer: state.answer,
              anonymously: state.anonymously,
              imageFile: files,
            });
            fileReader.readAsDataURL(files[0]);
          }}
        />
        {SendButton(() => {
          params.onSubmit(state.answer, state.imageFile!);
        })}
      </div>
    </div>
  );
};

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

interface ChangeImageParams {
  onChange: (file: FileList) => void;
}
const ChangeImage: FC<ChangeImageParams> = (params) => {
  return (
    <label className="font-medium my-auto px-2 cursor-pointer">
      <ImageIcon />
      <input
        type="file"
        className="hidden"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          params.onChange(target.files!);
        }}
      />
    </label>
  );
};

export default AnswerQuestionCard;
