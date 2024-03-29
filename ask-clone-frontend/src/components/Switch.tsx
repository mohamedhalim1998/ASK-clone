import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
interface SwitchParams {
  checked?: boolean;
  register?: UseFormRegisterReturn;
  onChange?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Switch: FC<SwitchParams> = (params) => {
  return (
    <label
      className="relative inline-block w-8 h-4 my-auto"
      onClick={params.onChange}
    >
      <input
        disabled
        className="hidden"
        type="checkbox"
        checked={params.checked}
        {...params.register}
      />
      <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 duration-500 round slider "></span>
    </label>
  );
};

export default Switch;
