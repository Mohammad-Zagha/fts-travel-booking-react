import { useEffect, useState } from "react";

type UseParamsValuesProps<T> = {
  paramKey: string;
  defaultValue?: T;
};

function useParamsValues<T = string>({
  paramKey,
  defaultValue,
}: UseParamsValuesProps<T>) {
  const getCurrentValue = () => {
    const params = new URLSearchParams(window.location.search);
    return (params.get(paramKey) as T) || defaultValue || ("" as T);
  };

  const [value, setValue] = useState<T>(getCurrentValue);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(paramKey, value as string);
    } else {
      params.delete(paramKey);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [value, paramKey]);

  return { value, setValue };
}

export default useParamsValues;
