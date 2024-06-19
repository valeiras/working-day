"use client";

import { getAllProjects } from "@/app/lib/actions";
import { getWorkedHoursPerDay } from "@/app/lib/getWorkedHours";
import { formatDate } from "@/app/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import StatsContainer from "./StatsContainer";
import TimePerDayAndProjectBarChart from "./TimePerDayAndProjectBarChart";
import ChartSkeleton from "./ChartSkeleton";

const TimePerDayAndProject: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });
  const projects = data?.data;

  const { workedHours: hours } = getWorkedHoursPerDay({ projects });

  const daysBack = 30;
  const date = new Date();
  date.setDate(date.getDate() - daysBack);

  const chartData: Record<string, string>[] = [];
  for (let ii = 0; ii < daysBack; ii++) {
    const day = new Date(date);
    day.setDate(day.getDate() + ii);
    const dateStr = formatDate(day);
    if (hours[dateStr] === undefined) continue;

    chartData.push({ date: dateStr, ...hours[dateStr] });
  }

  return (
    <StatsContainer title="Total hours per project and day:">
      {isLoading ? <ChartSkeleton /> : <TimePerDayAndProjectBarChart chartData={chartData} projects={projects} />}
    </StatsContainer>
  );
};

export default TimePerDayAndProject;