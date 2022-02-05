import { GetServerSideProps } from "next";
import auth, { User } from "./auth";

export interface Props {
  user: User;
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
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
