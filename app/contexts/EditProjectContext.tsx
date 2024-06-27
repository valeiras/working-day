"use client";

import { createContext, useState, useContext, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";

type EditProjectContextType = {
  projectId: number;
  setProjectId: Dispatch<SetStateAction<number>>;
  editModalRef: MutableRefObject<HTMLDialogElement | null>;
  deleteModalRef: MutableRefObject<HTMLDialogElement | null>;
} | null;

const EditProjectContext = createContext<EditProjectContextType>(null);

export const useEditProjectContext = () => {
  return useContext<EditProjectContextType>(EditProjectContext);
};

export const EditProjectContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [projectId, setProjectId] = useState<number>(0);
  const editModalRef = useRef<HTMLDialogElement>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  return (
    <EditProjectContext.Provider
      value={{
        projectId,
        setProjectId,
        editModalRef,
        deleteModalRef,
      }}
    >
      {children}
    </EditProjectContext.Provider>
  );
};
