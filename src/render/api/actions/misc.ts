import { InvokePayloads as IP } from "../../types";

export const reloadAll = (): void => {
  window.api.database.send('requestAll');
};

export const exportDatabase = (args: IP.ExportDatabase) =>
  window.api.database.invoke('exportDatabase', args);

export const importDatabase = (args: IP.ImportDatabase) =>
  window.api.database.invoke('importDatabase', args);
