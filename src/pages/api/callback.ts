import type { NextApiRequest, NextApiResponse } from "next";
import { Issuer } from "openid-client";
import * as jose from "jose";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const issuer = await Issuer.discover("https://slack.com");

  const client = new issuer.Client({
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
  });

  const tokenSet = await client.callback(process.env.SLACK_REDIRECT_URI, {
    code: req.query.code as string,
  });

  const claims = tokenSet.claims();

  const jwt = await new jose.SignJWT({
    userId: claims["https://slack.com/user_id"],
    userName: claims.name,
    picture: claims.picture,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(Buffer.from(process.env.JWT_SECRET, "hex"));

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("census_auth", jwt, {
      maxAge: 604800,
      path: "/",
      httpOnly: true,
    })
  );
  res.redirect("/section/1");
}
