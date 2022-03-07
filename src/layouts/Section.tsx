import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { CloseButton } from "@chakra-ui/react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { FaArrowRight } from "react-icons/fa";
import useAlert from "../lib/alert";

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
  const [alertHidden, hideAlert] = useAlert("memory");

  return (
    <Box>
      {!alertHidden && (
        <Alert position="sticky" top={0} bg="blue.800">
          <AlertIcon />
          <AlertTitle>Little tip</AlertTitle>
          <AlertDescription>
            You can safely close this page and come back; I have a good memory!
          </AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => hideAlert()}
          />
        </Alert>
      )}

      <Box
        w="80%"
        maxW="3xl"
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
            <Link href="/submit" passHref>
              <Button as="a" colorScheme="blue" rightIcon={<FaArrowRight />}>
                Review your answers
              </Button>
            </Link>
          )}
        </ButtonGroup>
      </Box>
    </Box>
  );
}
