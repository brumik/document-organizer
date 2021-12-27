import { HandleChannelReturn, SendChannels } from "./general/channelsInterface";
import IPC from "./general/icp";
import { BrowserWindow, dialog, shell } from "electron";
import namespacedSend from "./general/sendHelper";
import fs from 'fs';
import path from 'path';

// Import types
import { InvokePayloads as IP } from "../../types";

type InvokeFunction<T> = (mainWindow: BrowserWindow, event: Electron.IpcMainInvokeEvent, message: T) => Promise<HandleChannelReturn>;

const copyDirectory = (source: string, destination: string) => {
  fs.mkdirSync(destination, { recursive: true });

  fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
    let sourcePath = path.join(source, entry.name);
    let destinationPath = path.join(destination, entry.name);

    entry.isDirectory()
      ? copyDirectory(sourcePath, destinationPath)
      : fs.copyFileSync(sourcePath, destinationPath);
  });
}

const promiseResolver = async (fnc: Promise<void>): Promise<HandleChannelReturn> => {
  try {
    await fnc;
    return {
      error: false,
      payload: undefined
    };
  } catch (error) {
    return {
      error: true,
      payload: error as string
    }
  }
}

const nameAPI = "database";
const send = namespacedSend(nameAPI);

const getAll = (mainWindow: BrowserWindow) => {
  send(mainWindow, "getAll", {
    projects: global.projectStore.all,
    documents: global.documentStore.all
  });
};

const requestAll = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: Record<string, never>) => {
  getAll(mainWindow);
}

const addNewProject: InvokeFunction<IP.AddNewProject> = (_mainWindow, _event, message) => {
  return promiseResolver(global.projectStore.add(message.project));
}

const updateProject: InvokeFunction<IP.UpdateProject> = (_mainWindow, _event, message) => {
  return promiseResolver(
    global.projectStore.update(message.oldSlug, message.project)
  );
};

const deleteProject: InvokeFunction<IP.DeleteProject> = (_mainWindow, _event, message) => {
  return promiseResolver(global.projectStore.remove(message.slug));
};

const openProject: InvokeFunction<IP.OpenProject> = async (_mainWindow, _event, message) => {
  const errorStr = await shell.openPath(global.projectStore.getPath(message.slug))
  if (errorStr)
    return Promise.resolve({
      error: true,
      payload: errorStr
    });
  else
    return Promise.resolve({
      error: false,
      payload: undefined
    });
}

const selectDocumentToUpload: InvokeFunction<IP.SelectDocumentToUpload> = async (mainWindow, _event, _message) => {
  try {
    const rootPath = dialog.showOpenDialogSync(mainWindow, {
      title: 'Select a document',
      properties: ['openFile'],
    });

    if (rootPath && rootPath.length > 0)
      return {
        error: false,
        payload: rootPath[0]
      }
    else
      return {
        error: true,
        payload: 'File select cancelled.'
      }
  } catch (e) {
    return {
      error: true,
      payload: e as string
    }
  }
}

const addNewDocument: InvokeFunction<IP.AddNewDocument> = (_mainWindow, _event, message) => {
  return promiseResolver(
    global.documentStore.add(message.document, message.originFile)
  );
}

const updateDocument: InvokeFunction<IP.UpdateDocument> = (_mainWindow, _event, message) => {
  return promiseResolver(
    global.documentStore.update(message.oldSlug, message.document)
  );
}

const deleteDocument: InvokeFunction<IP.DeleteDocument> = (_mainWindow, _event, message) => {
  return promiseResolver(
    global.documentStore.remove(message.slug)
  );
}

const openDocument: InvokeFunction<IP.OpenDocument> = async (_mainWindow, _event, message) => {
  const errorStr = await shell.openPath(global.documentStore.getPath(message.slug));
  if (errorStr)
    return Promise.resolve({
      error: true,
      payload: errorStr
    });
  else
    return Promise.resolve({
      error: false,
      payload: undefined
    });
};

const exportDatabase: InvokeFunction<IP.ExportDatabase> = (mainWindow, _event, _message) => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Export database',
    defaultPath: global.preferencesStore.rootFolder,
    properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
  });

  if (rootPath) {
    try {
      copyDirectory(global.preferencesStore.rootFolder, rootPath[0]);
      return Promise.resolve({
        error: false,
        payload: undefined
      })
    } catch(e){
      return Promise.resolve({
        error: true,
        payload: e as string
      });
    }
  } else {
    return Promise.resolve({
      error: true,
      payload: 'Export cancelled.'
    });
  }
};

const importDatabase: InvokeFunction<IP.ImportDatabase> = (mainWindow, _event, _message): Promise<HandleChannelReturn> => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Import database',
    properties: ['openDirectory'],
  });

  if (rootPath) {
    try {
      fs.rmdirSync(global.preferencesStore.rootFolder, { recursive: true });
      copyDirectory(rootPath[0], global.preferencesStore.rootFolder);

      global.projectStore.reloadFromDisk();
      getAll(mainWindow);
      
      return Promise.resolve({
        error: false,
        payload: undefined
      })
    } catch (e) {
      return Promise.resolve({
        error: true,
        payload: e as string
      });
    }
  } else {
    return Promise.resolve({
      error: true,
      payload: 'Export cancelled.'
    });
  }
};

const database = new IPC({
  nameAPI,
  validSendChannel: {
    requestAll
  },
  validReceiveChannel: [
    "getAll",
  ],
  validHandleChannel: {
    addNewProject,
    updateProject,
    deleteProject,
    openProject,
    selectDocumentToUpload,
    addNewDocument,
    updateDocument,
    deleteDocument,
    openDocument,
    exportDatabase,
    importDatabase,
  },
});

export default database;
