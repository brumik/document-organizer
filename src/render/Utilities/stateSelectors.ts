import { RootState } from "../store";
import { Document, Project } from "../types";

const defaultDocument: Document = {
  slug: '',
  title: '',
  ext: '',
  projectSlug: '',
  description: '',
  tags: [],
  isArchived: false,
  isStarred: false,
  expirationDate: '',
};

const defaultProject: Project = {
  slug: '',
  title: '',
  description: '',
  isArchived: false,
  tags: [],
  isStarred: false,
  expirationDate: '',
};

export const documentsSelector = ({ 
  projectSlug,
  isArchived,
  isStarred,
}: {
  projectSlug?: string;
  isArchived?: boolean;
  isStarred?: boolean;
}) => (state: RootState) => {
  let documents = state.database.documents;

  if (projectSlug) {
    documents = documents.filter(doc => doc.projectSlug === projectSlug);
  }

  if (typeof isArchived !== "undefined") {
    documents = documents.filter(doc => !!doc.isArchived === isArchived);
  }

  if (typeof isStarred !== "undefined") {
    documents = documents.filter(doc => !!doc.isStarred === isStarred);
  }

  return documents;
};

export const documentSelector = (slug: string) => (state: RootState) => 
  state.database.documents.find(doc => doc.slug === slug)
  ?? defaultDocument;

export const projectsSelector = ({
  isArchived,
  isStarred,
}: {
  isArchived?: boolean;
  isStarred?: boolean;
}) => (state: RootState) => {
  let projects = state.database.projects;

  if (typeof isArchived !== "undefined") {
    projects = projects.filter(project => !!project.isArchived === isArchived);
  }

  if (typeof isStarred !== "undefined") {
    projects = projects.filter(project => !!project.isStarred === isStarred);
  }

  return projects;
};

export const projectSelector = (slug: string) => (state: RootState) => 
  state.database.projects.find(project => project.slug === slug)
  ?? defaultProject;
