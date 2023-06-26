import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

type LocalStorageData<T> = {
  setLocalStorageData: (data: T) => void;
  localStorageData: T | null;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): LocalStorageData<T & { currentStepIndex: number }> {
  const [localStorageData, setLocalStorageDataState] = useState<
    (T & { currentStepIndex: number }) | null
  >(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        return JSON.parse(storedData);
      }
    }
    return { ...initialValue, currentStepIndex: 0 };
  });

  const setLocalStorageData = debounce(
    (data: T & { currentStepIndex: number }) => {
      setLocalStorageDataState(data);
      localStorage.setItem(key, JSON.stringify(data));
      //   console.log("Data disimpan:", data);
    },
    500
  );

  useEffect(() => {
    return () => {
      setLocalStorageData.cancel();
    };
  }, [setLocalStorageData]);

  return { setLocalStorageData, localStorageData };
}
