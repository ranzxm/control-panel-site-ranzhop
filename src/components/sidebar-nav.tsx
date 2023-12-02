"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: any;
  }[];
}

const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const pathname = usePathname();
  return (
    <nav className={cn("flex gap-1 flex-col", className)} {...props}>
      {items.map((item, index) => (
        <Link
          key={index + 1}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted" : "bg-transparent",
            "justify-start"
          )}
        >
          <div className="icon mr-3">{item.icon}</div>
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;
