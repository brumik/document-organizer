import {
  SendChannels,
  InvokeFunction,
} from "./general/channelsInterface";
import IPC from "./general/icp";
import namespacedSend from "./general/sendHelper";
import { BrowserWindow, dialog, Notification } from "electron";
import { InvokePayloads as IP } from "../../types";

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
    global.preferencesStore.rootUserFolder = toDir;
  }

  send(mainWindow, "getAll", global.preferencesStore.all);
}

const setNotificationEnabled = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: { enabled: boolean }) => {
  if (Notification.isSupported()) {
    global.preferencesStore.notificationEnabled = message.enabled;
  } else {
    global.preferencesStore.notificationEnabled = false;
  }

  send(mainWindow, "getAll", global.preferencesStore.all);
}

const sendTestNotification = (_mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: string) => {
  if (global.preferencesStore.notificationEnabled && Notification.isSupported()) {
    const notification = new Notification({
      title: "Test Notification",
      body: "This is a test notification",
    });

    notification.show();
  }
}

const setNotificationBeforeDays = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: { value: number }) => {
  const numValue = +message.value;
  if (Number.isInteger(numValue)) {
    global.preferencesStore.notificationBeforeDays = numValue;
  }

  send(mainWindow, "getAll", global.preferencesStore.all);
}


// to Main
const validSendChannel: SendChannels = {
  requestAll,
  setRootFolder,
  setNotificationEnabled,
  sendTestNotification,
  setNotificationBeforeDays
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
