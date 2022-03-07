import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { FaArrowRight, FaSlack } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import auth, { User } from "../lib/auth";

type Props = {
  user?: User;
};

export default function Home({ user }: Props) {
  if (user) {
    return (
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box textAlign="center">
          <Alert flexDirection="column" status="info" mb={5} px={10}>
            <AlertTitle>Welcome to the Hack Club Census!</AlertTitle>
            <AlertDescription>
              You're logged in as {user.userName}.
            </AlertDescription>
          </Alert>

          <ButtonGroup spacing={4}>
            <Link href="/logout" passHref>
              <Button as="a">Sign out</Button>
            </Link>
            <Link href="/section/1" passHref>
              <Button
                rightIcon={<FaArrowRight />}
                variant="solid"
                colorScheme="blue"
                as="a"
              >
                Start
              </Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box textAlign="center">
          <Alert flexDirection="column" status="info" mb={5} px={10}>
            <AlertTitle>Welcome to the Hack Club Census!</AlertTitle>
            <AlertDescription>
              To get started, please connect your Slack account.
            </AlertDescription>
          </Alert>

          <Link href="/login" passHref>
            <Button
              leftIcon={<FaSlack />}
              variant="solid"
              colorScheme="blue"
              as="a"
            >
              Sign In With Slack
            </Button>
          </Link>
        </Box>
      </Flex>
    );
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  try {
    const user = await auth(context);

    return {
      props: {
        user,
      },
    };
  } catch (e) {
    return {
      props: {
        user: null,
      },
    };
  }
};
