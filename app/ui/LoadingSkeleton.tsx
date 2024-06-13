import React from "react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6">
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-64"></div>
        <div className="skeleton h-4 w-60"></div>
        <div className="skeleton h-4 w-56"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;