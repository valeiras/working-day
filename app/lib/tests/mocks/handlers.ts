// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { mockProjects, mockUrl } from "./mockData";

export const handlers = [
  http.get(`/api/v1/projects`, () => {
    return HttpResponse.json({ data: mockProjects });
  }),
  http.get(mockUrl, () => {
    return HttpResponse.json({ msg: "ok" });
  }),
];
