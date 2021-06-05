import { FormEvent, useEffect, useState } from "react";

export default function useField(
  name: string
): [string, (e: FormEvent | string) => void] {
  const [value, setValue] = useState(
    localStorage.getItem(`field:${name}`) || ""
  );

  useEffect(() => {
    localStorage.setItem(`field:${name}`, value);
  }, [value]);

  return [
    value,
    (e) => {
      if (typeof e == "string") {
        setValue(e);
      } else {
        setValue((e.target as HTMLInputElement).value);
      }
    },
  ];
}
