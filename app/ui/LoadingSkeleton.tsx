import React from "react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6 w-full max-w-[420px] md:w-[800px] md:max-w-none">
      <div className="flex flex-col justify-center gap-8 p-12">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-5/6"></div>
        <div className="skeleton h-4 w-4/5"></div>
        <div className="skeleton h-4 w-3/4"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
