import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import React from "react";
import EditButtons from "./EditButtons";
import CurrentTime from "./CurrentTime";
import { LocalTimerArray } from "@/app/lib/hooks/useLocalTimerArray";
import TotalTime from "./TotalTime";
import Controls from "./Controls";

type Props = { project: ProjectWithWorkingTimes; localTimerArray: LocalTimerArray; isFetching: boolean };

const ProjectCard: React.FC<Props> = ({ project, localTimerArray, isFetching }) => {
  return (
    <div className="flex flex-col bg-base-300 rounded-lg p-6 pb-4 text-sm w-full max-w-[420px] m-auto ">
      <div className="flex flex-row justify-between items-center font-bold text-base">
        <div>{project.name}</div>
        <div>
          <EditButtons />
        </div>
      </div>
      <hr className="mb-3 mt-1 h-px border-0 bg-secondary" />
      <div className="grid grid-cold-1 grid-cols-2 gap-1">
        <div className="justify-self-start">
          <TimerWrapper title="Total time:">
            <TotalTime id={project.id} totalTimersCs={localTimerArray.totalTimersCs} isFetching={isFetching} />
          </TimerWrapper>
        </div>
        <div className="justify-self-end flex flex-col items-end">
          <TimerWrapper title="Current time:">
            <CurrentTime id={project.id} currentTimersCs={localTimerArray.currentTimersCs} isFetching={isFetching} />
          </TimerWrapper>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Controls
          id={project.id}
          project={project}
          isFetching={isFetching}
          localTimerArray={localTimerArray}
          className="text-xl"
        />
      </div>
    </div>
  );
};

const TimerWrapper: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  return (
    <>
      <div className="text-secondary font-semibold w-full text-center">{title}</div>
      <div className="bg-base-100 p-1 mt-1 flex justify-center rounded shadow-md w-24">
        <p className="w-14 text-left">{children}</p>
      </div>
    </>
  );
};
export default ProjectCard;
