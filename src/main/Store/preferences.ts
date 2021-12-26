import electron from "electron";
import Store from "./store";

interface Props {
  configName: string;
}

interface Database {
  rootFolder: string;
  windowBounds: Electron.Rectangle
}

class PreferencesStore extends Store<Database> {
  constructor({ configName }: Props) {
    super({
      configName,
      rootFolder: electron.app.getPath('userData'),
      defaults: {
        rootFolder: electron.app.getPath('userData'),
        windowBounds: {
          x: 0,
          y: 0,
          width: 800,
          height: 600
        },
      }
    });
  }

  get rootFolder() {
    return this.data.rootFolder;
  }

  set rootFolder(value) {
    this.updateData({
      ...this.data,
      rootFolder: value
    });
  }

  get windowBounds() {
    return this.data.windowBounds;
  }

  set windowBounds(value) {
    this.updateData({
      ...this.data,
      windowBounds: value
    });
  }
};

export default PreferencesStore;
