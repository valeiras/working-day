"use client";

import React from "react";
import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend, ResponsiveContainer } from "recharts";
import { displayColors, primary } from "@/app/lib/colors";
import { shortenDate, shortenTick } from "@/app/lib/utils";
import Color from "color";

import {
  CHART_MARGIN,
  LEGEND_HEIGHT,
  RESPONSIVE_CONTAINER_HEIGHT,
  RESPONSIVE_CONTAINER_WIDTH,
} from "@/app/lib/constants";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";

type Props = { chartData: Record<string, string>[]; projects: ProjectWithWorkingTimes[] | null | undefined };

const TimePerDayAndProjectBarChart: React.FC<Props> = ({ chartData, projects }) => {
  return (
    <ResponsiveContainer width={RESPONSIVE_CONTAINER_WIDTH} height={RESPONSIVE_CONTAINER_HEIGHT} debounce={1}>
      <BarChart data={chartData} margin={CHART_MARGIN}>
        <XAxis dataKey="date" tickFormatter={shortenDate} />
        <YAxis domain={[0, "dataMax"]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip contentStyle={{ borderRadius: "20px" }} itemStyle={{ color: primary }} />

        <Legend
          align="center"
          formatter={shortenTick}
          height={LEGEND_HEIGHT}
          wrapperStyle={{ textAlign: "center", left: 10 }}
        />
        {projects?.map(({ name, id }, idx) => {
          const round = Math.floor(idx / displayColors.length);
          const color = Color(displayColors[idx % displayColors.length])
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
