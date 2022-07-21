import React, { FC } from "react";
export interface MenuItemParams {
  name: string;
  icon?: string;
}

const MenuItem: FC<MenuItemParams> = (params) => {
  if (params.icon) {
    return (
      <li className="py-2 font-semibold flex flex-row text-center cursor-pointer">
        <p className="text-2xl px-2">{params.icon}</p>
        <p className=" my-auto">{params.name}</p>
      </li>
    );
  }
  return (
    <li className="py-2 text-center mx-auto cursor-pointer">{params.name}</li>
  );
};

export default MenuItem;
