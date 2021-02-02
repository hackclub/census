import Cookies from "cookies"
import { randomBytes } from "crypto"
import { GetServerSideProps } from "next"

export function getRawState(): string {
    return (process.env.OAUTH2_STATE ??= randomBytes(64).toString("hex"))
}

// TODO: airtable this
export function generateState(next: string): string {
    return `${getRawState()}|${next}`
}

export function validateAndDecodeState(state: string): [boolean, string] {
    let state2, next
    if (state.includes("|")) {
        ;[state2, next] = state.split("|")
    } else {
        state2 = state
        next = "/"
    }
    return [state2 == getRawState(), next]
}

export type LoginProps = {
    slackUsername: string | null
}

export const loginGetServerSideProps: GetServerSideProps = async (context) => {
    const cookies = new Cookies(context.req, context.res)
    return {
        props: {
            slackUsername: cookies.get("slack-username") ?? null,
        },
    }
}
