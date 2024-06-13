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
    <div className="flex flex-col bg-base-300 rounded-lg pt-6 pb-4 px-8 text-sm w-full max-w-[420px] m-auto ">
      <div className="flex flex-row justify-between items-center font-bold text-base">
        <div>{project.name}</div>
        <div>
          <EditButtons />
        </div>
      </div>
      <hr className="mb-3 mt-1 h-px border-0 bg-secondary" />
      <div className="grid grid-cols-3 gap-1">
        <div className="justify-self-start">
          <TimerWrapper title="Total time:">
            <TotalTime id={project.id} totalTimersCs={localTimerArray.totalTimersCs} isFetching={isFetching} />
          </TimerWrapper>
        </div>
        <div className="justify-self-end">
          <TimerWrapper title="Current time:">
            <CurrentTime id={project.id} currentTimersCs={localTimerArray.currentTimersCs} isFetching={isFetching} />
          </TimerWrapper>
        </div>
        <div className="flex items-end justify-self-end py-1">
          <Controls id={project.id} project={project} isFetching={isFetching} localTimerArray={localTimerArray} />
        </div>
      </div>
    </div>
  );
};

const TimerWrapper: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  return (
    <>
      <div className="text-secondary font-semibold">{title}</div>
      <div className="bg-base-100 p-1 mt-1 flex justify-center rounded shadow-md w-24">
        <p className="w-14 text-left">{children}</p>
      </div>
    </>
  );
};
export default ProjectCard;
