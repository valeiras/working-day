import React, { PropsWithChildren } from "react";

const StatsControlsContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="px-2 flex justify-center">{children}</div>;
};

export default StatsControlsContainer;
