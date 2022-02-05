import type { NextApiRequest, NextApiResponse } from "next";
import { Issuer } from "openid-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const issuer = await Issuer.discover("https://slack.com");

  const client = new issuer.Client({
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    redirect_uris: [process.env.SLACK_REDIRECT_URI],
  });

  const url = client.authorizationUrl({
    scope: "openid profile",
  });

  res.redirect(url);
}
