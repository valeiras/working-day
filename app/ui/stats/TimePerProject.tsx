"use client";

import { getAllProjects } from "@/app/lib/actions";
import { primary } from "@/app/lib/colors";
import { getAllTimers } from "@/app/lib/getTimers";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, Legend } from "recharts";

const TimePerProject: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });
  const projects = data?.data;

  const { totalTimersCs } = getAllTimers({ projects });
  const hours: Record<number, number> = {};
  Object.entries(totalTimersCs).forEach(([projectId, totalCs]) => {
    hours[parseInt(projectId)] = totalCs / (100 * 60 * 60);
  });

  const chartData = projects?.map(({ id, name }) => {
    return { name, hours: hours[id].toFixed(2) };
  });

  return (
    <div className="flex flex-col items-center gap-2 bg-base-300 rounded-lg py-4">
      <h2>Total hours per project:</h2>
      {/* This is a hack: for some reason, the Responsive container does not fill the whole width of the parent */}
      <div className="w-full h-64 relative right-5">
        <ResponsiveContainer width="100%" debounce={1}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" tickFormatter={shortenTick} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="hours" fill={primary} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const shortenTick = (value: string) => {
  return value.substring(0, 7) + (value.length > 8 ? "..." : "");
};
export default TimePerProject;
