"use client";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { getAvatarUrl } from "@/utils/avatar";
import Link from "next/link";
import { BreadcrumbCustom } from "@/components/breadcrumb";

const NavMain = () => {
  return (
    <nav className="w-full h-22 bg-white border-b border-gray-200 flex items-center justify-between px-10">
      {/* Breadcrumbs */}
      <BreadcrumbCustom />

      {/* User Profile & Notifications */}
      <div className="flex items-center gap-4">
        <Icon icon="solar:bell-linear" className="text-[25px] text-gray-600" />
        <div className="bg-ers-primary/30 p-1 rounded-full">
          <Icon
            icon="solar:settings-outline"
            className="text-[25px] text-ers-primary"
          />
        </div>
        <UserProfile />
      </div>
    </nav>
  );
};

export default NavMain;

const UserProfile = () => {
  const [chevronOpen, setChevronOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger
        className="flex items-center cursor-pointer"
        onClick={() => setChevronOpen(!chevronOpen)}
      >
        <div>
          <Image
            // src={userinfo.data?.data.image || getAvatarUrl(userinfo.data?.data.name || "User")}
            src={getAvatarUrl("Devit")}
            alt="User Profile"
            width={40}
            height={40}
            className=" rounded-full"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 text-sm ">
        <div className="flex flex-col gap-6 px-3 py-1 ">
          <div className="flex items-center gap-3 ">
            <Image
              // src={userinfo.data?.data.image || getAvatarUrl(userinfo.data?.data.name || "User")}
              src={getAvatarUrl("Devit")}
              alt="User Profile"
              width={55}
              height={55}
              className=" rounded-full"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Devit Erlingga</span>
              <span className="text-xs ">Super Admin</span>
              <span className="text-xs ">IT</span>
            </div>
          </div>
          <Link href="/logout" className="px-2 py-1 rounded-lg bg-ers-red text-white hover:bg-ers-red/80 cursor-pointer text-center">
            Logout
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};
