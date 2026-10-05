import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
  const [Value, setValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch (error) {
      console.error("خطا در خواندن اطلاعات:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(Value));
    } catch (error) {
      console.error("خطا در ذخیره اطلاعات:", error);
    }
  }, [key, Value]);

  return [Value, setValue];
};
