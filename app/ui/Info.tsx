import React from "react";
import { cn } from "../lib/utils";

type Props = { text: string; className?: string };

const Info: React.FC<Props> = ({ text, className }) => {
  return (
    <sup className={cn("tooltip", className)} data-tip={text}>
      <button className="badge badge-outline rounded-full w-4 h-4 p-1 text-xs">?</button>
    </sup>
  );
};

export default Info;
