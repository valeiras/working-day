// import { create } from "zustand";

// type ProjectsState = {
//   handleLocalStart: (projectId: number) => void;
//   // handleConnectedStart: (timerCs: number, projectId: number) => void;
//   // handleLocalPause: (projectId: number) => void;
//   // handleLocalStop: (projectId: number) => void;
//   localTimersCs: Record<number, number>;
//   initialTimesMs: Record<number, number>;
//   // setLocalTimersCs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
//   // totalTimersCs: Record<number, number>;
//   // setTotalTimersCs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
//   // setInitialTimesMs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
//   // setTotalInitialTimesMs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
//   isRunning: Record<number, boolean>;
//   isActive: Record<number, boolean>;
//   // setIsRunning: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
//   intervalId: NodeJS.Timeout | null;
//   // createInterval: (props: { currInitialTimes: Record<number, number>; currIsRunning: Record<number, boolean> }) => void;
// };

// const useProjectsStore = create<ProjectsState>()((set) => ({
//   isRunning: {},
//   isActive: {},
//   localTimersCs: {},
//   initialTimesMs: {},
//   intervalId: null,
//   handleLocalStart: (projectId) =>
//     set((state) => {
//       if (state.isRunning[projectId]) return state;
//       const currTimer = state.localTimersCs[projectId] || 0;
//       const currInitialTimeMs = Date.now() - currTimer * 10;
//       if (state.intervalId) clearInterval(state.intervalId);

//       return {
//         isRunning: { ...state.isRunning, [projectId]: true },
//         isActive: { ...state.isActive, [projectId]: true },
//         localTimersCs: { ...state.localTimersCs, [projectId]: currTimer },
//         initialTimesMs: { ...state.initialTimesMs, [projectId]: currInitialTimeMs },
//         intervalId: createInterval({ initialTimes: state.initialTimesMs, isRunning: state.isRunning }),
//       };
//     }),
// }));

// const createInterval = ({
//   currInitialTimes,
//   currIsRunning,
// }: {
//   currInitialTimes: Record<number, number>;
//   currIsRunning: Record<number, boolean>;
// }) => {
//   const newLocalTimersCs = { ...localTimersCs };

//   Object.entries(currInitialTimes).forEach(([id, time]) => {
//     if (currIsRunning[parseInt(id)]) {
//       newLocalTimersCs[parseInt(id)] = (Date.now() - time) / 10;
//     }
//   });
//   return setInterval(() => {
//     setLocalTimersCs(newLocalTimersCs);
//   }, 10);
// };
