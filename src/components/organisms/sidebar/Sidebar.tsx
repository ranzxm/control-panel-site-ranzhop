"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import SidebarNav from "@/components/sidebar-nav";
import {
  DashboardIcon,
  CubeIcon,
  PersonIcon,
  LoopIcon,
  GearIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/panel/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "User Managements",
      href: "/panel/user",
      icon: <PersonIcon />,
    },
    {
      title: "Product Managements",
      href: "/panel/product",
      icon: <CubeIcon />,
    },
    {
      title: "Transactions",
      href: "/panel/transcation",
      icon: <LoopIcon />,
    },
    {
      title: "Settings",
      href: "/panel/setting",
      icon: <GearIcon />,
    },
  ];
  const pathname = usePathname();
  return (
    <div className="flex-none w-72 h-screen p-4 flex">
      <div className="navigation-menu">
        <div className="navigation-menu-list">
          <SidebarNav items={sidebarNavItems} />
          <Button variant={"ghost"} className="w-full justify-start flex" onClick={() => signOut()}>
            <ExitIcon className="mr-3" />
            SignOut
          </Button>
        </div>
      </div>
      <Separator aria-orientation="vertical" className="ml-9 border" />
    </div>
  );
};

export default Sidebar;
