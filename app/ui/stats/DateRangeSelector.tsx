"use client";

import { useStatsContext } from "@/app/contexts/StatsContext";
import {
  getDateString,
  getPastFirstOfMonth,
  getPastLastOfMonth,
  getPastMonday,
  getPastSunday,
  getThisFirstOfMonth,
  getThisMonday,
} from "@/app/lib/dateUtils";
import React, { useEffect, useState } from "react";

const ranges = ["Past week", "Past month", "This week", "This month", "Custom range"] as const;
type RangeType = (typeof ranges)[number];

const DateRangeSelector: React.FC = () => {
  const [range, setRange] = useState<RangeType>("This month");
  const { initialDate, finalDate, setInitialDate, setFinalDate } = useStatsContext()!;

  useEffect(() => {
    setInitialDate(getDateString(getThisFirstOfMonth()));
    setFinalDate(getDateString(new Date()));
    setRange("This month");
  }, [setFinalDate, setInitialDate]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRange: RangeType = e.target.value as RangeType;
    setRange(newRange);

    switch (newRange) {
      case "Past week":
        setInitialDate(getDateString(getPastMonday()));
        setFinalDate(getDateString(getPastSunday()));
        break;
      case "This week":
        setInitialDate(getDateString(getThisMonday()));
        setFinalDate(getDateString(new Date()));
        break;
      case "Past month":
        setInitialDate(getDateString(getPastFirstOfMonth()));
        setFinalDate(getDateString(getPastLastOfMonth()));
        break;
      case "This month":
        setInitialDate(getDateString(getThisFirstOfMonth()));
        setFinalDate(getDateString(new Date()));
        break;
      case "Custom range":
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <select name="dateRange" className="select select-bordered w-48" value={range} onChange={handleChange}>
        {ranges.map((range) => {
          return (
            <option key={range} value={range}>
              {range}
            </option>
          );
        })}
      </select>
      <input
        className="input input-bordered text-sm"
        aria-label="Date"
        type="date"
        value={initialDate}
        onChange={(e) => setInitialDate(e.target.value)}
        disabled={range !== "Custom range"}
      />
      <input
        className="input input-bordered text-sm"
        aria-label="Date"
        type="date"
        value={finalDate}
        onChange={(e) => setFinalDate(e.target.value)}
        disabled={range !== "Custom range"}
      />
    </div>
  );
};

export default DateRangeSelector;
