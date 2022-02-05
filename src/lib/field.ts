import { FormEvent, useEffect, useState } from "react";

export default function useField<T>(
  name: string,
  defaultValue: T = null
): [T, (e: T | FormEvent) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem(`field:${name}`)) || defaultValue);
  }, [name, defaultValue]);

  useEffect(() => {
    localStorage.setItem(`field:${name}`, JSON.stringify(value));
  }, [value, name]);

  return [
    value,
    (e) => {
      if ((e as FormEvent).target) {
        setValue(
          ((e as FormEvent).target as HTMLInputElement).value as unknown as T
        );
      } else {
        setValue(e as T);
      }
    },
  ];
}
