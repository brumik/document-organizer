import electron from 'electron';
import path from 'path';
import fs from 'fs';

const parseDataFile = (filePath: string, defaults: Record<string, any>) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error('No acces to file', filePath, error);
    return defaults;
  }
}

class Store {
  protected path: string;
  protected data: Record<string, any>;
  protected configName: string;

  constructor(params: {
    rootFolder?: string,
    configName: string,
    defaults: Record<string, any>
  }) {
    this.configName = params.configName + '.json';
    const userDataPath = params.rootFolder ?? electron.app.getPath('userData');
    this.path = path.join(userDataPath, this.configName);
    this.data = parseDataFile(this.path, params.defaults);
  }

  protected updateData(data: Record<string, any>) {
    this.data = data;
    fs.writeFileSync(this.path, JSON.stringify(this.data), 'utf8');
  }

  protected movePath(newPath: string) {
    this.path = newPath;
    this.data = parseDataFile(this.path, this.data);
  }

  public move(to: string) {
    const newPath = path.join(to, this.configName + '.json');
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

  reloadFromDisk() {
    this.data = parseDataFile(this.path, this.data);
  }

  get(key: string) {
    return this.data[key];
  }

  // TODO Delete
  get all() {
    return this.data;
  };

  // TODO Delete
  set all(data: Record<string, any>) {
    this.updateData(data);
  }

  set(key: string, val: any) {
    this.updateData({
      ...this.data,
      [key]: val
    })
  }
}

export default Store;
