import React from "react";
import Info from "./Info";

const infoText =
  "Please, use this app to limit the amount of hours you spend working. Work less. Live happier. Tax the rich.";

const Title: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center mt-6 mb-4 md:my-8">
      <h1 className="text-4xl min-[420px]:text-5xl md:text-6xl font-bold px-8">Working Day</h1>
      <p className="text-base min-[420px]:text-lg md:text-xl font-light px-8 w-3/4">
        A time tracker app to manage your work hours <Info text={infoText} />
      </p>
    </div>
  );
};

export default Title;
