"use client";

import { getAllProjects } from "@/app/lib/actions";
import { primary } from "@/app/lib/colors";
import { getWorkedHours } from "@/app/lib/getWorkedHours";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, Legend, Customized } from "recharts";
import Color from "color";
import StatsContainer from "./StatsContainer";
import {
  CHART_MARGIN,
  LEGEND_HEIGHT,
  RESPONSIVE_CONTAINER_HEIGHT,
  RESPONSIVE_CONTAINER_WIDTH,
} from "@/app/lib/constants";
import StatsProjectSelector from "./StatsProjectSelector";
import { useSelectedProjects } from "@/app/lib/hooks";
import StatsControlsContainer from "./StatsControlsContainer";

const TotalTimePerProject: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });
  const projects = data?.data;

  const { workedHours: hours } = getWorkedHours({ projects });
  const { selectedProjects, setIsSelected } = useSelectedProjects(projects);

  const chartData = selectedProjects?.map(({ id, name }) => {
    return { name, hours: hours[id].toFixed(2) };
  });

  return (
    <StatsContainer title="Total hours per project" isLoading={isLoading}>
      <ResponsiveContainer width={RESPONSIVE_CONTAINER_WIDTH} height={RESPONSIVE_CONTAINER_HEIGHT} debounce={1}>
        <BarChart data={chartData} margin={CHART_MARGIN}>
          <XAxis dataKey="name" tickFormatter={shortenTick} />
          <YAxis domain={[0, "dataMax"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip contentStyle={{ borderRadius: "20px" }} itemStyle={{ color: primary }} />
          <Legend align="center" formatter={() => "Hours"} height={LEGEND_HEIGHT} />
          <Bar dataKey="hours" fill={Color(primary).alpha(0.9).string()} barSize={30} name="Total hours per project" />
        </BarChart>
      </ResponsiveContainer>
      <StatsControlsContainer className="mt-1">
        <StatsProjectSelector setIsSelected={setIsSelected} projects={projects} />
      </StatsControlsContainer>
    </StatsContainer>
  );
};

const shortenTick = (value: string) => {
  return value.substring(0, 7) + (value.length > 8 ? "..." : "");
};
export default TotalTimePerProject;
