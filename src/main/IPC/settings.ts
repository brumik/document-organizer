import { SendChannels } from "./general/channelsInterface";
import IPC from "./general/icp";
import namespacedSend from "./general/sendHelper";
import { BrowserWindow, dialog } from "electron";

const nameAPI = "settings";
const send = namespacedSend(nameAPI);

const requestAll = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: never) => {
  send(mainWindow, "getAll", global.preferencesStore.all);
}

const setRootFolder = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: string) => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Select a root folder',
    properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
  });

  if (rootPath) {
    global.preferencesStore.rootFolder = rootPath[0];
    global.projectStore.move(rootPath[0]);
    global.documentStore.move(rootPath[0]);
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
