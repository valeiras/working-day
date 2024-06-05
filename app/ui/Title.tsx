import React from "react";
import Info from "./Info";

const infoText =
  "Please, use this app to limit the amount of hours you spend working. Work less. Live happier. Tax the rich.";

const Title: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-12">
      <h1 className="text-6xl font-bold">Working Day</h1>
      <div className="flex items-end">
        <p className="text-xl h-fit">A time tracker app to manage your work hours</p>
        <Info text={infoText} className="mb-2 ml-1" />
      </div>
    </div>
  );
};

export default Title;
