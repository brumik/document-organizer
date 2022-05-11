import electron, { Notification } from "electron";
import path from 'path';
import { Preferences } from "../../types";
import Store from "./store";

interface Props {
  configName: string;
}

class PreferencesStore extends Store<Preferences> {
  constructor({ configName }: Props) {
    super({
      configName,
      rootFolder: electron.app.getPath('userData'),
      defaults: {
        rootUserFolder: path.join(electron.app.getPath('userData'), 'user-database'),
        notificationEnabled: Notification.isSupported(),
        notificationSupported: Notification.isSupported(),
        windowBounds: {
          x: 0,
          y: 0,
          width: 800,
          height: 600
        },
      }
    });

    // Merge new default keys into the data if missing.
    this.updateData(Object.assign({}, this.defaults, this.data));
  }

  get rootUserFolder() {
    return this.data.rootUserFolder;
  }

  set rootUserFolder(value) {
    this.updateData({
      ...this.data,
      rootUserFolder: value
    });
  }

  get notificationEnabled() {
    return this.data.notificationEnabled;
  }

  set notificationEnabled(value: boolean) {
    this.updateData({
      ...this.data,
      notificationEnabled: value
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
