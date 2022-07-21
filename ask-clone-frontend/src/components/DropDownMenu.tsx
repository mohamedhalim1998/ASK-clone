import React, { FC } from "react";
import MenuItem, { MenuItemParams } from "./MenuItem";

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
        return <MenuItem key={index} name={item.name} icon={item.icon} />;
      })}
    </ul>
  );
};
export default DropDownMenu;
