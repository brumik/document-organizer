export interface Project {
  title: string;
  description: string;
}

export interface Document {
  title: string;
  ext: string;
  projectSlug: string;
}

export interface DatabaseType {
  projects: Record<string, Project>;
  documents: Record<string, Document>;
}
