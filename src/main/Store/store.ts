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

  constructor(params: {
    rootFolder?: string,
    configName: string,
    defaults: T
  }) {
    this.configName = params.configName + '.json';
    this.basePath = params.rootFolder ?? electron.app.getPath('userData');
    this.path = path.join(this.basePath, this.configName);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath, { recursive: true });
    }

    this.data = parseDataFile(this.path, params.defaults);
  }

  protected updateData(data: T) {
    this.data = data;
    fs.writeFileSync(this.path, JSON.stringify(this.data), 'utf8');
  }

  protected movePath(newPath: string) {
    this.path = newPath;
    this.data = parseDataFile(this.path, this.data);
  }

  public move(to: string) {
    const newPath = path.join(to, this.configName);
    fs.promises.access(this.path).then(() => {
      fs.promises.rename(this.path, newPath).then(() => {
        this.movePath(newPath);
      }).catch(e => {
        console.error('No access to the new path.', e);
      });
    }).catch(e => {
      console.error('No access to the old path.', e);
    })
  }

  public reloadFromDisk() {
    this.data = parseDataFile(this.path, this.data);
  }

  public get all() {
    return this.data;
  };
}

export default Store;
