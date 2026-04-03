"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarItem =
  | {
      name: string;
      icon: string;
      href: string;
      type: "default";
    }
  | {
      name: string;
      icon: string;
      href: string;
      type: "dropdown";
      subMenuList: ReadonlyArray<{ name: string; href: string }>;
    };

const ITEMS: SidebarItem[] = [
  {
    name: "Dashboard",
    icon: "solar:home-smile-outline",
    href: "/dashboard",
    type: "default",
  },
  {
    name: "Master Data",
    icon: "solar:folder-outline",
    href: "/dashboard/master-data",
    type: "dropdown",
    subMenuList: [
      { name: "Bahan Baku", href: "/dashboard/master-data/bahan-baku" },
      { name: "Bahan Pembantu", href: "/dashboard/master-data/bahan-pembantu" },
      { name: "Produk", href: "/dashboard/master-data/products" },
      { name: "Brand", href: "/dashboard/master-data/brand" },
      { name: "Supplier", href: "/dashboard/master-data/supplier" },
      { name: "Gudang", href: "/dashboard/master-data/gudang" },
      { name: "COA", href: "/dashboard/master-data/coa" },
    ],
  },
];

const SidebarMain = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] min-h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0 px-3 py-5 gap-1">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 pb-5 mb-2 border-b border-gray-200">
        <Icon icon="solar:box-bold" className="text-[24px] text-[#1e2d6b]" />
        <span className="text-[15px] font-bold text-[#1e2d6b] tracking-wide">
          ERP SPJ
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-0.5">
        {ITEMS.map((item) =>
          item.type === "default" ? (
            <SidebarDefaultItem
              key={item.href}
              name={item.name}
              icon={item.icon}
              href={item.href}
              isActive={pathname === item.href}
            />
          ) : (
            <SidebarDropdownItem
              key={item.href}
              name={item.name}
              icon={item.icon}
              href={item.href}
              subMenuList={item.subMenuList}
              isActive={pathname.startsWith(item.href)}
              currentPath={pathname}
            />
          )
        )}
      </nav>
    </aside>
  );
};

export default SidebarMain;


const SidebarDefaultItem = ({
  name,
  icon,
  href,
  isActive,
}: Readonly<{
  name: string;
  icon: string;
  href: string;
  isActive: boolean;
}>) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors duration-150 ${
        isActive
          ? "bg-[#1e2d6b] text-white"
          : "text-gray-500 hover:bg-indigo-50 hover:text-[#1e2d6b]"
      }`}
    >
      <Icon icon={icon} className="text-[18px] flex-shrink-0" />
      <span>{name}</span>
    </Link>
  );
};

const SidebarDropdownItem = ({
  name,
  icon,
  href,
  subMenuList,
  isActive,
  currentPath,
}: Readonly<{
  name: string;
  icon: string;
  href: string;
  subMenuList: ReadonlyArray<{ name: string; href: string }>;
  isActive: boolean;
  currentPath: string;
}>) => {
  const [isOpen, setIsOpen] = useState(isActive);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium w-full text-left transition-colors duration-150 ${
          isActive
            ? "bg-[#1e2d6b] text-white"
            : "text-gray-500 hover:bg-indigo-50 hover:text-[#1e2d6b]"
        }`}
      >
        <Icon icon={icon} className="text-[18px] flex-shrink-0" />
        <span className="flex-1">{name}</span>
        <Icon
          icon="solar:alt-arrow-down-outline"
          className={`text-[14px] flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="flex flex-row pt-1 pb-1 ">
          <div className="border-l border-gray-200 ml-5 mr-2">
          </div>
          <div className="flex flex-col gap-0.5">
          {subMenuList.map((subMenu) => {
            const isSubActive = currentPath === subMenu.href;
            return (
              <Link
                key={subMenu.href}
                href={subMenu.href}
                className={`block px-2.5 py-1.5 rounded-md text-[13px] transition-colors duration-150 ${
                  isSubActive
                    ? "text-[#1e2d6b] font-semibold underline underline-offset-2"
                    : "text-gray-500 hover:text-[#1e2d6b] hover:underline"
                }`}
              >
                {subMenu.name}
              </Link>
            );
          })}
          </div>
        </div>
      )}
    </div>
  );
};
