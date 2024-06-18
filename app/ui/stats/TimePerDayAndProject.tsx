"use client";

import { getAllProjects } from "@/app/lib/actions";
import { primary, themeColors } from "@/app/lib/colors";
import { getWorkedHoursPerDay } from "@/app/lib/getWorkedHours";
import { formatDate, shortenDate, shortenTick } from "@/app/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Color from "color";

import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, Legend } from "recharts";

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

  const chartData = [];
  for (let ii = 0; ii < daysBack; ii++) {
    const day = new Date(date);
    day.setDate(day.getDate() + ii);
    const dateStr = formatDate(day);
    if (hours[dateStr] === undefined) continue;

    chartData.push({ date: dateStr, ...hours[dateStr] });
  }

  return (
    <div className="flex flex-col items-center gap-2 bg-base-300 rounded-lg py-6">
      <h2>Total hours per project and day:</h2>
      {/* This is a hack: for some reason, the Responsive container does not fill the whole width of the parent */}
      <div className="w-full h-64 relative right-3 text-sm">
        <ResponsiveContainer width="95%" debounce={1}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" tickFormatter={shortenDate} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend align="center" formatter={shortenTick} />
            {projects?.map(({ name, id }, idx) => {
              const round = Math.floor(idx / themeColors.length);
              const color = Color(themeColors[idx % themeColors.length])
                .alpha(0.9)
                .desaturate(round / (round + 1 + 1))
                .string();
              return <Bar key={id} dataKey={name} fill={color} stackId="a" />;
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimePerDayAndProject;
