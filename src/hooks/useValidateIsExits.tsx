import React, { useEffect, useState } from 'react';

interface UniqueProps {
  data: any[];
  values: string;
}

function useValidateIsExits({ data, values }: UniqueProps) {
  const [isError, setError] = useState(false);

  function validate() {
    if (!values) setError(false);
    const filterName = data.filter((item) => item.name.includes(values));
    if (filterName.length === 1) {
      return setError(filterName[0].name === values);
    }
    setError(false);
  }

  useEffect(() => {
    validate();
    console.log(isError);
  }, [data]);

  return { isError };
}

export default useValidateIsExits;
