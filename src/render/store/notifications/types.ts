import { AlertVariant } from "@patternfly/react-core";

export interface Notification {
  key: string;
  title: string;
  description: string;
  variant: AlertVariant;
  dismissable: boolean;
}

export type State = Notification[];

export enum Action {
  addNotification = "addNotification",
  removeNotification = "removeNotification",
}

interface AddNotificationAction {
  type: Action.addNotification;
  payload: Notification;
}

interface RemoveNotificationAction {
  type: Action.removeNotification;
  payload: string;
}

export type ActionTypes =
  | AddNotificationAction
  | RemoveNotificationAction;
