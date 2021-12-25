export interface APIChannels {
  nameAPI: string,
  validSendChannel: SendChannels,
  validReceiveChannel: string[],
  validHandleChannel: SendChannels,
  validInvokeChannel: string[],
}

export interface SendChannels {
  [key: string]: Function
}