"use client";

import { getDateString, getThisFirstOfMonth } from "@/app/lib/dateUtils";
import { DailyTimePerProject, DateRangeSelector, TotalTimePerProject } from "@/app/ui";
import React from "react";

const Stats: React.FC = () => {
  const [initialDate, setInitialDate] = React.useState(getDateString(getThisFirstOfMonth()));
  const [finalDate, setFinalDate] = React.useState(getDateString(new Date()));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full md:w-4/5 max-w-[1200px] gap-2">
        <TotalTimePerProject />
        <DailyTimePerProject />
      </div>
      <DateRangeSelector
        initialDate={initialDate}
        finalDate={finalDate}
        setInitialDate={setInitialDate}
        setFinalDate={setFinalDate}
      />
    </>
  );
};

export default Stats;
