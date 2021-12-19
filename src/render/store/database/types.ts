import { Project, Document } from "../../types";

export interface State {
  projects: Record<string, Project>;
  documents: Record<string, Document>;
  meta?: {
    selectedPath?: string;
  }
}

export enum Action {
  setAll = 'DATABASE_setAll',
  sync = 'DATABASE_sync',
  addNewProject = 'DATABASE_addNewProject',
  updateProject = 'DATABASE_updateProject',
  deleteProject = 'DATABASE_deleteProject',
  openProject = 'DATABASE_openProject',
  addNewDocument = 'DATABASE_addNewDocument',
  updateDocument = 'DATABASE_updateDocument',
  deleteDocument = 'DATABASE_deleteDocument',
  selectDocumentToUpload = 'DATABASE_selectDocumentToUpload',
  selectDocumentToUploadResponse = 'DATABASE_selectDocumentToUploadResponse',
  exportDatabase = 'DATABASE_exportDatabase',
  importDatabase = 'DATABASE_importDatabase',
  openDocument = 'DATABASE_openDocument',
}

interface SetAll {
  type: Action.setAll;
  payload: State;
}

interface SyncAction {
  type: Action.sync;
  payload: State;
}

interface AddNewProjectAction {
  type: Action.addNewProject;
  payload: {
    slug: string;
    project: Project;
  };
}

interface UpdateProjectAction {
  type: Action.updateProject;
  payload: {
    oldSlug: string;
    newSlug: string;
    project: Project;
  };
}

interface DeleteProjectAction {
  type: Action.deleteProject;
  payload: { slug: string };
}

interface OpenProjectAction {
  type: Action.openProject;
  payload: { slug: string };
}

interface AddNewDocumentAction {
  type: Action.addNewDocument;
  payload: {
    path: string;
    slug: string;
    document: Document;
  };
}

interface UpdateDocumentAction {
  type: Action.updateDocument;
  payload: {
    oldSlug: string;
    newSlug: string;
    document: Document;
  };
}

interface DeleteDocumentAction {
  type: Action.deleteDocument;
  payload: { slug: string };
}

interface SelectDocumentToUploadAction {
  type: Action.selectDocumentToUpload;
  payload: undefined;
}

interface SelectDocumentToUploadResponseAction {
  type: Action.selectDocumentToUploadResponse;
  payload: string;
}

interface OpenDocumentAction {
  type: Action.openDocument;
  payload: { slug: string };
}

interface ExportDatabaseAction {
  type: Action.exportDatabase;
  payload: undefined;
};

interface ImportDatabaseAction {
  type: Action.importDatabase;
  payload: undefined;
}

export type ActionTypes =
  | SetAll
  | SyncAction
  | AddNewProjectAction
  | UpdateProjectAction
  | DeleteProjectAction
  | OpenProjectAction
  | AddNewDocumentAction
  | UpdateDocumentAction
  | DeleteDocumentAction
  | SelectDocumentToUploadAction
  | SelectDocumentToUploadResponseAction
  | ExportDatabaseAction
  | ImportDatabaseAction
  | OpenDocumentAction;
