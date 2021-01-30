import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";
import { airtable_api_key, airtable_base } from "../../lib/secrets_wrapper"
import defaultQuestions from "../../default_questions.json"
import Cookies from "cookies";
import { WebClient } from "@slack/web-api";

const client = new WebClient()

const base = new Airtable({ apiKey: airtable_api_key }).base(airtable_base)
const responses = base.table("Responses")

function adaptToAnswers(value: any): [boolean, string[]] {
    if (value.nojs === "yes") {
        /* Adapt values */
        const newValues = []
        for (const i in defaultQuestions) {
            const formKey = `answer_${Number(i) + 1}`
            newValues.push(value[formKey])
        }
        return [true, newValues]
    } else {
        /* No need to adapt values, pull from given */
        return [false, value.answers]
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(400);
        return;
    }

    const cookies = new Cookies(req, res)
    const slack_token = cookies.get("slack-auth-token")
    if (!slack_token) {
        res.status(400);
        return;
    }

    // Fetch user ID
    const userResp = await client.users.identity({ token: slack_token });
    if (!userResp.ok) {
        res.status(500);
        return;
    }
    const userId = (userResp as any as { user: { id: string; } }).user.id

    const [nojs, answers] = adaptToAnswers(req.body)
    const now = Date.now()

    const record = await responses.create({
        timestamp: now,
        slack_user_id: userId,
        answers: JSON.stringify(answers),
    })

    // If nojs, show the page!
    if (nojs) {
        res.redirect(`/success_nojs?recordId=${record.id}`)
    } else {
        res.json({
            recordId: record.id
        })
    }
}