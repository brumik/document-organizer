import { BrowserWindow } from "electron";
import { PromiseErrorFormat } from "../../../types";

export type HandleChannelReturn = {
  error: true;
  payload: PromiseErrorFormat;
} | {
  error: false;
  payload: undefined | string;
}

type HandleChannelFunction = (
  mainWindow: BrowserWindow,
  event: Electron.IpcMainInvokeEvent,
  message: any,
) => Promise<HandleChannelReturn>;

type SendChannelFunction = (
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any,
) => void;

export interface HandleChannels {
  [channel: string]: HandleChannelFunction;
}

export interface SendChannels {
  [key: string]: SendChannelFunction;
}

export interface APIChannels {
  nameAPI: string,
  validSendChannel: SendChannels,
  validReceiveChannel: string[],
  validHandleChannel: HandleChannels,
}
