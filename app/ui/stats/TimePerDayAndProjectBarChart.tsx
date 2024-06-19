"use client";

import React from "react";
import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, ResponsiveContainer } from "recharts";
import { themeColors } from "@/app/lib/colors";
import { shortenDate, shortenTick } from "@/app/lib/utils";
import Color from "color";

import { LEGEND_HEIGHT, RESPONSIVE_CONTAINER_HEIGHT, RESPONSIVE_CONTAINER_WIDTH } from "@/app/lib/constants";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";

type Props = { chartData: Record<string, string>[]; projects: ProjectWithWorkingTimes[] | null | undefined };

const TimePerDayAndProjectBarChart: React.FC<Props> = ({ chartData, projects }) => {
  return (
    <ResponsiveContainer width={RESPONSIVE_CONTAINER_WIDTH} height={RESPONSIVE_CONTAINER_HEIGHT} debounce={1}>
      <BarChart data={chartData}>
        <XAxis dataKey="date" tickFormatter={shortenDate} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend align="center" formatter={shortenTick} height={LEGEND_HEIGHT} />
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
  );
};

export default TimePerDayAndProjectBarChart;
