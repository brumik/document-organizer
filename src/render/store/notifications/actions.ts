import { AlertVariant } from '@patternfly/react-core';
import {
  Action,
  ActionTypes,
  Notification,
} from './types';

export const addNotification = ({
  key = Date.now().toString(),
  title = 'Notification',
  description = '',
  variant = AlertVariant.info,
  dismissable = true,
}): ActionTypes => ({
  type: Action.addNotification,
  payload: {
    key,
    title,
    description,
    variant,
    dismissable,
  }
});

export const removeNotification = (key: string): ActionTypes => ({
  type: Action.removeNotification,
  payload: key,
});
