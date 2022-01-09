import Store from "./store";
import fs from "fs";
import { join } from "path";

interface Props {
  rootFolder?: string;
  configName: string;
}

interface Database {
  slug: string;
}

class RestApiBase<T extends Database> extends Store<T[]> {
  protected archivePath = join(this.basePath, 'archive'); 

  constructor(params: Props) {
    super({
      ...params,
      defaults: []
    });
  }

  public getPath(_v: string | T, _archive = false): string {
    throw new Error('Method not implemented.');
  }

  public getItem(slug: string): T | undefined {
    return this.data.find(item => item.slug === slug);
  }

  protected existsOnDisk(slug: string, archived = false): boolean {
    return fs.existsSync(this.getPath(slug, archived));
  }

  protected ensureDirExists(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

  public exists(slug: string) {
    return this.getItem(slug) !== undefined;
  }

  public async add(_item: T, _path?: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async update(_oldSlug: string, _item: T): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async remove(_slug: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
};

export default RestApiBase;
