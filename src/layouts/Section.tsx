import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

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
  return (
    <Box>
      <Alert>
        <AlertIcon />
        <AlertTitle>Little tip</AlertTitle>
        <AlertDescription>
          You can safely close this page and come back; I have a good memory!
        </AlertDescription>
      </Alert>

      <Box
        w="80%"
        mx="auto"
        boxShadow="dark-lg"
        my={5}
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
          <Link href={hasPrevious ? `/section/${index - 1}` : "/"} passHref>
            <Button as="a">Back</Button>
          </Link>
          {hasNext ? (
            <Link href={`/section/${index + 1}`} passHref>
              <Button as="a">Next</Button>
            </Link>
          ) : (
            <Button disabled>Next</Button>
          )}
        </ButtonGroup>
      </Box>
    </Box>
  );
}
