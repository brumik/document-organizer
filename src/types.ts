export interface Project {
  slug: string;
  title: string;
  description: string;
  isArchived: boolean;
  tags: string[];
  isStarred: boolean;
  expirationDate: string;
}

export interface Document {
  slug: string;
  title: string;
  ext: string;
  projectSlug: string;
  description: string;
  isArchived: boolean;
  tags: string[];
  isStarred: boolean;
  expirationDate: string;
}

export interface DatabaseType {
  projects: Record<string, Project>;
  documents: Record<string, Document>;
}

export interface Preferences {
  rootUserFolder: string;
  notificationEnabled: boolean;
  notificationSupported: boolean;
  windowBounds: Electron.Rectangle
}

export type PromiseErrorFormat = string;

export namespace InvokePayloads {
  export type ProjectHealthCheck = Record<string, never>;
  export interface AddNewProject { project: Project };
  export interface UpdateProject { oldSlug: string; project: Project };
  export interface DeleteProject { slug: string };
  export interface ArchiveProject { slug: string; isArchived: boolean };
  export interface OpenProject { slug: string };
  export type SelectDocumentToUpload = Record<string, never>;
  export type DocumentHealthCheck = Record<string, never>;
  export interface AddNewDocument { originFile: string; document: Document };
  export interface UpdateDocument { oldSlug: string; document: Document };
  export interface DeleteDocument { slug: string };
  export interface ArchiveDocument { slug: string, isArchived: boolean };
  export interface OpenDocument { slug: string };
  export interface ShowDocumentInFolder { slug: string };
  export type ImportDatabase = Record<string, never>;
  export type ExportDatabase = Record<string, never>;
  export type SetNotificationEnabled = { enabled: boolean};
  export type SendTestNotification = Record<string, never>;
}
