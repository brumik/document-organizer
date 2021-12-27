import { useEffect } from 'react';
import { PromiseErrorFormat } from '../types';
import { addNotification, removeNotification } from "../store/notifications";
import { useAppDispatch } from '../store';
import { AlertVariant } from '@patternfly/react-core';

interface Props {
  api: {
    isLoading: boolean;
    isSuccess: boolean;
    error: PromiseErrorFormat | null;
  },
  key: string,
}

const useApiNotifications = (props: Props): void => {
  const dispatch = useAppDispatch();
  const loadingKey = `${props.key}-loading`;
  const errorKey = `${props.key}-error`;

  useEffect(() => {
    if (props.api.isLoading) {
      dispatch(addNotification({
        key: loadingKey,
        title: 'Loading...',
        dismissable: false,
        variant: AlertVariant.info
      }));
    } else {
      if (props.api.isSuccess) {
        dispatch(removeNotification(loadingKey));
      } else {
        dispatch(removeNotification(loadingKey));

        if (props.api.error) {
          dispatch(addNotification({
            key: errorKey,
            title: 'Error',
            description: props.api.error as string,
            variant: AlertVariant.danger
          }));
        }
      }
    }

  }, [props.api]);
};

export default useApiNotifications;
