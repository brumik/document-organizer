import { BrowserWindow } from "electron";

const namespacedSend = (namespace: string) => (mainWindow: BrowserWindow, channel: string, message: any) => {
  mainWindow.webContents.send(`${namespace}.${channel}`, message);
}

export default namespacedSend;
