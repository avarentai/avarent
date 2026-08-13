# Zoho Mail outreach assistant

This is a draft-first outreach workflow for Avarent. It creates personalized drafts in Zoho Mail, checks whether a lead replied or whether a draft was manually sent, and prepares at most two follow-up drafts. It contains no send-email command.

## Operating rules

- Research and add a real, source-backed signal before marking a lead `READY`.
- Start with 5–8 new contacts per weekday, not a blast.
- Use one contact per institution until there is evidence that another stakeholder is appropriate.
- Review every draft in Zoho Mail and schedule it manually for the recipient’s local business hours.
- Stop after two unanswered follow-ups.
- Set `DO_NOT_CONTACT` immediately for opt-outs, wrong contacts, or reputational risk.
- Do not mention the founders’ ages in cold outreach. Answer the question candidly during diligence.
- Do not attach PDFs to the first email. Link to one relevant public artifact.

## Files

- `leads.csv` is the local pipeline and audit trail. It is gitignored so prospect data does not enter repository history.
- `zoho-outreach.mjs` previews drafts, creates Zoho drafts, and synchronizes reply/sent state.
- `config.example` lists the required local secrets. Copy it to `.env.outreach`; that file is gitignored.
- `../OFFER.md` is the offer the sequence is designed to sell.

## One-time Zoho setup

1. In the [Zoho API Console](https://api-console.zoho.com/), create a **Self Client** for this private automation.
2. Generate an offline grant with these least-privilege scopes:

   `ZohoMail.accounts.READ,ZohoMail.messages.READ,ZohoMail.messages.CREATE`

3. Exchange the short-lived grant code for a refresh token as described in Zoho’s OAuth documentation.
4. Copy `config.example` to `.env.outreach` and add the client ID, client secret, refresh token, Zoho data-center hosts, sender address, and account ID.
5. Copy `leads.example.csv` to `leads.csv`. Keep the headers unchanged.
6. If you do not know the account ID, leave it blank temporarily and run:

   `npm run outreach:accounts`

7. Run `npm run outreach:check`, then `npm run outreach:preview` before allowing any API write.

Never paste tokens into source files, chat, screenshots, or the lead CSV.

## Daily workflow

1. Add researched leads to `leads.csv` with status `RESEARCHING`.
2. Complete `Specific Signal`, `Source URL`, and `Pain Hypothesis`.
3. Change only qualified rows to `READY`.
4. Run `npm run outreach:preview` and read every proposed message.
5. Run `npm run outreach:drafts` to create up to eight Zoho drafts.
6. Review, edit, and schedule each draft inside Zoho Mail.
7. Run `npm run outreach:sync` the next workday. This marks sent messages and replies.
8. Run `npm run outreach:followups` when follow-ups are due; review those drafts before scheduling.

`npm run outreach:run` performs sync, initial-draft creation, and follow-up-draft creation in that order. It still cannot send email.

## Statuses

- `RESEARCHING`: incomplete lead research.
- `READY`: approved for an initial draft.
- `DRAFTED`: initial draft exists in Zoho and awaits human review.
- `CONTACTED`: at least one matching message was found in Sent.
- `REPLIED`: a matching inbound message was detected.
- `QUALIFIED`: a real evaluation conversation exists.
- `NOT_NOW`: timing is wrong; no automatic follow-up.
- `CLOSED`: no active opportunity.
- `DO_NOT_CONTACT`: permanent suppression.

## Personalization standard

A usable signal is a factual event tied to the institution: a published AI policy, model-risk hiring, digital-lending launch, fair-lending examination priority, new credit product, annual report statement, regulator consent order, or named executive responsibility.

“You are an innovative bank” is not a signal. Do not infer a compliance failure from a public event. The `Pain Hypothesis` must be framed as a question or plausible review burden, not an accusation.

## Sequence

- **Initial:** the institution-specific signal, one plausible review problem, the synthetic-first offer, and one request to inspect the sample.
- **Follow-up 1:** restate the single-question evaluation path and link to the public methodology.
- **Follow-up 2:** close the loop politely, link to the diligence packet, and promise no more follow-up.

The tool automatically suppresses further drafts after a reply or the second follow-up.
