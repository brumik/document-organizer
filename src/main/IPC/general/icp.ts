import { BrowserWindow, IpcMain } from "electron";
import { APIChannels, SendChannels } from "./channelsInterface";

export default class IPC {
  private nameAPI: string = "api";
  private validSendChannel: SendChannels = {};
  private validReceiveChannel: string[] = [];

  constructor(channels: APIChannels) {
    this.nameAPI = channels.nameAPI;
    this.validSendChannel = channels.validSendChannel;
    this.validReceiveChannel = channels.validReceiveChannel;
  }

  get channels(): APIChannels {
    return {
      nameAPI: this.nameAPI,
      validSendChannel: this.validSendChannel,
      validReceiveChannel: this.validReceiveChannel
    }
  }

  initIpcMain(ipcMain: IpcMain, mainWindow: BrowserWindow) {
    if (mainWindow) {
      Object.keys(this.validSendChannel).forEach(key => {
        ipcMain.on(`${this.nameAPI}.${key}`, async (event, message) => {
          this.validSendChannel[key](mainWindow, event, message);
        });
      });
    }
  }
}
