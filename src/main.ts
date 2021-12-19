import Store from './main/store';
import Main from './main/mainWindow';
import { app, ipcMain } from 'electron';
import settings from './main/IPC/settings';
import database from './main/IPC/database';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

global.userPrefStore = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 },
    rootFolder: '',
  }
});

global.projectStore = new Store({
  rootFolder: global.userPrefStore.get('rootFolder'),
  configName: 'main-database',
  defaults: {
    projects: {},
    documents: {},
  }
});

const main = new Main();

main.onEvent.on("window-created", () => {
  settings.initIpcMain(ipcMain, main.window);
  database.initIpcMain(ipcMain, main.window);
});