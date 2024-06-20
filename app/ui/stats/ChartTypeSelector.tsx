import { ChartType } from "@/app/lib/types";
import React from "react";

type Props = {
  name: string;
  values: ChartType[];
  chartType: ChartType;
  setChartType: React.Dispatch<React.SetStateAction<ChartType>>;
};

const ChartTypeSelector: React.FC<Props> = ({ name, values, chartType, setChartType }) => {
  return (
    <>
      <div className="flex flex-col gap-1 bg-primary p-2 rounded-lg shadow">
        {values.map((value) => {
          return (
            <label className="label cursor-pointer p-0" key={value}>
              <span className="label-text mr-2 text-primary-content font-medium">{value}</span>
              <input
                type="radio"
                name={name}
                value={value}
                className="form-radio radio-xs"
                checked={chartType === value}
                onChange={(e) => setChartType(e.target.value as ChartType)}
              />
            </label>
          );
        })}
      </div>
    </>
  );
};

export default ChartTypeSelector;
