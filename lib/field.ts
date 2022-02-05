import { FormEvent, useEffect, useState } from "react";

export default function useField(
  name: string
): [string, (e: FormEvent | string) => void] {
  const initialState =
    typeof window === "undefined"
      ? ""
      : localStorage.getItem(`field:${name}`) || "";

  const [value, setValue] = useState(initialState);

  useEffect(() => {
    localStorage.setItem(`field:${name}`, value);
  }, [value, name]);

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
