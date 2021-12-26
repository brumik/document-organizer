import Store from './main/Store/store';
import Main from './main/mainWindow';
import { app, ipcMain } from 'electron';
import settings from './main/IPC/settings';
import database from './main/IPC/database';
import ProjectStore from './main/Store/projects';
import DocumentStore from './main/Store/documents';
import PreferencesStore from './main/Store/preferences';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

global.preferencesStore = new PreferencesStore({
  configName: 'user-preferences',
});

global.projectStore = new ProjectStore({
  rootFolder: global.preferencesStore.rootFolder,
  configName: 'projects-db',
});

global.documentStore = new DocumentStore({
  rootFolder: global.preferencesStore.rootFolder,
  configName: 'documents-db',
});

const main = new Main();

main.onEvent.on("window-created", () => {
  settings.initIpcMain(ipcMain, main.window);
  database.initIpcMain(ipcMain, main.window);
});