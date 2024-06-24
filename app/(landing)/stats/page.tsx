"use client";

import { StatsContextProvider } from "@/app/contexts/StatsContext";
import { DailyTimePerProject, DateRangeSelector, TotalTimePerProject } from "@/app/ui";
import React from "react";

const Stats: React.FC = () => {
  return (
    <StatsContextProvider>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full md:w-4/5 max-w-[1200px] gap-2">
        <TotalTimePerProject />
        <DailyTimePerProject />
      </div>
      <DateRangeSelector />
    </StatsContextProvider>
  );
};

export default Stats;
