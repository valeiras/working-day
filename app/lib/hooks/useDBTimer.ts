import { addPauseTime, addStartTime, createNewBlock, setActiveBlock } from "../actions";
import { ProjectWithWorkingTimes } from "../db/queries";
import { useQueryClient } from "@tanstack/react-query";

export const useDBTimer = () => {
  const queryClient = useQueryClient();

  const handleDBStart = async (project: ProjectWithWorkingTimes, invalidateQueries: boolean = true) => {
    let blockId: number | undefined = project.activeBlock?.id;

    if (!blockId) {
      if (!project.id) return console.error("No project id");
      const { data, error } = await createNewBlock({ projectId: project.id });
      if (error || !data) return console.error(error);
      blockId = data.id;
      await setActiveBlock({ projectId: project.id, blockId });
    }

    const { data, error } = await addStartTime({ blockId });
    if (error || !data) return console.error(error);
    if (invalidateQueries) queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const handleDBPause = async (startTimeId: number, invalidateQueries: boolean = true) => {
    await addPauseTime({ startTimeId });
    if (invalidateQueries) queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const handleDBStop = async (projectId: number, invalidateQueries: boolean = true) => {
    await setActiveBlock({ projectId, blockId: null });
    if (invalidateQueries) queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  return { handleDBStart, handleDBPause, handleDBStop };
};
