import { BrowserWindow, IpcMain, IpcRenderer } from "electron";
import { APIChannels, HandleChannels, SendChannels } from "./channelsInterface";

export default class IPC {
  protected nameAPI: string = "api";
  protected validSendChannel: SendChannels = {};
  protected validReceiveChannel: string[] = [];
  protected validHandleChannel: HandleChannels = {};
  protected validInvokeChannel: string[] = [];

  constructor(channels: APIChannels) {
    this.nameAPI = channels.nameAPI;
    this.validSendChannel = channels.validSendChannel;
    this.validReceiveChannel = channels.validReceiveChannel;
    this.validHandleChannel = channels.validHandleChannel;
  }

  get name() {
    return this.nameAPI;
  }

  initIpcMain(ipcMain: IpcMain, mainWindow: BrowserWindow) {
    if (mainWindow) {
      Object.keys(this.validSendChannel).forEach(key => {
        ipcMain.on(`${this.nameAPI}.${key}`, async (event, message) =>
          this.validSendChannel[key](mainWindow, event, message)
        );
      });
      Object.keys(this.validHandleChannel).forEach(key => {
        ipcMain.handle(`${this.nameAPI}.${key}`, async (event, message) =>
          this.validHandleChannel[key](mainWindow, event, message)
        );
      });
    }
  }

  initBridge(ipcRenderer: IpcRenderer) {
    return {
      send: (channel: string, message: any): void => {
        if (this.validSendChannel[channel]) {
          console.info(`Send channel active: ${channel}`, message);
          ipcRenderer.send(`${this.nameAPI}.${channel}`, message);
        } else {
          console.error(`Invalid send channel name: ${channel}`);
        }
      },
      receive: (channel: string, callback: Function): void => {
        if (this.validReceiveChannel.includes(channel)) {
          console.info(`Receive channel active: ${channel}`);
          ipcRenderer.on(`${this.nameAPI}.${channel}`, (_event, ...args) => callback(...args));
        } else {
          console.error(`Invalid receive channel name: ${channel}`);
        }
      },
      invoke: (channel: string, message: any): Promise<void> => {
        if (Object.keys(this.validHandleChannel).includes(channel)) {
          console.info(`Invoke channel active: ${channel}`, message);
          return ipcRenderer.invoke(`${this.nameAPI}.${channel}`, message)
            .then(data => {
              if (data.error) {
                return Promise.reject(data.payload);
              } else {
                return Promise.resolve(data.payload);
              }
            });
        } else {
          console.error(`Invalid invoke channel name: ${channel}`);
          return Promise.reject(`Invalid invoke channel name: ${channel}`);
        }
      },
    }
  }
}
