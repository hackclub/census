import * as jose from "jose";
import cookie from "cookie";
import { GetServerSidePropsContext } from "next";

export interface User {
  userId: string;
  userName: string;
}

export default async function auth(
  context: GetServerSidePropsContext
): Promise<User> {
  const jwt = cookie.parse(context.req.headers.cookie)["census_auth"];

  const { payload } = await jose.jwtVerify(
    jwt,
    Buffer.from(process.env.JWT_SECRET, "hex")
  );
  return {
    userId: payload.userId as string,
    userName: payload.userName as string,
  };
}
