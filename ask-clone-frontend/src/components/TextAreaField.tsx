import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
interface TextAreaParams {
  label: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
}
const TextAreaField: FC<TextAreaParams> = (params) => {
  return (
    <div>
      <h5 className="text-xs font-semibold mt-4 mb-1">{params.label}</h5>
      <textarea
        placeholder={params.placeholder}
        {...params.register}
        className="border py-3 px-2 w-full rounded-sm focus:outline-none max-w-full min-w-full max-h-60 min-h-6"
      />
    </div>
  );
};

export default TextAreaField;
