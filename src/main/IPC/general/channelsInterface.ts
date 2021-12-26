import { BrowserWindow } from "electron";

type HandleChannelFunction = (
  mainWindow: BrowserWindow,
  event: Electron.IpcMainInvokeEvent,
  message: any,
) => Promise<void>;

export interface HandleChannels {
  [channel: string]: HandleChannelFunction;
}

export interface APIChannels {
  nameAPI: string,
  validSendChannel: SendChannels,
  validReceiveChannel: string[],
  validHandleChannel: HandleChannels,
}

export interface SendChannels {
  [key: string]: Function
}