"use client";

import { createContext, useState, useContext, Dispatch, SetStateAction, MutableRefObject } from "react";
import { getDateString, getThisFirstOfMonth } from "../lib/dateUtils";

type StatsContextType = {
  initialDate: Date;
  finalDate: Date;
  setInitialDate: Dispatch<SetStateAction<Date>>;
  setFinalDate: Dispatch<SetStateAction<Date>>;
} | null;

const StatsContext = createContext<StatsContextType>(null);

export const useStatsContext = () => {
  return useContext<StatsContextType>(StatsContext);
};

export const StatsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());

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
