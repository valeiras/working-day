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

type SaveBlockModalContextType = {
  modalTimerCs: number;
  setModalTimerCs: Dispatch<SetStateAction<number>>;
  modalBlockId: number | null;
  setModalBlockId: Dispatch<SetStateAction<number | null>>;
  handleStopRef: MutableRefObject<() => void>;
  modalRef: MutableRefObject<HTMLDialogElement | null>;
} | null;

const SaveBlockModalContext = createContext<SaveBlockModalContextType>(null);

export const useSaveBlockModalContext = () => {
  return useContext<SaveBlockModalContextType>(SaveBlockModalContext);
};

export const SaveBlockModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [modalBlockId, setModalBlockId] = useState<number | null>(null);
  const [modalTimerCs, setModalTimerCs] = useState<number>(0);
  const handleStopRef = useRef<() => void>(() => {});
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <SaveBlockModalContext.Provider
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
    </SaveBlockModalContext.Provider>
  );
};
