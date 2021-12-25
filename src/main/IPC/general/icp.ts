import { BrowserWindow, IpcMain } from "electron";
import { APIChannels, SendChannels } from "./channelsInterface";

export default class IPC {
  private nameAPI: string = "api";
  private validSendChannel: SendChannels = {};
  private validReceiveChannel: string[] = [];
  private validHandleChannel: SendChannels = {};
  private validInvokeChannel: string[] = [];

  constructor(channels: APIChannels) {
    this.nameAPI = channels.nameAPI;
    this.validSendChannel = channels.validSendChannel;
    this.validReceiveChannel = channels.validReceiveChannel;
    this.validHandleChannel = channels.validHandleChannel;
    this.validInvokeChannel = channels.validInvokeChannel;
  }

  get channels(): APIChannels {
    return {
      nameAPI: this.nameAPI,
      validSendChannel: this.validSendChannel,
      validReceiveChannel: this.validReceiveChannel,
      validHandleChannel: this.validHandleChannel,
      validInvokeChannel: this.validInvokeChannel,
    }
  }

  initIpcMain(ipcMain: IpcMain, mainWindow: BrowserWindow) {
    if (mainWindow) {
      Object.keys(this.validSendChannel).forEach(key => {
        ipcMain.on(`${this.nameAPI}.${key}`, async (event, message) => {
          this.validSendChannel[key](mainWindow, event, message);
        });
      });
      Object.keys(this.validHandleChannel).forEach(key => {
        ipcMain.handle(`${this.nameAPI}.${key}`, async (event, message) => {
          this.validHandleChannel[key](mainWindow, event, message);
        });
      });
    }
  }
}
