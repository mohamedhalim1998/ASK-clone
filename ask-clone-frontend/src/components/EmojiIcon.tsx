import React from "react";
import { Link, useLocation } from "react-router-dom";

interface IconParams {
  icon: string;
  label: string;
  path: string;
  withBadge?: boolean;
  badgeCounter?: number;
}
const EmojiIcon: React.FC<IconParams> = (params) => {
  const location = useLocation();
  const isActive = location.pathname === params.path;
  return (
    <Link className="flex flex-col px-4 group" to={params.path}>
      <div className="relative mx-auto">
        {params.withBadge &&
          params.badgeCounter !== undefined &&
          params.badgeCounter > 0 && (
            <span className="absolute -right-1.5 top-0 leading-4 bg-accent h-4 w-4 text-xxs font-semibold text-center text-white rounded-full">
              {params.badgeCounter < 100 ? params.badgeCounter : "99"}
            </span>
          )}
        <p className="text-xl">{params.icon}</p>
      </div>
      <p
        className={
          isActive
            ? "text-xs text-white"
            : "text-gray-500 text-xs group-hover:text-accent"
        }
      >
        {params.label}
      </p>
    </Link>
  );
};

export default EmojiIcon;
