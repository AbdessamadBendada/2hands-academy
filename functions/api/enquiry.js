const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

const clean = (value, maxLength = 500) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;

const fieldLabels = {
  role: 'Role',
  property: 'Property',
  city: 'City',
  'team-size': 'Spa team size',
  service: 'Service interest',
  timing: 'Preferred timing',
  experience: 'Current experience',
};

export async function onRequestPost({ request, env }) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 30_000) return json({ error: 'request_too_large' }, 413);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid_request' }, 400);
  }

  if (clean(payload.website, 100)) return json({ ok: true });

  const type = payload.type === 'academy' ? 'academy' : payload.type === 'hospitality' ? 'hospitality' : '';
  const lang = payload.lang === 'fr' ? 'fr' : 'en';
  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const message = clean(payload.message, 4_000);
  const property = clean(payload.property, 160);

  if (!type || !name || !isValidEmail(email) || !message || (type === 'hospitality' && !property)) {
    return json({ error: 'missing_or_invalid_fields' }, 422);
  }

  if (!env.RESEND_API_KEY || !env.ENQUIRY_TO_EMAIL) {
    return json({ error: 'service_not_configured' }, 503);
  }

  const detailKeys = type === 'hospitality'
    ? ['role', 'property', 'city', 'team-size', 'service', 'timing']
    : ['experience'];

  const details = detailKeys
    .map((key) => [fieldLabels[key], clean(payload[key], 300)])
    .filter(([, value]) => value);

  const routeName = type === 'hospitality' ? 'Hospitality enquiry' : 'Individual training enquiry';
  const subjectName = type === 'hospitality' ? property : name;
  const subject = `[2Hands website] ${routeName} — ${subjectName}`;
  const source = clean(request.headers.get('referer'), 500) || '2Hands website';

  const detailText = details.map(([label, value]) => `${label}: ${value}`).join('\n');
  const text = [
    routeName,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    detailText,
    '',
    'Message:',
    message,
    '',
    `Language: ${lang.toUpperCase()}`,
    `Source: ${source}`,
  ].filter((line, index, lines) => line || lines[index - 1] !== '').join('\n');

  const detailHtml = details
    .map(([label, value]) => `<tr><th style="padding:7px 16px 7px 0;text-align:left;vertical-align:top;color:#765948;font-size:13px;">${escapeHtml(label)}</th><td style="padding:7px 0;color:#2c241f;font-size:14px;">${escapeHtml(value)}</td></tr>`)
    .join('');

  const html = `
    <div style="margin:0;padding:32px;background:#f7f4ef;font-family:Arial,sans-serif;color:#2c241f;">
      <div style="max-width:680px;margin:0 auto;padding:32px;background:#fff;border:1px solid #e5ddd5;border-radius:18px;">
        <p style="margin:0 0 8px;color:#8d6956;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">${escapeHtml(routeName)}</p>
        <h1 style="margin:0 0 26px;font-size:28px;line-height:1.2;">New enquiry from ${escapeHtml(name)}</h1>
        <table style="width:100%;border-collapse:collapse;">
          <tr><th style="padding:7px 16px 7px 0;text-align:left;color:#765948;font-size:13px;">Name</th><td style="padding:7px 0;font-size:14px;">${escapeHtml(name)}</td></tr>
          <tr><th style="padding:7px 16px 7px 0;text-align:left;color:#765948;font-size:13px;">Email</th><td style="padding:7px 0;font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#765948;">${escapeHtml(email)}</a></td></tr>
          ${detailHtml}
        </table>
        <div style="margin-top:26px;padding:22px;background:#f7f4ef;border-radius:12px;">
          <p style="margin:0 0 9px;color:#765948;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Message</p>
          <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.65;">${escapeHtml(message)}</p>
        </div>
        <p style="margin:24px 0 0;color:#766c66;font-size:12px;">Language: ${lang.toUpperCase()} · Source: ${escapeHtml(source)}</p>
      </div>
    </div>`;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM_EMAIL || '2Hands Website <onboarding@resend.dev>',
      to: [env.ENQUIRY_TO_EMAIL],
      reply_to: email,
      subject,
      html,
      text,
    }),
  });

  if (!resendResponse.ok) return json({ error: 'email_delivery_failed' }, 502);
  return json({ ok: true });
}

export function onRequestGet() {
  return json({ error: 'method_not_allowed' }, 405);
}

