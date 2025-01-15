"use client";

import React, { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import "@rainbow-me/rainbowkit/styles.css";

const Sidebar: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center py-32">
        {children}
      </div>
      <div className="drawer-side flex">
        <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
          <SidebarItem name={"Overview"} path={"/"} />
          <SidebarItem name={"Tables"} path={"/tables"} />
        </ul>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  name: string;
  path: string;
}

const SidebarItem = ({ name, path }: SidebarItemProps) => {
  const currentPath = usePathname();
  const style = currentPath === path ? "bg-base-300 rounded-md" : "";

  return (
    <li className={style}>
      <a href={path}>{name}</a>
    </li>
  );
};

export default Sidebar;
