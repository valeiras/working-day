"use client";

import { getAllProjects } from "@/app/lib/actions";
import { primary } from "@/app/lib/colors";
import { getWorkedHours } from "@/app/lib/getWorkedHours";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, Legend } from "recharts";
import Color from "color";

const TimePerProject: React.FC = () => {
  const { data } = useQuery({
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
    <div className="flex flex-col items-center gap-2 bg-base-300 rounded-lg py-6">
      <h2>Total hours per project:</h2>
      {/* This is a hack: for some reason, the Responsive container does not fill the whole width of the parent */}
      <div className="w-full h-64 relative right-3 text-sm">
        <ResponsiveContainer width="95%" debounce={1}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" tickFormatter={shortenTick} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="hours" fill={Color(primary).alpha(0.9).string()} barSize={30} />
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
