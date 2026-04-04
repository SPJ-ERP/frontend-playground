import { Icon } from "@iconify/react";
import React from "react";

const NavMain = () => {
  return (
    <nav className="w-full h-16.25 bg-white border-b border-gray-200 flex items-center justify-between px-5">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Dashboard</span>
        {/* <Icon icon="solar:alt-arrow-right-linear" className="text-[14px] text-gray-500" />
        <span className="text-sm font-medium text-gray-800">Home</span> */}
      </div>
      <div className="flex items-center gap-2">
        <Icon icon="solar:bell-linear" className="text-[20px] text-gray-600" />
        <div className="bg-[#2D378E]/50 p-1 rounded-full">
          <Icon icon="solar:settings-outline" className="text-[20px] text-[#2D378E]" />
        </div>
      </div>
    </nav>
  );
};

export default NavMain;
