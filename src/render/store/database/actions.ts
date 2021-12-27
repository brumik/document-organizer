import { Project, Document } from '../../types';
import {
  Action,
  ActionTypes,
  State
} from './types';

export const sync = (state: State): ActionTypes => ({
  type: Action.sync,
  payload: state
});

export const deleteProject = (slug: string): ActionTypes => ({
  type: Action.deleteProject,
  payload: { slug }
});

export const openProject = (slug: string): ActionTypes => ({
  type: Action.openProject,
  payload: { slug }
});

export const addNewDocument = (document: Document, originFile: string): ActionTypes => ({
  type: Action.addNewDocument,
  payload: { document, originFile }
});

export const updateDocument = (oldSlug: string, document: Document): ActionTypes => ({
  type: Action.updateDocument,
  payload: { oldSlug, document }
});

export const deleteDocument = (slug: string): ActionTypes => ({
  type: Action.deleteDocument,
  payload: { slug }
});

export const selectDocumentToUpload = (): ActionTypes => ({
  type: Action.selectDocumentToUpload,
  payload: undefined
});

export const selectDocumentToUploadResponse = (selectedPath: string): ActionTypes => ({
  type: Action.selectDocumentToUploadResponse,
  payload: selectedPath
});

export const openDocument = (slug: string): ActionTypes => ({
  type: Action.openDocument,
  payload: { slug }
})

export const exportDatabase = (): ActionTypes => ({
  type: Action.exportDatabase,
  payload: undefined
});

export const importDatabase = (): ActionTypes => ({
  type: Action.importDatabase,
  payload: undefined
});
