"use client";

import { getAllProjects, getProjectsInTimeRange } from "@/app/lib/actions";
import { getWorkedHoursPerDay } from "@/app/lib/getWorkedHours";
import { formatDate } from "@/app/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import StatsContainer from "./StatsContainer";
import DailyTimePerProjectBarChart from "./DailyTimePerProjectBarChart";
import StatsControlsContainer from "./StatsControlsContainer";
import StatsProjectSelector from "./StatsProjectSelector";
import { useSelectedProjects } from "@/app/lib/hooks";
import ChartTypeSelector from "./ChartTypeSelector";
import { ChartType } from "@/app/lib/types";
import DailyTimePerProjectLineChart from "./DailyTimePerProjectLineChart";
import { useStatsContext } from "@/app/contexts/StatsContext";
import { getDateFromDateString } from "@/app/lib/dateUtils";

const chartTypes: ChartType[] = ["Bar Chart", "Line Chart"];

const DailyTimePerProject: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>("Bar Chart");
  const { initialDate, finalDate } = useStatsContext()!;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["projects with dates"],
    queryFn: () =>
      getProjectsInTimeRange({
        initialDate,
        finalDate,
      }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["projects with dates"] });
  }, [initialDate, finalDate, queryClient]);

  const projects = data?.data;

  const { workedHours: hours } = getWorkedHoursPerDay({ projects });

  const daysBack = 30;
  const date = new Date();
  date.setDate(date.getDate() - daysBack);

  const { selectedProjects, setIsSelected } = useSelectedProjects(projects);

  const chartData: Record<string, string>[] = [];
  for (let ii = 0; ii <= daysBack; ii++) {
    const day = new Date(date);
    day.setDate(day.getDate() + ii);
    const dateStr = formatDate(day);
    if (hours[dateStr] === undefined) continue;

    chartData.push({ date: dateStr, ...hours[dateStr] });
  }

  return (
    <StatsContainer title="Daily hours per project:" isLoading={isLoading}>
      {chartType === "Bar Chart" && <DailyTimePerProjectBarChart chartData={chartData} projects={selectedProjects} />}
      {chartType === "Line Chart" && <DailyTimePerProjectLineChart chartData={chartData} projects={selectedProjects} />}
      <StatsControlsContainer>
        <StatsProjectSelector setIsSelected={setIsSelected} projects={projects} />
        <ChartTypeSelector name="line-or-bar" values={chartTypes} chartType={chartType} setChartType={setChartType} />
      </StatsControlsContainer>
    </StatsContainer>
  );
};

export default DailyTimePerProject;
