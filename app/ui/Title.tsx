import React from "react";
import Info from "./Info";

const infoText = "Please, use it to limit the amount of hours you spend working. Work less. Live better. Tax the rich.";

const Title: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-12">
      <h1 className="text-6xl font-bold">Working Day</h1>
      <div className="flex items-end">
        <p className="text-xl h-fit">A time tracker app to manage your work hours</p>
        <Info text={infoText} className="mb-2 ml-1" />
      </div>
    </div>
  );
};

export default Title;
