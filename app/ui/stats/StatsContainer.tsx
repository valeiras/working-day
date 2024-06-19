"use client";

import React, { PropsWithChildren } from "react";
import ChartSkeleton from "./ChartSkeleton";

type Props = { title: string; isLoading: boolean };

const StatsContainer: React.FC<PropsWithChildren<Props>> = ({ children, title, isLoading }) => {
  return (
    <div className="flex flex-col items-center gap-2 bg-base-300 rounded-lg py-6">
      <h2 className="mb-4">{title}</h2>
      <div className="w-full relative text-sm">{isLoading ? <ChartSkeleton /> : children}</div>
    </div>
  );
};

export default StatsContainer;
