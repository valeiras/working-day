"use client";

import { getAllProjects } from "@/app/lib/projectFetchers";
import { getWorkedHoursPerDay } from "@/app/lib/getWorkedHours";
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

const chartTypes: ChartType[] = ["Bar Chart", "Line Chart"];

const DailyTimePerProject: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>("Bar Chart");
  const { initialDate, finalDate } = useStatsContext()!;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["projects with dates"] });
  }, [initialDate, finalDate, queryClient]);

  const projects = data?.data;

  const { workedHours: hours } = getWorkedHoursPerDay({ projects, initialDate, finalDate });
  const { selectedProjects, setIsSelected } = useSelectedProjects(projects);

  const chartData: Record<string, string>[] = Object.entries(hours).map(([dateStr, hours]) => {
    return { date: dateStr, ...hours };
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
