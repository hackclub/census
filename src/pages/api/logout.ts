import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("census_auth", "", {
      maxAge: 0,
      path: "/",
    })
  );

  res.redirect("/");
}
