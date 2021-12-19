declare module "*.png" {
  const value: any;
  export = value;
}

interface Window {
  api: {
    [key: string]: {
      send: (channel: string, message?: any) => void,
      receive: (channel: string, callback: (message: any) => void) => void,
    }
  }
}