import path from 'path';
import { promises } from 'fs';
import BaseStore from "./restApiBase";
import { Document } from '../../types';

class DocumentStore extends BaseStore<Document> {
  public getPath(value: string | Document): string {
    const item = typeof value === 'string'
      ? this.getItem(value)
      : value;

    if (!item) {
      throw new Error(`The item ${value} does not exists to get the path for.`);
    }

    return path.join(
      this.basePath,
      item.projectSlug,
      item.slug + '.' + item.ext
    );
  }

  public async add(document: Document, originFile: string): Promise<void> {
    if (this.exists(document.slug)) {
      return Promise.reject(`Document ${document.slug} already exists.`);
    }

    try {
      await promises.copyFile(originFile, this.getPath(document));
      this.updateData([...this.data, document]);

      return;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async update(oldSlug: string, document: Document): Promise<void> {
    if (!this.exists(oldSlug)) {
      return Promise.reject(`Document ${oldSlug} (to update) does not exist.`);
    }
    if (this.exists(document.slug) && document.slug !== oldSlug) {
      return Promise.reject(`Document cannot be renamed. Slug ${document.slug} already exists.`);
    }

    try {
      await promises.rename(this.getPath(oldSlug), this.getPath(document));
      this.updateData(
        this.data.map(p => p.slug === oldSlug ? { ...document } : p)
      );

      return;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async remove(slug: string): Promise<void> {
    if (!this.exists(slug)) {
      return Promise.reject(`Cannot delete document: ${slug} does not exist.`);
    }

    try {
      await promises.unlink(this.getPath(slug));
      this.updateData(this.data.filter(p => p.slug !== slug));

      return;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default DocumentStore;
