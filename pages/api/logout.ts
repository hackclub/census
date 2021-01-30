import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = new Cookies(req, res)
    cookies.set("slack-auth-token", "", { maxAge: 0 })
    cookies.set("slack-username", "", { maxAge: 0 })
    const next = (req.query.next ?? "/") as string
    res.redirect(next)
}