import React from "react";
import { SendIcon } from "../utils/Icons";

const SendButton = (onSubmit: () => void, remain?: number) => (
  <div className="flex flex-row ml-auto self-end">
    {remain && (
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
export default SendButton;
