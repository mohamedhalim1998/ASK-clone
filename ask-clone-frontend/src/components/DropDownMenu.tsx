import React, { FC } from "react";
import { Link } from "react-router-dom";

interface MenuParams {
  show: boolean;
  items: MenuItemParams[];
  background?: string;
  width?: string;
}

const DropDownMenu: FC<MenuParams> = (params) => {
  var className =
    "w-full bg-accent my-4 absolute origin-bottom-right right-0 rounded-md text-xs overflow-hidden";

  if (params.show) {
    className += " drop";
  } else {
    className += " drop-hidden";
  }
  return (
    <ul
      className={className}
      style={{
        background: params.background,
        width: params.width,
      }}
    >
      {params.items.map((item, index) => {
        return <MenuItem key={index} {...item} />;
      })}
    </ul>
  );
};

export interface MenuItemParams {
  name: string;
  url?: string;
  icon?: string;
  action?: () => void;
}

const MenuItem: FC<MenuItemParams> = (params) => {
  return (
    <div onClick={params.action}>
      <Link
        to={params.url !== undefined ? params.url : "#"}
        className="py-2 font-semibold flex flex-row text-center cursor-pointer"
      >
        {params.icon && <p className="text-2xl pl-2">{params.icon}</p>}
        <p className="mx-auto my-auto">{params.name}</p>
      </Link>
    </div>
  );
};

export default DropDownMenu;
