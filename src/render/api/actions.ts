import { InvokePayloads as IP } from "../types";

export const reloadAll = (): void => {
  window.api.database.send('requestAll');
};

export const addNewProject = (args: IP.AddNewProject) => 
  window.api.database.invoke('addNewProject', args);

export const updateProject = (args: IP.UpdateProject) => 
  window.api.database.invoke('updateProject', args);

export const deleteProject = (args: IP.DeleteProject) => 
  window.api.database.invoke('deleteProject', args);

export const openProject = (args: IP.OpenProject) => 
  window.api.database.invoke('openProject', args);

export const selectDocumentToUpload = (args: IP.SelectDocumentToUpload) => 
  window.api.database.invoke('selectDocumentToUpload', args);

export const addNewDocument = (args: IP.AddNewDocument) => 
  window.api.database.invoke('addNewDocument', args);

export const updateDocument = (args: IP.UpdateDocument) => 
  window.api.database.invoke('updateDocument', args);

export const deleteDocument = (args: IP.DeleteDocument) => 
  window.api.database.invoke('deleteDocument', args);

export const openDocument = (args: IP.OpenDocument) => 
  window.api.database.invoke('openDocument', args);
  
export const exportDatabase = (args: IP.ExportDatabase) =>
  window.api.database.invoke('exportDatabase', args);

export const importDatabase = (args: IP.ImportDatabase) =>
  window.api.database.invoke('importDatabase', args);
