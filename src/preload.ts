import { contextBridge, ipcRenderer } from "electron";
import database from "./main/IPC/database";
import IPC from "./main/IPC/general/icp";
import settings from "./main/IPC/settings";

const generateContextBridge = (apis: IPC[]): void => {
  let bridges = {};
  apis.forEach(({ channels: api }) => {
    bridges = {
      ...bridges,
      [api.nameAPI]: {
        send: (channel: string, message: any): void => {
          if (api.validSendChannel[channel]) {
            console.log(`[Log] Send channel active: ${channel}`, message);
            ipcRenderer.send(`${api.nameAPI}.${channel}`, message);
          } else {
            console.log(`[Error] Invalid send channel name: ${channel}`);
          }
        },
        receive: (channel: string, callback: Function): void => {
          if (api.validReceiveChannel.includes(channel)) {
            console.log(`[Log] Receive channel active: ${channel}`);
            ipcRenderer.on(`${api.nameAPI}.${channel}`, (_event, ...args) => callback(...args));
          } else {
            console.log(`[Error] Invalid receive channel name: ${channel}`);
          }
        },
        invoke: (channel: string, message: any): void => {
          if (api.validInvokeChannel.includes(channel)) {
            console.log(`[Log] Invoke channel active: ${channel}`, message);
            ipcRenderer.invoke(`${api.nameAPI}.${channel}`, message);
          } else {
            console.log(`[Error] Invalid invoke channel name: ${channel}`);
          }
        },
      }
    }
  });

  contextBridge.exposeInMainWorld('api', bridges);
};

generateContextBridge([settings, database]);
