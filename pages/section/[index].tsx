import React from "react";
import { useRouter } from "next/router";
import sections from "../../sections";
import { Alert, AlertIcon } from "@chakra-ui/alert";

export default function Section() {
  const router = useRouter();
  const { index } = router.query;

  const CurrentSection = sections[index as string];

  if (!CurrentSection) {
    return (
      <Alert status="error">
        <AlertIcon /> Section not found.
      </Alert>
    );
  }

  return <CurrentSection />;
}
