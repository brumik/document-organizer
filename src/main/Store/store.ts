import electron from 'electron';
import path from 'path';
import fs from 'fs';

const parseDataFile = <T>(filePath: string, defaults: T): T => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaults), 'utf8');
    return defaults;
  } else {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
};

class Store<T> {
  protected path: string;
  protected data: T;
  protected configName: string;
  protected basePath: string;
  protected defaults: T;

  constructor(params: {
    rootFolder?: string,
    configName: string,
    defaults: T
  }) {
    this.configName = params.configName + '.json';
    this.basePath = params.rootFolder ?? electron.app.getPath('userData');
    this.path = path.join(this.basePath, this.configName);
    this.defaults = params.defaults;

    // Create the directory if it doesn't exist
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath, { recursive: true });
    }

    this.data = parseDataFile(this.path, this.defaults);
  }

  protected updateData(data: T) {
    this.data = data;
    fs.writeFileSync(this.path, JSON.stringify(this.data), 'utf8');
  }

  public setPath(to: string) {
    const newPath = path.join(to, this.configName);
    this.path = newPath;
    this.data = parseDataFile(this.path, this.defaults);
  }

  public reloadFromDisk() {
    this.data = parseDataFile(this.path, this.defaults);
  }

  public get all() {
    return this.data;
  };
}

export default Store;
