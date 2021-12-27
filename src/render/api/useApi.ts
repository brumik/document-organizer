import { useEffect, useRef, useState } from 'react';
import { reloadAll } from '.';
import { PromiseErrorFormat } from '../types';

const useIsMounted = (): React.RefObject<unknown> => {
  const isMounted = useRef<unknown>({});
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });
  return isMounted;
};

interface UseRequestVariables<T> {
  result: T;
  error: PromiseErrorFormat | null;
  isLoading: boolean;
  isSuccess: boolean;
}

interface UseRequestReturn<A, T> extends UseRequestVariables<T> {
  request: (arg: A) => Promise<void>;
  setValue: (value: T) => void;
}

const useApi = <A, T>(
  makeRequest: (arg: A) => Promise<T>,
  initialValue: T,
  reload = true
): UseRequestReturn<A, T> => {
  const [variables, setVariables] = useState<UseRequestVariables<T>>({
    result: initialValue,
    error: null,
    isLoading: false,
    isSuccess: false,
  });
  const isMounted = useIsMounted();

  return {
    ...variables,
    request: async (arg: A) => {
      setVariables({
        ...variables,
        isSuccess: false,
        isLoading: true,
      });
      try {
        const response = await makeRequest(arg);

        if (isMounted.current) {
          setVariables({
            isLoading: false,
            result: response ?? initialValue,
            error: null,
            isSuccess: true,
          });
        }

        if (reload)
          reloadAll();

      } catch (error: unknown) {
        if (isMounted.current) {
          setVariables({
            isSuccess: false,
            isLoading: false,
            error: error as string,
            result: initialValue,
          });
        }
      }
    },
    setValue: (value: T) => setVariables({ ...variables, result: value }),
  };
};

export default useApi;
