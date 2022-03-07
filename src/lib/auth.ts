import * as jose from "jose";
import { GetServerSidePropsContext } from "next";

export interface User {
  userId: string;
  userName: string;
  picture?: string;
}

export default async function auth(
  context: GetServerSidePropsContext
): Promise<User> {
  const jwt = context.req.cookies["census_auth"];

  const { payload } = await jose.jwtVerify(
    jwt,
    Buffer.from(process.env.JWT_SECRET, "hex")
  );
  return {
    userId: payload.userId as string,
    userName: payload.userName as string,
    picture: payload.picture as string,
  };
}
