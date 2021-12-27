export interface Project {
  slug: string;
  title: string;
  description: string;
}

export interface Document {
  slug: string;
  title: string;
  ext: string;
  projectSlug: string;
}

export interface DatabaseType {
  projects: Record<string, Project>;
  documents: Record<string, Document>;
}

export type PromiseErrorFormat = string;

export namespace InvokePayloads {
  export interface AddNewProject { project: Project };
  export interface UpdateProject { oldSlug: string; project: Project };
  export interface DeleteProject { slug: string };
  export interface OpenProject { slug: string };
  export type SelectDocumentToUpload = Record<string, never>;
  export interface AddNewDocument { originFile: string; document: Document };
  export interface UpdateDocument { oldSlug: string; document: Document };
  export interface DeleteDocument { slug: string };
  export interface OpenDocument { slug: string };
  export type ImportDatabase = Record<string, never>;
  export type ExportDatabase = Record<string, never>;
}
