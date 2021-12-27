import {
  Alert,
  AlertActionCloseButton,
  AlertGroup
} from '@patternfly/react-core';
import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../store';
import { removeNotification } from '../store/notifications';

const NotificationsPortal: FC<Record<string, never>> = () => {
  const notifications = useAppSelector(state => state.notifications);
  const dispatch = useAppDispatch();

  return (
    <AlertGroup isToast isLiveRegion aria-live="assertive">
      {notifications.map(({ title, description, variant, key, dismissable }) => (
        <Alert
          variant={variant}
          title={title}
          key={key}
          {...dismissable && {
            actionClose: <AlertActionCloseButton
              onClose={() => dispatch(removeNotification(key))}
            />
          }}
        >
          {description}
        </Alert>
      ))}
    </AlertGroup>
  );
};

export default NotificationsPortal;
