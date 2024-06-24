"use client";

import { createContext, useState, useContext, Dispatch, SetStateAction, MutableRefObject } from "react";
import { getDateString, getThisFirstOfMonth } from "../lib/dateUtils";

type StatsContextType = {
  initialDate: string;
  finalDate: string;
  setInitialDate: Dispatch<SetStateAction<string>>;
  setFinalDate: Dispatch<SetStateAction<string>>;
} | null;

const StatsContext = createContext<StatsContextType>(null);

export const useStatsContext = () => {
  return useContext<StatsContextType>(StatsContext);
};

export const StatsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  return (
    <StatsContext.Provider
      value={{
        initialDate,
        setInitialDate,
        finalDate,
        setFinalDate,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};
