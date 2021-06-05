import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { FaScroll } from "react-icons/fa";

export default function SectionLayout({
  index,
  title,
  children,
  hasNext,
  hasPrevious,
}: PropsWithChildren<{
  index: number;
  title: string;
  hasPrevious?: boolean;
  hasNext?: boolean;
}>) {
  const router = useRouter();

  return (
    <Box>
      <Alert>
        <AlertIcon />
        <AlertTitle>Pro Tip</AlertTitle>
        <AlertDescription>
          You can safely close this page and come back; I have a good memory!
        </AlertDescription>
      </Alert>

      <Box
        w="80%"
        mx="auto"
        boxShadow="dark-lg"
        mt={5}
        p={5}
        bg="gray.700"
        borderRadius="lg"
      >
        <Heading fontSize={30} mb={5}>
          Section {index}{" "}
          <Text fontWeight="light" display="inline-block">
            - {title}
          </Text>
        </Heading>
        <Box>{children}</Box>
        <ButtonGroup mt={5}>
          <Button
            onClick={() =>
              router.push(hasPrevious ? `/section/${index - 1}` : "/")
            }
          >
            Back
          </Button>
          <Button
            disabled={!hasNext}
            onClick={() => router.push(`/section/${index + 1}`)}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
