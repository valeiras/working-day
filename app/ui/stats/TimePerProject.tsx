"use client";

import { getAllProjects } from "@/app/lib/actions";
import { primary } from "@/app/lib/colors";
import { getWorkedHours } from "@/app/lib/getWorkedHours";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, Legend } from "recharts";
import Color from "color";
import StatsContainer from "./StatsContainer";
import { LEGEND_HEIGHT, RESPONSIVE_CONTAINER_HEIGHT, RESPONSIVE_CONTAINER_WIDTH } from "@/app/lib/constants";
import ChartSkeleton from "./ChartSkeleton";

const TimePerProject: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });
  const projects = data?.data;

  const { workedHours: hours } = getWorkedHours({ projects });
  const chartData = projects?.map(({ id, name }) => {
    return { name, hours: hours[id].toFixed(2) };
  });

  return (
    <StatsContainer title="Total hours per project">
      <ResponsiveContainer width={RESPONSIVE_CONTAINER_WIDTH} height={RESPONSIVE_CONTAINER_HEIGHT} debounce={1}>
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <BarChart data={chartData}>
            <XAxis dataKey="name" tickFormatter={shortenTick} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend height={LEGEND_HEIGHT} />
            <Bar
              dataKey="hours"
              fill={Color(primary).alpha(0.9).string()}
              barSize={30}
              name="Total hours per project"
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </StatsContainer>
  );
};

const shortenTick = (value: string) => {
  return value.substring(0, 7) + (value.length > 8 ? "..." : "");
};
export default TimePerProject;
