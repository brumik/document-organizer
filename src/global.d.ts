import DocumentStore from "./main/Store/documents";
import PreferencesStore from "./main/Store/preferences";
import ProjectStore from "./main/Store/projects";
import Store from "./main/Store/store";

declare global {
  var preferencesStore: PreferencesStore; 
  var documentStore: DocumentStore;
  var projectStore: ProjectStore;
};
