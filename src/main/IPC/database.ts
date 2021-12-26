import { SendChannels } from "./general/channelsInterface";
import IPC from "./general/icp";
import { BrowserWindow, dialog, shell } from "electron";
import namespacedSend from "./general/sendHelper";
import fs from 'fs';
import path from 'path';

// Import types
import { Project, Document } from '../../types';

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

const nameAPI = "database";
const send = namespacedSend(nameAPI);

const getAll = (mainWindow: BrowserWindow) => {
  send(mainWindow, "getAll", {
    projects: global.projectStore.all,
    documents: global.documentStore.all
  });
};

const requestAll = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: never) => {
  getAll(mainWindow);
}

interface AddNewProject { project: Project };
const addNewProject = async (mainWindow: BrowserWindow, _event: Electron.IpcMainInvokeEvent, message: AddNewProject) => {
  await global.projectStore.add(message.project);
  getAll(mainWindow);
}

interface UpdateProject { oldSlug: string, project: Project };
const updateProject = async (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: UpdateProject) => {
  await global.projectStore.update(message.oldSlug, message.project);
  getAll(mainWindow);
};

interface DeleteProject { slug: string };
const deleteProject = async (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: DeleteProject) => {
  await global.projectStore.remove(message.slug);
  getAll(mainWindow);
};

interface OpenProject { slug: string };
const openProject = (_mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: OpenProject) => {
  shell.openPath(global.projectStore.getPath(message.slug))
    .then(errorStr => {
      if (errorStr)
        throw errorStr;
    });
}

const selectDocumentToUpload = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: string) => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Select a document',
    properties: ['openFile'],
  });

  send(mainWindow, "selectDocumentToUploadResponse", rootPath ? rootPath[0] : '');
}

interface AddNewDocument { originFile: string, document: Document };
const addNewDocument = async (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: AddNewDocument) => {
  await global.documentStore.add(message.document, message.originFile);
  getAll(mainWindow);
}

interface UpdateDocument { oldSlug: string, document: Document };
const updateDocument = async (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: UpdateDocument) => {
  await global.documentStore.update(message.oldSlug, message.document);
  getAll(mainWindow);
}

interface DeleteDocument { slug: string };
const deleteDocument = async (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: DeleteDocument) => {
  await global.documentStore.remove(message.slug);
  getAll(mainWindow);
}

interface OpenDocument { slug: string };
const openDocument = (_mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: OpenDocument) => {
  shell.openPath(global.documentStore.getPath(message.slug))
    .then(errorStr => {
      if (errorStr)
        throw errorStr;
    });
};

const exportDatabase = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: string) => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Export database',
    defaultPath: global.preferencesStore.rootFolder,
    properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
  });

  if (rootPath) {
    copyDirectory(global.preferencesStore.rootFolder, rootPath[0]);
  }
};

const importDatabase = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: string) => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Import database',
    properties: ['openDirectory'],
  });

  if (rootPath) {
    fs.rmdirSync(global.preferencesStore.rootFolder, { recursive: true });
    copyDirectory(rootPath[0], global.preferencesStore.rootFolder);
  }

  global.projectStore.reloadFromDisk();
  getAll(mainWindow);
};

// to Main
const validSendChannel: SendChannels = {
  requestAll,
  addNewProject,
  updateProject,
  deleteProject,
  openProject,
  selectDocumentToUpload,
  addNewDocument,
  updateDocument,
  deleteDocument,
  exportDatabase,
  importDatabase,
  openDocument
};

// from Main
const validReceiveChannel: string[] = [
  "getAll",
  "selectDocumentToUploadResponse",
];

const database = new IPC({
  nameAPI,
  validSendChannel,
  validReceiveChannel,
  validHandleChannel: {},
});

export default database;
