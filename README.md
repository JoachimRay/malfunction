# MALFUNCTION 2026 website (Next.js, App Router, TypeScript)

## Run it
```bash
npm install
cp .env.example .env.local   # then fill GOOGLE_SCRIPT_URL
npm run dev
```

## Edit the content
Event text, deadline, tracks, schedule and team size are all in `lib/event.ts`. Anything in [BRACKETS] is a placeholder.

## Save registrations to Google Sheets
1. Create a Google Sheet with a tab named `Registrations`.
2. Extensions > Apps Script, paste this, then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
3. Put the web app URL in `GOOGLE_SCRIPT_URL` in `.env.local` (and in your host's environment variables).

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations');
  sh.appendRow([
    new Date(), d.team.name, d.team.organization,
    d.leader.name, d.leader.email, d.leader.phone,
    d.members.map(m => m.name + ' <' + m.email + '>').join('; '),
    d.details.shirtSize, d.details.dietary, d.details.mentor
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

The browser posts to `/api/register`, which validates the data and forwards it to the script, so your script URL is never exposed to visitors.
