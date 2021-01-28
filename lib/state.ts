import { randomBytes } from "crypto";

// TODO: airtable this
export function generateState(): string {
    return process.env.OAUTH2_STATE ??= randomBytes(64).toString("hex");
}
