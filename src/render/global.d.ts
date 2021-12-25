declare module "*.png" {
  const value: any;
  export = value;
}

interface Channels {
  send: (channel: string, message?: any) => void,
  receive: (channel: string, callback: (message: any) => void) => void,
  invoke: (channel: string, message?: any) => Promise<any>,
}

interface Window {
  api: {
    database: Channels,
    settings: Channels,
  }
}