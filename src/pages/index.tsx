import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import { FaArrowRight, FaSlack } from "react-icons/fa";
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
          <Flex
            mb={5}
            p={5}
            alignItems="center"
            bg="blue.800"
            borderRadius="lg"
          >
            {user.picture && (
              <Image
                boxSize={12}
                borderRadius="lg"
                src={user.picture}
                alt={user.userName}
                mr={3}
              />
            )}

            <Flex direction="column" alignItems="start">
              <Text>Signed in as</Text>
              <Heading fontSize={30}>{user.userName}</Heading>
            </Flex>
          </Flex>

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
          <Flex
            mb={5}
            p={5}
            alignItems="center"
            bg="blue.800"
            borderRadius="lg"
            direction="column"
          >
            <Text>Welcome to the Hack Club Census!</Text>
            <Text>To get started, please connect your Slack account.</Text>
          </Flex>

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
