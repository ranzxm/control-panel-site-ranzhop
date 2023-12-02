"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";
const SeparatorHorizontal = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <div className={cn(className, "w-full h-max")}>
      <Separator className="border" />
    </div>
  );
};

export default SeparatorHorizontal;
