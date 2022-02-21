import { RootState } from "../store";
import { FilterStatus } from "../store/filter/types";
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
  status,
  tags = [],
  search = '',
  projectSlug = undefined,
}: {
  status: FilterStatus;
  tags?: string[];
  search?: string;
  projectSlug?: string;
}) => (state: RootState) => {
  let documents = state.database.documents;

  if (projectSlug) {
    documents = documents.filter(document => document.projectSlug === projectSlug);
  }

  if (status === FilterStatus.archived) {
    documents = documents.filter(document => document.isArchived);
  } else if (status === FilterStatus.active) {
    documents = documents.filter(document => !document.isArchived);
  } else if (status === FilterStatus.starred) {
    documents = documents.filter(document => document.isStarred);
  }

  if (tags.length > 0) {
    documents = documents.filter(document =>
      tags.some(tag => document.tags.includes(tag))
    );
  }

  if (search.length > 0) {
    documents = documents.filter(document =>
      document.title.toLowerCase().includes(search.toLowerCase())
      || document.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  return documents;
};

export const documentSelector = (slug: string) => (state: RootState) => 
  state.database.documents.find(doc => doc.slug === slug)
  ?? defaultDocument;

export const projectsSelector = ({
  status,
  tags = [],
  search = '',
}: {
  status: FilterStatus;
  tags?: string[];
  search?: string;
}) => (state: RootState) => {
  let projects = state.database.projects;

  if (status === FilterStatus.archived) {
    projects = projects.filter(project => project.isArchived);
  } else if (status === FilterStatus.active) {
    projects = projects.filter(project => !project.isArchived);
  } else if (status === FilterStatus.starred) {
    projects = projects.filter(project => project.isStarred);
  }

  if (tags.length > 0) {
    projects = projects.filter(project => 
      tags.some(tag => project.tags.includes(tag))
    );
  }

  if (search.length > 0) {
    projects = projects.filter(project =>
      project.title.toLowerCase().includes(search.toLowerCase())
      || project.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  return projects;
};

export const projectSelector = (slug: string) => (state: RootState) => 
  state.database.projects.find(project => project.slug === slug)
  ?? defaultProject;

export const tagsSelector = (type: 'proj' | 'doc' | undefined = undefined) => (state: RootState) => {
  const tags = new Set<string>();

  if (type !== 'proj') {
    state.database.documents.forEach(doc => {
      doc.tags.forEach(tag => tags.add(tag));
    });
  }

  if (type !== 'doc') {
    state.database.projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
  }

  return [...tags];
}
