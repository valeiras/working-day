import React from "react";
import Info from "./Info";

const infoText =
  "Please, use this app to limit the amount of hours you spend working. Work less. Live happier. Tax the rich.";

const Title: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center md:mt-8">
      <h1 className="text-4xl md:text-6xl font-bold">Working Day</h1>
      <div className="flex items-end">
        <p className="text-lg md:text-xl h-fit">
          A time tracker app to manage your work hours
          <Info text={infoText} className="mb-2 ml-1" />
        </p>
      </div>
    </div>
  );
};

export default Title;
