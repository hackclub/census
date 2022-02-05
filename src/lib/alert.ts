import { useEffect, useState } from "react";

export default function useAlert(id: string): [boolean, () => void] {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const savedHidden = localStorage.getItem(`alertHidden:${id}`);

    if (savedHidden === "true") {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`alertHidden:${id}`, hidden ? "true" : "false");
  }, [id, hidden]);

  return [
    hidden,
    () => {
      setHidden(true);
    },
  ];
}
