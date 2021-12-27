import { Project } from "../types";

export const reloadAll = (): void => {
  window.api.database.send('requestAll');
};

export const addNewProject = (args: { project: Project }) => {
  return window.api.database.invoke('addNewProject', args);
};

export const updateProject = (args: { oldSlug: string, project: Project }) => {
  return window.api.database.invoke('updateProject', args);
};

