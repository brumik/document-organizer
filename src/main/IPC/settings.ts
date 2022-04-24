import { SendChannels } from "./general/channelsInterface";
import IPC from "./general/icp";
import namespacedSend from "./general/sendHelper";
import { BrowserWindow, dialog } from "electron";
import copyDirectory from "./copyDirectory";
import fs from "fs";

const nameAPI = "settings";
const send = namespacedSend(nameAPI);

const requestAll = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: Record<string, never>) => {
  send(mainWindow, "getAll", global.preferencesStore.all);
}

const setRootFolder = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: string) => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Select a root folder',
    properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
  });

  if (rootPath && rootPath?.length > 0) {
    const fromDir = global.preferencesStore.rootFolder;
    const toDir = rootPath[0];

    try {
      // Move the dbs
      global.projectStore.move(toDir);
      global.documentStore.move(toDir);

      // Move the files (copy and delete)
      copyDirectory(fromDir, toDir);
      fs.rmSync(fromDir, { recursive: true });

      // Set in the settings the new root folder
      global.preferencesStore.rootFolder = toDir;
    } catch (error) {
      console.error(error);
      dialog.showErrorBox(
        'Error while moving the root folder.',
        'An error occured while moving the files, more details in the console.'
      );
    }
  }

  send(mainWindow, "getAll", global.preferencesStore.all);
}

// to Main
const validSendChannel: SendChannels = {
  requestAll,
  setRootFolder
};

// from Main
const validReceiveChannel: string[] = [
  "getAll",
];

const settings = new IPC({
  nameAPI,
  validSendChannel,
  validReceiveChannel,
  validHandleChannel: {},
});

export default settings;
