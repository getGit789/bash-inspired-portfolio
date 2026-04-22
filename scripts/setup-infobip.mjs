/**
 * One-shot Infobip 2FA setup: creates Application + Message template, prints
 * VITE_INFOBIP_APPLICATION_ID and VITE_INFOBIP_MESSAGE_ID for .env
 *
 * Requires in .env (project root) or in the environment:
 *   VITE_INFOBIP_API_KEY
 *   VITE_INFOBIP_BASE_URL  (e.g. https://xxxx.api.infobip.com)
 *
 * Run: npm run setup:infobip
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

function loadDotEnv() {
  const out = { ...process.env };
  const envPath = join(projectRoot, '.env');
  if (!existsSync(envPath)) return out;
  const text = readFileSync(envPath, 'utf8');
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (out[key] === undefined) out[key] = val;
  }
  return out;
}

function requireEnv(env, name) {
  const v = env[name];
  if (v == null || String(v).trim() === '') {
    console.error(
      `Missing ${name}. Set it in .env (project root) or export it before running this script.`
    );
    process.exit(1);
  }
  return String(v).trim();
}

/** https:// is required for fetch(); domain-only values from .env are accepted */
function normalizeInfobipBaseUrl(s) {
  const t = s.replace(/\/$/, '');
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t.replace(/^\/+/, '')}`;
}

const env = loadDotEnv();
const apiKey = requireEnv(env, 'VITE_INFOBIP_API_KEY');
const baseUrlRaw = normalizeInfobipBaseUrl(
  requireEnv(env, 'VITE_INFOBIP_BASE_URL')
);

const headers = {
  Authorization: `App ${apiKey}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

async function main() {
  console.log('Creating 2FA application…');
  const appRes = await fetch(`${baseUrlRaw}/2fa/2/applications`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: 'Resume Download OTP',
      enabled: true,
      configuration: {
        pinAttempts: 5,
        pinTimeToLive: '600s',
        verifyPinLimit: '5/1d',
        sendPinPerApplicationLimit: '50/1d',
        sendPinPerPhoneNumberLimit: '3/1d',
      },
    }),
  });

  const appData = await appRes.json();
  if (!appRes.ok) {
    console.error('Application creation failed:', JSON.stringify(appData, null, 2));
    process.exit(1);
  }

  const applicationId = appData.applicationId;
  if (!applicationId) {
    console.error('Unexpected response (no applicationId):', appData);
    process.exit(1);
  }
  console.log('OK  applicationId =', applicationId);

  console.log('Creating message template…');
  const msgRes = await fetch(
    `${baseUrlRaw}/2fa/2/applications/${applicationId}/messages`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        language: 'en',
        messageText:
          'Your verification code is {{pin}}. This code expires in 10 minutes.',
        pinType: 'NUMERIC',
        pinLength: 6,
        pinPlaceholder: '{{pin}}',
      }),
    }
  );

  const msgData = await msgRes.json();
  if (!msgRes.ok) {
    console.error('Message creation failed:', JSON.stringify(msgData, null, 2));
    process.exit(1);
  }

  const messageId = msgData.messageId;
  if (!messageId) {
    console.error('Unexpected response (no messageId):', msgData);
    process.exit(1);
  }
  console.log('OK  messageId =', messageId);

  console.log('\nAdd or update these lines in your .env:\n');
  console.log(`VITE_INFOBIP_APPLICATION_ID=${applicationId}`);
  console.log(`VITE_INFOBIP_MESSAGE_ID=${messageId}`);
  console.log('');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
