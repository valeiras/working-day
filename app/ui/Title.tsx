import React from "react";
import Info from "./Info";

const infoText =
  "Please, use this app to limit the amount of hours you spend working. Work less. Live happier. Tax the rich.";

const Title: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center mt-6 mb-4 md:my-8 w-full sm:w-3/4 px-1 sm:px-8">
      <h1 className="text-4xl min-[460px]:text-5xl md:text-6xl font-bold max-w-56 min-[460px]:max-w-none">
        Working Day
      </h1>
      <p className="text-base min-[460px]:text-lg md:text-xl font-light max-w-48 min-[460px]:max-w-72">
        A time tracker app to manage your work hours <Info text={infoText} />
      </p>
    </div>
  );
};

export default Title;
