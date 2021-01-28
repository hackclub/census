import { NextApiRequest, NextApiResponse } from "next";
import { slack_client_id } from "../../lib/secrets_wrapper";
import { generateState } from "../../lib/state";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const redirect_uri = encodeURIComponent(`http://${req.headers.host}/api/code`)
    res.redirect(`https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=${slack_client_id}&redirect_uri=${redirect_uri}&state=${generateState()}`)
}