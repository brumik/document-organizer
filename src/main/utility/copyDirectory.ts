import fs from 'fs';
import path from 'path';

const copyDirectory = (source: string, destination: string) => {
  try {
    fs.mkdirSync(destination, { recursive: true });

    fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
      let sourcePath = path.join(source, entry.name);
      let destinationPath = path.join(destination, entry.name);

      entry.isDirectory()
        ? copyDirectory(sourcePath, destinationPath)
        : fs.copyFileSync(sourcePath, destinationPath);
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Recursive copy of the directory "${source}" failed.`);
  }
}

export default copyDirectory;
