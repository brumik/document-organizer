export default (title: string): string =>
  title.replace(/[^A-Za-z0-9_]/gi, '_')
    .toLowerCase()
    .replace(/_{2,}/g, '_');
