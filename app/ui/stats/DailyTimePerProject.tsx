"use client";

import { getWorkedHoursPerDay } from "@/app/lib/getWorkedHours";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import StatsContainer from "./StatsContainer";
import DailyTimePerProjectBarChart from "./DailyTimePerProjectBarChart";
import StatsControlsContainer from "./StatsControlsContainer";
import StatsProjectSelector from "./StatsProjectSelector";
import { useProjects, useSelectedProjects } from "@/app/lib/hooks";
import ChartTypeSelector from "./ChartTypeSelector";
import { ChartType } from "@/app/lib/types";
import DailyTimePerProjectLineChart from "./DailyTimePerProjectLineChart";
import { useStatsContext } from "@/app/contexts/StatsContext";

const chartTypes: ChartType[] = ["Bar Chart", "Line Chart"];

const DailyTimePerProject: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>("Bar Chart");
  const { initialDate, finalDate } = useStatsContext()!;
  const queryClient = useQueryClient();

  const { projects, isLoading } = useProjects();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["projects with dates"] });
  }, [initialDate, finalDate, queryClient]);

  const { workedHours: hours } = getWorkedHoursPerDay({ projects, initialDate, finalDate });
  const { selectedProjects, setIsSelected } = useSelectedProjects(projects);

  const chartData: Record<string, string>[] = Object.entries(hours).map(([dateStr, hoursThatDay]) => {
    const output: Record<string, string> = { date: dateStr };
    Object.entries(hoursThatDay).forEach(([projectId, time]) => {
      output[projectId] = String(time);
    });
    return { date: dateStr, ...hoursThatDay };
  });

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
