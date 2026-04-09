"use client";

import { APP_ASSETS } from "@/constant/ers-assets";
import {
  SIDEBAR_PATHS,
  type SidebarItem,
  type SidebarSubMenuItem,
} from "@/ers-resources/constant/path/sidebar";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


const HOST = process.env.NEXT_PUBLIC_HOST_NAME ?? "http://localhost";
const CURRENT_PORT = process.env.NEXT_PUBLIC_PORT
  ? Number(process.env.NEXT_PUBLIC_PORT)
  : undefined;

/**
 * Builds the full href for a sidebar item.
 *
 * - If `port` is undefined or equals the current module's port → use the
 *   relative `href` (internal Next.js navigation).
 * - Otherwise → return `http://localhost:<port><href>` for cross-module
 *   navigation (Module Federation).
 */
function buildHref(href: string, port?: number): string {
  if (!port || port === CURRENT_PORT) return href;
  return `${HOST}:${port}${href}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

const SidebarMain = () => {
  const pathname = usePathname();

  return (
    <aside className="w-61 min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0  gap-1">
      <div className="flex items-center  gap-6 h-22  border-b border-gray-200 px-5 justify-center">
        <Image
          src={APP_ASSETS.MAIN_LOGO}
          alt="ERP System"
          width={30}
          height={30}
        />
        <div className="text-[15px] font-bold text-ers-primary tracking-wide flex flex-col">
          <span>ERP System</span>
          <span className="text-[12px]">V1.0 - Production</span>
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-4">
        {SIDEBAR_PATHS.map((item) =>
          item.type === "default" ? (
            <SidebarDefaultItem
              key={item.href}
              name={item.name}
              icon={item.icon}
              href={buildHref(item.href, item.port)}
              isActive={pathname === item.href}
            />
          ) : (
            <SidebarDropdownItem
              key={item.href}
              name={item.name}
              icon={item.icon}
              href={buildHref(item.href, item.port)}
              subMenuList={item.subMenuList}
              isActive={pathname.startsWith(item.href)}
              currentPath={pathname}
            />
          ),
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
          ? "bg-ers-primary text-white"
          : "text-gray-500 hover:bg-indigo-50 hover:text-ers-primary"
      }`}
    >
      <Icon icon={icon} className="text-[18px] shrink-0" />
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
  subMenuList: ReadonlyArray<SidebarSubMenuItem>;
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
            ? "bg-ers-primary text-white"
            : "text-gray-500 hover:bg-indigo-50 hover:text-ers-primary"
        }`}
      >
        <Icon icon={icon} className="text-[18px] shrink-0" />
        <span className="flex-1">{name}</span>
        <Icon
          icon="solar:alt-arrow-down-outline"
          className={`text-[14px] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="flex flex-row pt-1 pb-1 ">
          <div className="border-l border-gray-200 ml-5 mr-2"></div>
          <div className="flex flex-col gap-0.5">
            {subMenuList.map((subMenu) => {
              const fullHref = buildHref(subMenu.href, subMenu.port);
              const isSubActive = currentPath === subMenu.href;
              const isExternal = fullHref.startsWith("http");

              return (
                <Link
                  key={subMenu.href}
                  href={fullHref}
                  {...(isExternal ? { target: "_self" } : {})}
                  className={`block px-2.5 py-1.5 rounded-md font-medium text-[13px] transition-colors duration-150 ${
                    isSubActive
                      ? "text-ers-primary"
                      : "text-gray-500 hover:text-ers-primary"
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
