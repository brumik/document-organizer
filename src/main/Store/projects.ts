import { promises } from 'fs';
import path from 'path';
import BaseStore from "./restApiBase";
import { Project } from '../../types';

class ProjectStore extends BaseStore<Project> {
  public getPath(value: string | Project, archived?: boolean): string {
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

    return path.join(base, item.slug);
  };

  public async add({ slug, ...project }: Project): Promise<void> {
    if (this.exists(slug)) {
      return Promise.reject(`Project ${slug} already exists.`);
    }

    try {
      await promises.mkdir(this.getPath(slug));
      this.updateData([...this.data, { slug, ...project }]);

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async update(oldSlug: string, project: Project): Promise<void> {
    if (!this.exists(oldSlug)) {
      return Promise.reject(`Project ${oldSlug} (to update) does not exist.`);
    }
    if (this.exists(project.slug) && project.slug !== oldSlug) {
      return Promise.reject(`Project cannot be renamed. Slug ${project.slug} already exists.`);
    }

    try {
      await promises.rename(this.getPath(oldSlug), this.getPath(project.slug));
      this.updateData(
        this.data.map(p => p.slug === oldSlug ? { ...project } : p)
      );

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async remove(slug: string): Promise<void> {
    if (!this.exists(slug)) {
      return Promise.reject(`Cannot delete project: ${slug} does not exist.`);
    }

    try {
      await promises.rmdir(this.getPath(slug));
      this.updateData(this.data.filter(p => p.slug !== slug));

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async archive(slug: string, isArchived: boolean): Promise<void> {
    if (!this.exists(slug)) {
      return Promise.reject(`Cannot archive project: ${slug} does not exist.`);
    }

    this.ensureDirExists(this.getPath(slug, isArchived));

    try {
      await promises.rmdir(this.getPath(slug));
      this.updateData(this.data.map(p => p.slug === slug ? { ...p, isArchived } : p));

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async healthCheck(): Promise<void> {
    const missing = this.data.map(({ slug }) => 
      !this.existsOnDisk(slug) ? slug : undefined
    ).filter(p => p !== undefined);

    if (missing.length > 0) {
      return Promise.reject(`Projects missing: ${missing.join(', ')}`);
    }

    return Promise.resolve();
  }
}

export default ProjectStore;
