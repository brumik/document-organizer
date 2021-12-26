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
