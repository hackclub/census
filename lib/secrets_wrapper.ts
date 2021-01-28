// Safe wrapper around secrets,
// which tries secrets.ts first
// then falls back to env variables.
import fs from 'fs';

export let slack_client_id: string;
export let slack_client_secret: string;
export let airtable_api_key: string;
export let airtable_base: string;

function check_env(name: string): string {
    const val = process.env[name];
    if (val === undefined) {
        throw `Check failed: ${name} is undefined`;
    }
    return val;
}

try {
    const contents = fs.readFileSync('./secrets.json', { encoding: 'utf-8' });
    const secrets = JSON.parse(contents);
    slack_client_id = secrets.slack_client_id;
    slack_client_secret = secrets.slack_client_secret;
    airtable_api_key = secrets.airtable_api_key;
    airtable_base = secrets.airtable_base;
} catch (_) {
    slack_client_id = check_env('SLACK_CLIENT_ID');
    slack_client_secret = check_env('SLACK_CLIENT_SECRET');
    airtable_api_key = check_env('AIRTABLE_API_KEY');
    airtable_base = check_env('AIRTABLE_BASE_ID');
}