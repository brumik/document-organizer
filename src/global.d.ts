import Store from "./main/store";

declare global {
  var userPrefStore: Store; 
  var projectStore: Store;
};
