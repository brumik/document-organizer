import { InvokePayloads as IP, Project } from "../../types";

export const projectHealthCheck = (args: IP.ProjectHealthCheck) =>
  window.api.database.invoke('projectHealthCheck', args);

export const addNewProject = (args: IP.AddNewProject) =>
  window.api.database.invoke('addNewProject', args);

export const updateProject = (args: IP.UpdateProject) =>
  window.api.database.invoke('updateProject', args);

export const deleteProject = (args: IP.DeleteProject) =>
  window.api.database.invoke('deleteProject', args);

export const archiveProject = (args: IP.ArchiveProject) =>
  window.api.database.invoke('archiveProject', args);

export const openProject = (args: IP.OpenProject) =>
  window.api.database.invoke('openProject', args);

export const toggleProjectStar = (args: { project: Project }) =>
  updateProject({
    oldSlug: args.project.slug,
    project: {
      ...args.project,
      isStarred: !args.project.isStarred
    }
  });
