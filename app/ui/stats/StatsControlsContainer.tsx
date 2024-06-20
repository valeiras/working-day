import { cn } from "@/app/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = { className?: string };
const StatsControlsContainer: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div className={cn("flex-1 px-2 mt-5 sm:mt-3 flex gap-4 justify-center items-center", className)}>{children}</div>
  );
};

export default StatsControlsContainer;
