"use client";

import React from "react";
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { displayColors, primary } from "@/app/lib/colors";
import { formatHours, shortenDate, shortenTick } from "@/app/lib/utils";
import Color from "color";

import {
  CHART_MARGIN,
  LEGEND_HEIGHT,
  RESPONSIVE_CONTAINER_HEIGHT,
  RESPONSIVE_CONTAINER_WIDTH,
} from "@/app/lib/constants";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";

type Props = { chartData: Record<string, string>[]; projects: ProjectWithWorkingTimes[] | null | undefined };

const DailyTimePerProjectLineChart: React.FC<Props> = ({ chartData, projects }) => {
  return (
    <ResponsiveContainer width={RESPONSIVE_CONTAINER_WIDTH} height={RESPONSIVE_CONTAINER_HEIGHT} debounce={1}>
      <LineChart data={chartData} margin={CHART_MARGIN}>
        <XAxis dataKey="date" tickFormatter={shortenDate} />
        <YAxis domain={[0, "dataMax + 1"]} tickFormatter={(value) => value.toFixed(0)} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip contentStyle={{ borderRadius: "5px" }} itemStyle={{ color: primary }} formatter={formatHours} />
        <Legend
          align="center"
          formatter={shortenTick}
          height={LEGEND_HEIGHT}
          wrapperStyle={{ textAlign: "center", left: 10 }}
        />
        {projects?.map(({ name }, idx) => {
          const round = Math.floor(idx / displayColors.length);
          const color = Color(displayColors[idx % displayColors.length])
            .alpha(0.9)
            .lighten(0.2)
            .desaturate(round / (round + 1 + 1))
            .string();
          return <Line key={name} type="monotone" dataKey={name} stroke={color} dot={false} strokeWidth={2} />;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DailyTimePerProjectLineChart;
