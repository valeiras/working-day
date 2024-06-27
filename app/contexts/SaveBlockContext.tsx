"use client";

import {
  createContext,
  useState,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
  RefObject,
} from "react";

type SaveBlockContextType = {
  modalTimerCs: number;
  setModalTimerCs: Dispatch<SetStateAction<number>>;
  modalBlockId: number | null;
  setModalBlockId: Dispatch<SetStateAction<number | null>>;
  handleStopRef: MutableRefObject<() => void>;
  modalRef: MutableRefObject<HTMLDialogElement | null>;
} | null;

const SaveBlockContext = createContext<SaveBlockContextType>(null);

export const useSaveBlockContext = () => {
  return useContext<SaveBlockContextType>(SaveBlockContext);
};

export const SaveBlockContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [modalBlockId, setModalBlockId] = useState<number | null>(null);
  const [modalTimerCs, setModalTimerCs] = useState<number>(0);
  const handleStopRef = useRef<() => void>(() => {});
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <SaveBlockContext.Provider
      value={{
        modalTimerCs,
        setModalTimerCs,
        modalBlockId,
        setModalBlockId,
        handleStopRef,
        modalRef,
      }}
    >
      {children}
    </SaveBlockContext.Provider>
  );
};
