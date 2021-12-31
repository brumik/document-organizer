import { promises } from 'fs';
import path from 'path';
import BaseStore from "./restApiBase";
import { Project } from '../../types';

class ProjectStore extends BaseStore<Project> {
  public getPath(value: string | Project): string {
    if (typeof value === 'string') {
      return path.join(this.basePath, value);
    } else {
      return path.join(this.basePath, value.slug);
    }
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
