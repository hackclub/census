import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { FaSlack } from "react-icons/fa";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box textAlign="center">
        <Alert flexDirection="column" status="info" mb={5} px={10}>
          <AlertTitle>Welcome to the Hack Club Census!</AlertTitle>
          <AlertDescription>
            To get started, please connect your Slack account.
          </AlertDescription>
        </Alert>

        <Link href="/section/1" passHref>
          <Button variant="solid" colorScheme="blue" as="a">
            <FaSlack style={{ marginRight: "10px" }} />
            Sign In With Slack
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
