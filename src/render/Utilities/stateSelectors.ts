import { RootState } from "../store";

export const documentsSelector = ({ 
  projectSlug,
  isArchived,
}: {
  projectSlug?: string,
  isArchived?: boolean,
}) => (state: RootState) => {
  let documents = state.database.documents;

  if (projectSlug) {
    documents = documents.filter(doc => doc.projectSlug === projectSlug);
  }

  if (typeof isArchived !== "undefined") {
    documents = documents.filter(doc => !!doc.isArchived === isArchived);
  }

  return documents;
};

export const documentSelector = (slug: string) => (state: RootState) => {
  return state.database.documents.find(doc => doc.slug === slug);
};

export const projectsSelector = ({
  isArchived,
}: {
  isArchived?: boolean,
}) => (state: RootState) => {
  if (typeof isArchived !== "undefined") {
    return state.database.projects.filter(project => !!project.isArchived === isArchived);
  }

  return state.database.projects;
};

export const projectSelector = (slug: string) => (state: RootState) => {
  return state.database.projects.find(project => project.slug === slug);
};
