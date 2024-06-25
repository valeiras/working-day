import { ProjectWithWorkingTimes } from "../../db/queries";

export const mockProjects: ProjectWithWorkingTimes[] = [
  {
    activeBlock: null,
    id: 1,
    name: "Stopped project",
    workingBlocks: [
      { id: 343, createdAt: "2024-05-06T21:11:40.13+00:00", workingTimeSeconds: 20577 },
      { id: 355, createdAt: "2024-05-12T20:33:40.13+00:00", workingTimeSeconds: 3758 },
      { id: 365, createdAt: "2024-05-16T20:03:40.13+00:00", workingTimeSeconds: 18366 },
    ],
  },
  {
    name: "Paused project",
    id: 57,
    activeBlock: {
      id: 458,
      times: [{ id: 536, pauseTime: "2024-06-25T05:13:40.385+00:00", startTime: "2024-06-25T05:13:37.82728+00:00" }],
    },
    workingBlocks: [
      { id: 369, createdAt: "2024-05-17T22:15:40.13+00:00", workingTimeSeconds: 11963 },
      { id: 376, createdAt: "2024-05-20T22:14:40.13+00:00", workingTimeSeconds: 10535 },
      { id: 380, createdAt: "2024-05-21T22:51:40.13+00:00", workingTimeSeconds: 389 },
    ],
  },
  {
    name: "Running project",
    id: 32,
    activeBlock: { id: 457, times: [{ id: 535, pauseTime: null, startTime: "2024-06-25T05:03:39.337692+00:00" }] },
    workingBlocks: [
      { id: 349, createdAt: "2024-05-09T05:05:40.13+00:00", workingTimeSeconds: 28205 },
      { id: 351, createdAt: "2024-05-10T07:09:40.13+00:00", workingTimeSeconds: 10967 },
      { id: 352, createdAt: "2024-05-10T19:21:40.13+00:00", workingTimeSeconds: 6870 },
      { id: 358, createdAt: "2024-05-13T22:53:40.13+00:00", workingTimeSeconds: 27768 },
      { id: 363, createdAt: "2024-05-16T04:32:40.13+00:00", workingTimeSeconds: 1381 },
    ],
  },
];

export const mockUrl = "https://www.test-mws.com";
