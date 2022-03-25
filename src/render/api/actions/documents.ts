import { InvokePayloads as IP, Document } from "../../types";

export const selectDocumentToUpload = (args: IP.SelectDocumentToUpload) =>
  window.api.database.invoke('selectDocumentToUpload', args);

export const documentHealthCheck = (args: IP.DocumentHealthCheck) =>
  window.api.database.invoke('documentHealthCheck', args);

export const addNewDocument = (args: IP.AddNewDocument) =>
  window.api.database.invoke('addNewDocument', args);

export const updateDocument = (args: IP.UpdateDocument) =>
  window.api.database.invoke('updateDocument', args);

export const deleteDocument = (args: IP.DeleteDocument) =>
  window.api.database.invoke('deleteDocument', args);

export const archiveDocument = (args: IP.ArchiveDocument) =>
  window.api.database.invoke('archiveDocument', args);

export const openDocument = (args: IP.OpenDocument) =>
  window.api.database.invoke('openDocument', args);

export const showDocumentInFolder = (args: IP.ShowDocumentInFolder) =>
  window.api.database.invoke('showDocumentInFolder', args);

export const toggleDocumentStar = (args: { document: Document }) =>
  updateDocument({
    oldSlug: args.document.slug,
    document: {
      ...args.document,
      isStarred: !args.document.isStarred
    }
  });
