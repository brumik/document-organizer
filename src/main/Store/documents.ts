import path from 'path';
import { promises } from 'fs';
import BaseStore from "./restApiBase";
import { Document } from '../../types';

class DocumentStore extends BaseStore<Document> {
  public getPath(value: string | Document, archived?: boolean): string {
    const item = typeof value === 'string'
      ? this.getItem(value)
      : value;

    if (!item) {
      throw new Error(`The item ${value} does not exists to get the path for.`);
    }

    let base = this.basePath;
    if (typeof archived !== 'undefined' && archived) {
      base = this.archivePath;
    } else if (typeof archived === 'undefined' && item.isArchived) {
      base = this.archivePath;
    }

    return path.join(
      base,
      item.projectSlug,
      item.slug + '.' + item.ext
    );
  }

  public async add(document: Document, originFile: string): Promise<void> {
    if (this.exists(document.slug)) {
      return Promise.reject(`Document ${document.slug} already exists.`);
    }

    if (!document.projectSlug) {
      return Promise.reject('The project field cannot be left empty.\
        Maybe create a "No Project" to store documents without any projects.');
    }

    try {
      await promises.copyFile(originFile, this.getPath(document));
      this.updateData([...this.data, document]);

      return Promise.resolve();
    } catch (e) {
      console.error(e);
      return Promise.reject(`Creating document ${document.slug} failed.`);
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

      return Promise.resolve();
    } catch (e) {
      console.error(e);
      return Promise.reject(`Updating document ${oldSlug} failed.`);
    }
  }

  public async remove(slug: string): Promise<void> {
    if (!this.exists(slug)) {
      return Promise.reject(`Cannot delete document: ${slug} does not exist.`);
    }

    try {
      await promises.rm(this.getPath(slug), { force: true });
      this.updateData(this.data.filter(p => p.slug !== slug));

      return Promise.resolve();
    } catch (e) {
      console.error(e);
      return Promise.reject(`Deleting document ${slug} failed.`);
    }
  }

  public async archive(slug: string, isArchived: boolean): Promise<void> {
    const document = this.getItem(slug);
    if (!document) {
      return Promise.reject(`Cannot archive document: ${slug} does not exist.`);
    }

    const futurePath = isArchived ? this.archivePath : this.basePath;
    const p = path.join(futurePath, document.projectSlug);
    try {
      this.ensureDirExists(p);
    } catch (e) {
      console.error(e);
      return Promise.reject(`Was not able to ensure that that the directory "${p}" exists.`);
    }

    try {
      await promises.rename(this.getPath(slug), this.getPath(slug, isArchived));
      this.updateData(
        this.data.map(p => p.slug === slug ? { ...p, isArchived } : p)
      );

      return Promise.resolve();
    } catch (e) {
      console.error(e);
      return Promise.reject(`Archiving document ${slug} failed.`);
    }
  }

  public async healthCheck(): Promise<void> {
    const missing = this.data.map(({ slug }) =>
      !this.existsOnDisk(slug) ? slug : undefined
    ).filter(p => p !== undefined);

    if (missing.length > 0) {
      return Promise.reject(`Documents missing: ${missing.join(', ')}`);
    }

    return Promise.resolve();
  }
}

export default DocumentStore;
