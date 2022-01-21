import { app, BrowserWindow } from 'electron';
import EventEmitter from 'events';

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

class Main {
  public onEvent: EventEmitter = new EventEmitter();
  public window!: BrowserWindow;

  constructor() {
    app.on('ready', () => {
      this.window = this.createWindow();
      this.onEvent.emit("window-created");
    });
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
  }

  createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      ...global.preferencesStore.windowBounds,
      webPreferences: {
        contextIsolation: true, // protect against prototype pollution
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, // use a preload script 
      }
    });

    mainWindow.on('resize', () => {
      global.preferencesStore.windowBounds = mainWindow.getBounds();
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    return mainWindow;
  };

  onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  onActivate() {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow();
    }
  }

};

export default Main;
