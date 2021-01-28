import { WebClient } from "@slack/web-api";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { slack_client_id, slack_client_secret } from "../../lib/secrets_wrapper";
import { generateState } from "../../lib/state";

const client = new WebClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { state, code } = req.query as { state: string; code: string; }
    if (state != generateState()) {
        res.status(400);
        return;
    }

    const resp = await client.oauth.v2.access({
        client_id: slack_client_id,
        client_secret: slack_client_secret,
        code,
        redirect_uri: `http://${req.headers.host}/api/code`,
    })

    if (!resp.ok) {
        res.status(500);
        return;
    }

    const data = resp as any as {
        authed_user: {
            access_token: string;
        }
    }
    const userToken = data.authed_user.access_token

    // If success, redirect back to home with cookies set
    const cookies = new Cookies(req, res)
    cookies.set("slack-auth-token", userToken, {
        httpOnly: true,
        maxAge: 600000, // 10 minutes
        sameSite: true
    })

    // Cosmetic detail
    const userResp = await client.users.identity({ token: userToken })
    if (!userResp.ok) {
        res.status(500);
        return;
    }
    const userName = (userResp as any as { user: { name: string; } }).user.name

    // available to JS for cosmetics
    cookies.set("slack-username", userName, {
        httpOnly: false,
        maxAge: 600000,
        sameSite: true
    })

    res.redirect("/")
}