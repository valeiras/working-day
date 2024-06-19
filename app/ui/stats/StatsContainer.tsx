import React, { PropsWithChildren } from "react";

type Props = { title: string };

const StatsContainer: React.FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <div className="flex flex-col items-center gap-2 bg-base-300 rounded-lg py-6">
      <h2 className="mb-2">{title}</h2>
      <div className="w-full relative text-sm">{children}</div>
    </div>
  );
};

export default StatsContainer;
