import React from "react";

const ChartSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[250px] p-6 flex flex-col gap-4 justify-between">
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-5/6"></div>
      <div className="skeleton h-4 w-4/5"></div>
      <div className="skeleton h-4 w-3/4"></div>
    </div>
  );
};

export default ChartSkeleton;
