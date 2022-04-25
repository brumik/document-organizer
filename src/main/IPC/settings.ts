import { SendChannels } from "./general/channelsInterface";
import IPC from "./general/icp";
import namespacedSend from "./general/sendHelper";
import { BrowserWindow, dialog } from "electron";

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
    const toDir = rootPath[0];
    global.projectStore.setPath(toDir);
    global.documentStore.setPath(toDir);
    global.preferencesStore.rootFolder = toDir;
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
