"use client";

import { useEffect, useState } from "react";

type Props = {
  data: string | number | string[];
};
type returnType = {
  isError: boolean;
};
const useValidation = ({ data }: Props): returnType => {
  const [isError, setError] = useState<boolean>(false);
  function validate() {
    if (data === "" || !data) {
      return setError(true);
    }
    return setError(false);
  }

  useEffect(() => {
    validate();
  }, [data]);

  return { isError };
};

export default useValidation;
