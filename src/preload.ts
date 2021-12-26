import { contextBridge, ipcRenderer } from "electron";
import database from "./main/IPC/database";
import IPC from "./main/IPC/general/icp";
import settings from "./main/IPC/settings";

const generateContextBridge = (apis: IPC[]): void => {
  let bridges = {};
  apis.forEach((api) => {
    bridges = {
      ...bridges,
      [api.name]: api.initBridge(ipcRenderer),
    }
  });

  contextBridge.exposeInMainWorld('api', bridges);
};

generateContextBridge([settings, database]);
