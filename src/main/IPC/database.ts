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
  send(mainWindow, "getAll", global.projectStore.all);
};

const requestAll = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: never) => {
  getAll(mainWindow);
}

const setAll = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: Record<string, any>) => {
  global.projectStore.all = message;
  getAll(mainWindow);
}

interface AddNewProject { slug: string, project: Project };
const addNewProject = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: AddNewProject) => {
  fs.mkdir(path.join(global.userPrefStore.get('rootFolder'), message.slug), (err) => {
    if (err)
      throw err;

    global.projectStore.all = {
      ...global.projectStore.all,
      projects: {
        ...global.projectStore.all.projects,
        [message.slug]: message.project
      }
    };
    
    getAll(mainWindow);
  });
}

interface UpdateProject { oldSlug: string, newSlug: string, project: Project };
const updateProject = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: UpdateProject) => {
  const oldPath = path.join(global.userPrefStore.get('rootFolder'), message.oldSlug);
  const newPath = path.join(global.userPrefStore.get('rootFolder'), message.newSlug);

  fs.rename(oldPath, newPath, err => {
    if (err)
      throw err;

    const tempStore = {
      ...global.projectStore.all,
      projects: {
        ...global.projectStore.all.projects,
        [message.newSlug]: message.project
      }
    };

    delete tempStore.projects[message.oldSlug];

    global.projectStore.all = tempStore;
    getAll(mainWindow);
  })
};

interface DeleteProject { slug: string };
const deleteProject = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: DeleteProject) => {
  const delPath = path.join(global.userPrefStore.get('rootFolder'), message.slug);
  fs.rmdir(delPath, err => {
    if (err)
      throw err;

    const tempStore = {
      ...global.projectStore.all,
    };

    delete tempStore.projects[message.slug];

    global.projectStore.all = tempStore;
    getAll(mainWindow);
  })
};

interface OpenProject { slug: string };
const openProject = (_mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: OpenProject) => {
  const projectPath = path.join(global.userPrefStore.get('rootFolder'), message.slug);
  shell.openPath(projectPath);
}

const selectDocumentToUpload = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: string) => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Select a document',
    properties: ['openFile'],
  });

  send(mainWindow, "selectDocumentToUploadResponse", rootPath ? rootPath[0] : '');
}

interface AddNewDocument { path: string, slug: string, document: Document };
const addNewDocument = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: AddNewDocument) => {
  const destPath = path.join(
    global.userPrefStore.get('rootFolder'),
    message.document.projectSlug,
    message.slug + '.' + message.document.ext);

  fs.copyFile(message.path, destPath, err => {
    if (err)
      throw err;

    global.projectStore.all = {
      ...global.projectStore.all,
      documents: {
        ...global.projectStore.all.documents,
        [message.slug]: message.document
      }
    };

    getAll(mainWindow);
  });
}

interface UpdateDocument { oldSlug: string, newSlug: string, document: Document };
const updateDocument = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: UpdateDocument) => {
  const oldDocument = global.projectStore.all.documents[message.oldSlug] as Document;
  const oldPath = path.join(
    global.userPrefStore.get('rootFolder'),
    oldDocument.projectSlug,
    message.oldSlug + '.' + oldDocument.ext);

  // When updating the document the ext (file) canno change, but 
  // the ext can get '' so use the old one.
  const newPath = path.join(
    global.userPrefStore.get('rootFolder'),
    message.document.projectSlug,
    message.newSlug + '.' + oldDocument.ext);

  fs.rename(oldPath, newPath, err => {
    if (err)
      throw err;

    const tempStore = {
      ...global.projectStore.all,
      documents: {
        ...global.projectStore.all.documents,
        [message.newSlug]: message.document
      }
    };

    delete tempStore.documents[message.oldSlug];

    global.projectStore.all = tempStore;
    getAll(mainWindow);
  });
}

interface DeleteDocument { slug: string };
const deleteDocument = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: DeleteDocument) => {
  const document = global.projectStore.all.documents[message.slug] as Document;
  const delPath = path.join(
    global.userPrefStore.get('rootFolder'),
    document.projectSlug,
    message.slug + '.' + document.ext
  );
  
  fs.unlink(delPath, err => {
    if (err)
      throw err;

    const tempStore = {
      ...global.projectStore.all,
    };

    delete tempStore.documents[message.slug];

    global.projectStore.all = tempStore;
    getAll(mainWindow);
  });
}

interface OpenDocument { slug: string };
const openDocument = (_mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, message: OpenDocument) => {
  const document = global.projectStore.all.documents[message.slug] as Document;
  const filePath = path.join(
    global.userPrefStore.get('rootFolder'),
    document.projectSlug,
    message.slug + '.' + document.ext
  );

  shell.openPath(filePath).then(errorStr => {
    if (errorStr)
      throw errorStr;
  });
};

const exportDatabase = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: string) => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Export database',
    defaultPath: global.userPrefStore.get('rootFolder'),
    properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
  });

  if (rootPath) {
    copyDirectory(global.userPrefStore.get('rootFolder'), rootPath[0]);
  }
};

const importDatabase = (mainWindow: BrowserWindow, _event: Electron.IpcMainEvent, _message: string) => {
  const rootPath = dialog.showOpenDialogSync(mainWindow, {
    title: 'Import database',
    properties: ['openDirectory'],
  });

  if (rootPath) {
    fs.rmdirSync(global.userPrefStore.get('rootFolder'), { recursive: true });
    copyDirectory(rootPath[0], global.userPrefStore.get('rootFolder'));
  }

  global.projectStore.reloadFromDisk();
  getAll(mainWindow);
};

// to Main
const validSendChannel: SendChannels = {
  requestAll,
  setAll,
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
  validReceiveChannel
});

export default database;
