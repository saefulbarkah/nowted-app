import { useEffect, useState } from 'react';
import useFolderState from './useFolderState';

interface validation {
  value: string | null;
  field?: string;
}

function useValidation({ value, field }: validation) {
  const { isError, setIsError } = useFolderState();
  const [response, setResponse] = useState<{
    message: string;
  }>({
    message: '',
  });

  const validation = () => {
    if (value === '') {
      setResponse({ message: `${field} is required` });
      setIsError(true);
      return;
    }
    setIsError(false);
  };

  useEffect(() => {
    validation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return { response, isError };
}

export default useValidation;
