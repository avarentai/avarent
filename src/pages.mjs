import { site, officialReferences, faq } from "./site.mjs";
import { layout, button, status, inquiryForm } from "./render.mjs";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
};

const faqMarkup = faq.map(([question, answer], index) => `<details${index === 0 ? " open" : ""}><summary>${question}<span aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join("");

export const pages = {
  "/": layout({
    title: "Avarent | Fair-lending evidence for AI credit decisions",
    description: "Evaluate disparity, adverse-action explanation, and model-risk evidence without replacing your underwriting model or beginning with production data.",
    path: "/",
    schemas: [
      { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Avarent", applicationCategory: "BusinessApplication", operatingSystem: "Web", description: site.description },
      faqSchema,
    ],
    body: `
      <section class="hero">
        <div class="hero-layout shell">
        <div class="hero-copy">
          <p class="eyebrow">Fair-lending oversight for algorithmic credit</p>
          <h1>Find decision risk before it becomes an examination problem.</h1>
          <p class="hero-lede">Avarent helps lending teams measure outcome disparities, investigate explanation risk, and assemble reviewable evidence. It works around your existing underwriting process and can be evaluated first with synthetic data.</p>
          <div class="button-row">${button("View sample packet", "/sample-evidence-packet.pdf")}${button("Request a scoped review", "#request", "secondary")}</div>
        </div>
        <aside class="hero-proof" aria-label="Pilot boundaries">
          <p>Evaluation boundary</p>
          <dl><div><dt>Starting data</dt><dd>Synthetic or de-identified</dd></div><div><dt>Model changes</dt><dd>None required</dd></div><div><dt>Decision authority</dt><dd>Remains with your team</dd></div><div><dt>Output</dt><dd>Reviewable evidence, not legal conclusions</dd></div></dl>
          <a href="/methodology">Read the methodology <span aria-hidden="true">→</span></a>
        </aside>
        </div>
      </section>

      <section class="system-section" aria-labelledby="system-title">
        <div class="shell system-frame">
          <div class="system-heading">
            <p class="section-index">From output to evidence</p>
            <h2 id="system-title">A review path your teams can follow.</h2>
            <p>Each step preserves its scope, assumptions, limitations, and human owner.</p>
          </div>
          <div class="system-flow">
            <article><span>01</span><small>Decision output</small><strong>Existing model results</strong><i aria-hidden="true">→</i></article>
            <article><span>02</span><small>Cohort measures</small><strong>Disparity screening</strong><i aria-hidden="true">→</i></article>
            <article><span>03</span><small>Finding record</small><strong>Scope + limitations</strong><i aria-hidden="true">→</i></article>
            <article><span>04</span><small>Human review</small><strong>Owned next action</strong><i aria-hidden="true">→</i></article>
            <article><span>05</span><small>Evidence packet</small><strong>Reviewable export</strong></article>
          </div>
        </div>
      </section>

      <div class="proof-rail" aria-label="Evaluation principles"><span>Start outside production</span><span>Human review stays in control</span><span>Limitations are documented</span><span>No certification claims</span></div>

      <section class="split-section shell" id="platform">
        <div class="section-heading"><p class="section-index">01 / What it does</p><h2>One evidence trail from decision output to human review.</h2></div>
        <div class="workflow">
          <article><span>Measure</span><h3>Test outcomes by cohort.</h3><p>Calculate approval-rate and disparity measures against documented reference groups and configurable review thresholds.</p></article>
          <article><span>Investigate</span><h3>Trace the finding.</h3><p>Keep the population, comparison, time window, threshold, and supporting records attached to the result.</p></article>
          <article><span>Explain</span><h3>Review decision reasons.</h3><p>Surface candidate reasons tied to available decision data, while leaving validation and selection with qualified staff.</p></article>
          <article><span>Document</span><h3>Export the evidence.</h3><p>Package methods, findings, reviewer actions, limitations, and version context for internal or third-party review.</p></article>
        </div>
      </section>

      <section class="specimen-section">
        <div class="shell specimen-grid">
          <div class="section-heading section-heading--light"><p class="section-index">02 / Illustrative output</p><h2>A finding should explain itself.</h2><p>This sample is illustrative, not a customer result. Every figure is paired with its comparison, scope, threshold, and next review action.</p></div>
          <div class="specimen-spotlight">
          <div class="evidence-specimen" aria-label="Illustrative disparity finding">
            <h3>Approval-rate disparity crossed the configured review threshold.</h3>
            <div class="metric-line"><strong>0.77</strong><span>adverse impact ratio<br>illustrative cohort</span></div>
            <dl><div><dt>Reference rate</dt><dd>82.4%</dd></div><div><dt>Comparison rate</dt><dd>63.5%</dd></div><div><dt>Window</dt><dd>Jan–Mar sample</dd></div><div><dt>Threshold</dt><dd>0.80 screening rule</dd></div></dl>
            <div class="limitation"><strong>Interpretation boundary</strong><p>A screening threshold is not, by itself, a legal determination. Review population definition, sample size, policy context, and alternative explanations.</p></div>
          </div>
          </div>
        </div>
      </section>

      <section class="sample-callout shell" aria-labelledby="sample-title">
        <div><p class="section-index">Inspect before you contact us</p><h2 id="sample-title">See what “reviewable evidence” means.</h2></div>
        <div><p>Open a four-page synthetic packet containing a disparity finding, calculation context, traceable record, reviewer checklist, limitations, and export manifest. It is illustrative and contains no customer data.</p><div class="button-row">${button("Open the synthetic sample", "/sample-evidence-packet.pdf")}${button("Read the methodology", "/methodology", "secondary")}</div></div>
      </section>

      <section class="audience-section shell">
        <div class="section-heading"><p class="section-index">03 / Designed for scrutiny</p><h2>Answer each reviewer in their own language.</h2></div>
        <div class="audience-list">
          <article><h3>Compliance</h3><p>What happened, which rule or policy is implicated, what is uncertain, and who reviewed it?</p><a href="/methodology">Inspect definitions</a></article>
          <article><h3>Model risk</h3><p>Which population, reference group, metric, version, threshold, and validation boundary produced the result?</p><a href="/methodology">Inspect methods</a></article>
          <article><h3>Security and IT</h3><p>What data is needed, where does it move, who can access it, when is it deleted, and how does the pilot end?</p><a href="/security">Inspect security scope</a></article>
          <article><h3>Procurement</h3><p>What is being purchased, what can fail, what evidence is available, and how does the institution exit?</p><a href="/diligence">Open the diligence packet</a></article>
        </div>
      </section>

      <section class="pilot-band">
        <div class="shell pilot-band-grid"><div><p class="section-index">04 / The low-risk path</p><h2>Evaluate usefulness before expanding trust.</h2></div><ol><li><span>1</span><div><strong>Inspect</strong><p>Review methods, sample outputs, limitations, and proposed controls.</p></div></li><li><span>2</span><div><strong>Run synthetic</strong><p>Use representative, non-production data to test whether the output is useful.</p></div></li><li><span>3</span><div><strong>Scope deliberately</strong><p>Only then agree fields, retention, access, deletion, success criteria, and exit.</p></div></li></ol>${button("See the full pilot plan", "/pilot", "light")}</div>
      </section>

      <section class="faq-section shell"><div class="section-heading"><p class="section-index">05 / Direct answers</p><h2>Questions a skeptical evaluator should ask.</h2></div><div class="faq-list">${faqMarkup}</div></section>

      <section class="contact-section shell" id="request"><div><p class="section-index">06 / A concrete next step</p><h2>Bring one real evaluation question.</h2><p>A scoped review is not a pilot commitment. We will respond with the proposed method, minimum inputs, available evidence, limitations, and the next decision. No payment or production access is requested through this form.</p></div>${inquiryForm("homepage")}</section>`,
  }),

  "/pilot": layout({
    title: "Avarent pilot | Evaluate with synthetic data first",
    description: "A staged Avarent evaluation: inspect the methods, test representative synthetic data, then define any expanded scope explicitly.",
    path: "/pilot",
    body: `<section class="page-hero page-hero--conversion shell"><p class="eyebrow">Scoped design-partner pilot</p><h1>Prove usefulness before expanding access.</h1><p>Avarent’s pilot is structured to answer one question first: does the analysis produce evidence your compliance and model-risk teams can actually use?</p><div class="button-row">${button("View the sample packet", "/sample-evidence-packet.pdf")}${button("Request a scoped review", "#request", "secondary")}</div><div class="offer-summary" aria-label="Initial review offer"><div><strong>Bring</strong><span>One evaluation question. No data required.</span></div><div><strong>Receive</strong><span>A proposed method, inputs, evidence, limits, and next step.</span></div><div><strong>Commitment</strong><span>No card, production access, or automatic conversion.</span></div></div></section>
      <section class="document shell"><div class="document-nav"><strong>On this page</strong><a href="#stages">Evaluation stages</a><a href="#boundaries">Default boundaries</a><a href="#success">Success criteria</a><a href="#request">Request review</a></div><div class="document-body">
        <section id="stages"><h2>Three stages, with an exit at each one.</h2><ol class="stage-list"><li><span>01</span><div><h3>Document review</h3><p>Your team reviews methodology, limitations, sample output, data-flow assumptions, and security responses. No data transfer is needed.</p><strong>Exit condition:</strong> the method or workflow is not relevant.</div></li><li><span>02</span><div><h3>Synthetic evaluation</h3><p>Run a representative dataset outside production. Compare Avarent’s output with known expectations and document discrepancies.</p><strong>Exit condition:</strong> the output is not useful or reproducible enough.</div></li><li><span>03</span><div><h3>Limited pilot</h3><p>If justified, define the minimum fields, access, retention, deletion, owners, timeline, success criteria, and incident contacts in writing.</p><strong>Exit condition:</strong> criteria are missed or either party stops the pilot.</div></li></ol></section>
        <section id="boundaries"><h2>Default pilot boundaries</h2><div class="evidence-table"><div><strong>Production integration</strong><span>Not required for initial evaluation</span></div><div><strong>Model replacement</strong><span>Not required</span></div><div><strong>Decision authority</strong><span>Remains with the institution</span></div><div><strong>Initial data</strong><span>Synthetic or de-identified</span></div><div><strong>Commercial commitment</strong><span>Scope, timing, and pricing are agreed in writing before paid work; no card or automatic conversion</span></div><div><strong>Public reference</strong><span>Never assumed; separate written permission required</span></div></div></section>
        <section id="success"><h2>Success is defined before access.</h2><p>A useful pilot has observable criteria, such as reproducing an agreed metric, generating an inspectable finding record, exporting a review packet, or identifying a known limitation. “Become compliant” is not a valid success criterion.</p></section>
        <section id="request"><h2>Request a scoped review</h2><p>Tell us the single workflow you want to evaluate. A founder will reply with a proposed boundary before requesting data or payment.</p>${inquiryForm("pilot")}</section>
      </div></section>`,
  }),

  "/trust": layout({
    title: "Avarent trust center | Evidence, limitations, and pilot controls",
    description: "Understand what Avarent claims, what it does not claim, what can be inspected, and how a low-risk evaluation is structured.",
    path: "/trust",
    body: `<section class="page-hero shell"><p class="eyebrow">Trust center</p><h1>Do not trust a badge. Inspect the boundary.</h1><p>This page separates currently inspectable evidence, pilot commitments, and credentials Avarent does not claim.</p><p class="updated">Last reviewed: August 12, 2026</p></section>
      <section class="trust-matrix shell">
        <div class="trust-row trust-row--head"><strong>Area</strong><strong>Status</strong><strong>What a reviewer can verify</strong></div>
        <div class="trust-row"><h2>Methodology</h2>${status("Public", "good")}<p>Metric definitions, screening thresholds, interpretation limits, human-review expectations, and primary regulatory references.</p><a href="/methodology">Review methodology</a></div>
        <div class="trust-row"><h2>Synthetic-first pilot</h2>${status("Available", "good")}<p>An evaluation can begin without production integration or raw applicant records. Scope expansion requires an explicit data plan.</p><a href="/pilot">Review pilot stages</a></div>
        <div class="trust-row"><h2>Security review</h2>${status("Public starting packet", "good")}<p>Website data flow, service providers, access assumptions, retention questions, incident contact, and explicit open items are available before sensitive data.</p><a href="/diligence">Open diligence packet</a></div>
        <div class="trust-row"><h2>SOC 2</h2>${status("Not claimed", "plain")}<p>Avarent does not represent that it currently holds a SOC 2 report. We will not use ambiguous “aligned” language as a substitute.</p></div>
        <div class="trust-row"><h2>Regulatory approval</h2>${status("Not claimed", "plain")}<p>Avarent is not a regulator, law firm, or certification body and does not guarantee that use of the product makes an institution compliant.</p></div>
        <div class="trust-row"><h2>Customer proof</h2>${status("Not fabricated", "plain")}<p>We do not publish customer logos, testimonials, or outcome statistics without permission and evidence.</p></div>
      </section>
      <section class="founder-note shell"><div><p class="section-index">Company transparency</p><h2>Continuity and contracting are reviewable risks.</h2></div><div><p>Avarent was founded by two 17-year-olds. That may increase an institution’s perception of execution, continuity, and contracting risk; hiding it would create a larger trust problem.</p><p>Before any pilot, Avarent will document the legally authorized signatory, named technical and escalation owners, written scope, success criteria, artifact export, access revocation, deletion expectations, and an explicit exit path. If a requested assurance or qualified advisor does not exist, we will say so.</p></div></section>
      <section class="contact-strip shell"><div><h2>Start with the public packet.</h2><p>Inspect the current data boundary and open items before emailing George or Lucas with follow-up questions.</p></div><div class="button-row">${button("Open diligence packet", "/diligence")}${button("Contact the founders", `mailto:${site.emails.george}?cc=${site.emails.lucas}&subject=Avarent%20diligence%20question`, "secondary")}</div></section>`,
  }),

  "/methodology": layout({
    title: "Avarent methodology | Fair-lending measurement and limitations",
    description: "Review Avarent's measurement concepts, adverse impact ratio and statistical parity definitions, interpretation boundaries, and official references.",
    path: "/methodology",
    body: `<section class="page-hero shell"><p class="eyebrow">Public methodology</p><h1>Measurements are evidence, not verdicts.</h1><p>Avarent’s outputs are intended to support investigation and qualified review. A metric crossing a threshold is a prompt to examine context, not a standalone legal conclusion.</p><p class="updated">Methodology overview · version 1.0 · August 12, 2026</p></section>
      <section class="document shell"><div class="document-nav"><strong>Contents</strong><a href="#air">Adverse impact ratio</a><a href="#spd">Statistical parity difference</a><a href="#reasons">Decision reasons</a><a href="#limits">Limitations</a><a href="#references">References</a></div><div class="document-body">
        <section id="air"><h2>Adverse impact ratio</h2><p>The adverse impact ratio compares a selected group’s favorable-outcome rate with a reference group’s rate.</p><div class="formula"><span>AIR</span><strong>comparison-group favorable outcome rate</strong><i>÷</i><strong>reference-group favorable outcome rate</strong></div><p>A four-fifths or 0.80 threshold can be used as a screening convention. It does not, by itself, establish unlawful discrimination. Population definition, sample size, selection of reference group, policy context, and statistical uncertainty matter.</p></section>
        <section id="spd"><h2>Statistical parity difference</h2><p>Statistical parity difference expresses the absolute gap between favorable-outcome rates. Its direction, magnitude, sampling variability, and business context should be reviewed together.</p><div class="formula"><span>SPD</span><strong>comparison-group rate</strong><i>−</i><strong>reference-group rate</strong></div></section>
        <section id="reasons"><h2>Adverse-action reason review</h2><p>Avarent can organize candidate explanations and supporting decision fields for human review. The creditor remains responsible for ensuring disclosed reasons are accurate, specific, and tied to factors actually considered or scored.</p><div class="notice"><strong>Current-source note</strong><p>CFPB Circulars 2022-03 and 2023-03 were withdrawn on May 12, 2025. Avarent does not present withdrawn circulars as current supervisory guidance. The underlying ECOA and Regulation B obligations, including § 1002.9, should be evaluated with qualified counsel.</p></div></section>
        <section id="limits"><h2>Known interpretation limits</h2><ul class="plain-list"><li>Observed disparity does not identify cause by itself.</li><li>Small samples can produce unstable estimates.</li><li>Missing, inferred, or misclassified demographic attributes can change results.</li><li>Post-hoc explanations can approximate rather than reproduce a model’s internal reasoning.</li><li>Thresholds should reflect institutional policy and qualified review, not software defaults alone.</li><li>Results depend on the completeness and correctness of supplied data.</li></ul></section>
        <section id="references"><h2>Primary references</h2><div class="reference-list">${officialReferences.map((item) => `<a href="${item.href}" rel="noopener"><span><strong>${item.name}</strong><small>${item.owner}</small></span><p>${item.note}</p><b aria-hidden="true">↗</b></a>`).join("")}</div></section>
      </div></section>`,
  }),

  "/security": layout({
    title: "Avarent security review | Data scope before data transfer",
    description: "Avarent's security-review process starts with a documented data flow, minimum fields, access, retention, deletion, incident contacts, and pilot exit plan.",
    path: "/security",
    body: `<section class="page-hero shell"><p class="eyebrow">Security and vendor review</p><h1>Agree the data boundary before transferring data.</h1><p>Avarent’s default evaluation path postpones sensitive-data access until a reviewer understands the proposed flow, controls, limitations, and exit procedure.</p></section>
      <section class="document shell"><div class="document-nav"><strong>Review areas</strong><a href="#sequence">Review sequence</a><a href="#packet">Diligence packet</a><a href="#claims">Claims boundary</a><a href="#report">Report a concern</a></div><div class="document-body">
        <section id="sequence"><h2>Security review sequence</h2><ol class="stage-list"><li><span>01</span><div><h3>Classify the evaluation</h3><p>Identify the use case, data category, environment, users, and whether synthetic data can answer the first question.</p></div></li><li><span>02</span><div><h3>Map the proposed flow</h3><p>Document source, fields, transfer, storage, access, retention, deletion, subprocessors, and export behavior.</p></div></li><li><span>03</span><div><h3>Answer diligence</h3><p>Respond to the institution’s questionnaire with evidence, owners, and honest gaps. Unverified controls are not marked complete.</p></div></li><li><span>04</span><div><h3>Approve or reduce scope</h3><p>If the control posture does not justify the requested data, keep the evaluation synthetic, reduce fields, change the workflow, or stop.</p></div></li></ol></section>
        <section id="packet"><h2>What the review packet should contain</h2><div class="evidence-table"><div><strong>System description</strong><span>Purpose, users, decision role, and environment</span></div><div><strong>Data-flow diagram</strong><span>Sources, transfer, processing, storage, export, and deletion</span></div><div><strong>Field inventory</strong><span>Required, optional, prohibited, and derived fields</span></div><div><strong>Access model</strong><span>Roles, privileges, review, and revocation</span></div><div><strong>Incident contacts</strong><span>Customer and Avarent escalation owners</span></div><div><strong>Exit procedure</strong><span>Export, deletion, access revocation, and confirmation</span></div></div></section>
        <section id="claims"><h2>Claims boundary</h2><p>Avarent does not currently claim SOC 2 certification, regulatory approval, or immunity from security incidents. Specific architecture and control evidence should be evaluated in the context of the requested pilot scope.</p></section>
        <section id="report"><h2>Report a security concern</h2><p>Email <a href="mailto:${site.emails.security}?subject=Security%20report">${site.emails.security}</a> with “Security report” in the subject. Do not include live applicant data or credentials in the first message.</p></section>
      </div></section>`,
  }),

  "/diligence": layout({
    title: "Avarent diligence packet | Data flow, providers, and open items",
    description: "Inspect Avarent's public website data flow, service providers, pilot data boundaries, access questions, deletion expectations, and current assurance gaps.",
    path: "/diligence",
    body: `<section class="page-hero shell"><p class="eyebrow">Public diligence packet</p><h1>Current evidence, proposed controls, and open items.</h1><p>This packet is a starting point for vendor review. It distinguishes the public website from any future customer pilot and does not mark unverified controls complete.</p><p class="updated">Version 1.0 · August 12, 2026 · Owner: Avarent founders</p></section>
      <section class="document shell"><div class="document-nav"><strong>Packet contents</strong><a href="#scope">Scope</a><a href="#flow">Website data flow</a><a href="#providers">Service providers</a><a href="#pilot">Pilot boundary</a><a href="#controls">Control questions</a><a href="#gaps">Open items</a><a href="#contacts">Contacts</a></div><div class="document-body diligence-body">
        <section id="scope"><h2>Scope of this packet</h2><p>This page describes the public marketing website, inquiry delivery, and limited anonymous conversion measurement. It is not a representation of a production lending-data environment. No applicant, underwriting, model-input, or credit-decision data belongs in the website form.</p><div class="notice"><strong>Interpretation boundary</strong><p>A future pilot architecture, data inventory, retention period, access model, and deletion procedure must be documented and accepted in writing before non-synthetic data is transferred.</p></div></section>
        <section id="flow"><h2>Public website data flow</h2><ol class="data-flow" aria-label="Public website data flow"><li><span>1</span><div><strong>Visitor browser</strong><small>Public pages, sample PDF, or three-field inquiry</small></div></li><li><span>2</span><div><strong>Render</strong><small>Web hosting, static delivery, and API request handling</small></div></li><li><span>3A</span><div><strong>Resend</strong><small>Inquiry delivery only: work email, institution, and evaluation question</small></div></li><li><span>3B</span><div><strong>PostHog</strong><small>Allowlisted anonymous funnel events only, without form values or person profiles</small></div></li></ol><p class="packet-caption">Paths 3A and 3B are separate. Form content is not intentionally sent to analytics.</p></section>
        <section id="providers"><h2>Declared website service providers</h2><div class="evidence-table evidence-table--four"><div><strong>Provider</strong><strong>Purpose</strong><strong>Website data</strong><strong>Status</strong></div><div><span>Render</span><span>Hosting and API request handling</span><span>Ordinary request metadata and submitted inquiry traffic</span>${status("Declared", "good")}</div><div><span>Resend</span><span>Inquiry email delivery</span><span>Work email, institution, evaluation question</span>${status("Declared", "good")}</div><div><span>PostHog</span><span>Conversion measurement</span><span>Anonymous event name, page, placement, session identifier</span>${status("Restricted events", "good")}</div></div><p>Provider contracts, locations, retention, and assurance reports should be reviewed against the institution's requirements before a pilot expands beyond the public website.</p></section>
        <section id="pilot"><h2>Default pilot data boundary</h2><div class="evidence-table"><div><strong>First evaluation</strong><span>Synthetic or institution-approved de-identified data</span></div><div><strong>Production connection</strong><span>Not required and not assumed</span></div><div><strong>Applicant data</strong><span>Prohibited until a written field inventory and purpose are approved</span></div><div><strong>Credentials</strong><span>Never submitted through the website inquiry form</span></div><div><strong>Decision authority</strong><span>Remains with the institution</span></div><div><strong>Public reference</strong><span>Requires separate written permission</span></div></div></section>
        <section id="controls"><h2>Controls to agree before non-synthetic data</h2><ul class="control-register"><li><strong>Data inventory</strong><span>Required, optional, prohibited, and derived fields</span><b>Open until scoped</b></li><li><strong>Access</strong><span>Named users, privilege level, review, and revocation</span><b>Open until scoped</b></li><li><strong>Retention</strong><span>Maximum period and deletion trigger</span><b>Open until scoped</b></li><li><strong>Deletion</strong><span>Systems covered, owner, timing, and confirmation evidence</span><b>Open until scoped</b></li><li><strong>Incident handling</strong><span>Notification path, contacts, severity, and required cooperation</span><b>Open until contracted</b></li><li><strong>Exit</strong><span>Artifact export, access revocation, data deletion, and written confirmation</span><b>Required</b></li></ul></section>
        <section id="gaps"><h2>Current assurance gaps</h2><div class="evidence-table"><div><strong>SOC 2 report</strong><span>Not claimed</span></div><div><strong>Regulatory approval</strong><span>Not claimed</span></div><div><strong>Production pilot architecture</strong><span>Not represented on this page; defined per approved scope</span></div><div><strong>Customer references</strong><span>Not published without permission and evidence</span></div><div><strong>Control questionnaire</strong><span>Answered for qualified reviews with evidence or an explicit gap</span></div></div></section>
        <section id="contacts"><h2>Named contact paths</h2><div class="contact-directory"><a href="mailto:${site.emails.security}?subject=Avarent%20security%20review"><strong>Security</strong><span>${site.emails.security}</span></a><a href="mailto:${site.emails.enterprise}?subject=Avarent%20enterprise%20review"><strong>Enterprise and procurement</strong><span>${site.emails.enterprise}</span></a><a href="mailto:${site.emails.george}?cc=${site.emails.lucas}&subject=Avarent%20diligence%20question"><strong>Founder escalation</strong><span>George and Lucas</span></a></div><p>Do not send credentials, applicant records, or live lending data in an initial email.</p></section>
      </div></section>`,
  }),

  "/privacy": layout({
    title: "Avarent privacy notice",
    description: "How Avarent handles information submitted through this website and how to contact Avarent about privacy.",
    path: "/privacy",
    body: `<article class="legal shell"><p class="eyebrow">Privacy notice</p><h1>Website privacy, in plain language.</h1><p class="updated">Effective August 12, 2026</p><h2>Information you submit</h2><p>If you use an inquiry form, Avarent receives the work email, institution, and business question you choose to provide.</p><h2>How it is used</h2><p>We use that information to respond to your request, evaluate fit, maintain a record of the conversation, protect the service, and meet legal obligations. Submitting an inquiry does not enroll you in a newsletter or automated marketing sequence.</p><h2>Limited conversion measurement</h2><p>The site is instrumented for a small set of anonymous funnel events, such as page viewed, sample packet opened, call-to-action clicked, form started, form submitted, or email fallback shown. Event properties are limited to page and placement context. Form values, names, email addresses, institutions, and message contents are not sent to analytics. Advertising pixels, session replay, autocapture, and person profiles are not used.</p><h2>Website operations</h2><p>The site may receive ordinary technical information needed to deliver and protect a web request, including IP address, user agent, requested URL, and timestamps. Analytics forwarding disables person-profile processing and is configured without advertising use.</p><h2>Sharing</h2><p>Information may be processed by service providers used to host the site, deliver an inquiry, or measure the limited anonymous funnel described above. We do not sell submitted contact information. A current subprocessor list should be provided during a qualified security review before any non-public lending data is transferred.</p><h2>Retention and choices</h2><p>We retain inquiry information only as reasonably needed for the conversation, security, or legal obligations. To request access, correction, or deletion, email <a href="mailto:${site.email}?subject=Privacy%20request">${site.email}</a>. We may need to verify the request.</p><h2>Pilot data is separate</h2><p>This website notice does not define the handling of data in a customer pilot. Any pilot involving non-synthetic data requires separate written scope covering fields, purpose, access, retention, deletion, and applicable contractual terms.</p><h2>Contact</h2><p>Questions can be sent to <a href="mailto:${site.email}">${site.email}</a>.</p></article>`,
  }),

  "/terms": layout({
    title: "Avarent website terms",
    description: "Terms governing use of the public Avarent website. Pilot and product use require separate written terms.",
    path: "/terms",
    body: `<article class="legal shell"><p class="eyebrow">Website terms</p><h1>Terms for this public website.</h1><p class="updated">Effective August 12, 2026</p><h2>Informational website</h2><p>This website provides general information about Avarent. It does not provide legal advice, a compliance determination, credit decisions, or a warranty that any workflow satisfies a particular institution’s obligations.</p><h2>No product agreement through browsing</h2><p>Browsing the site or submitting an inquiry does not create a customer, advisory, fiduciary, or legal-services relationship. A pilot or product deployment requires separate written terms, scope, and data-handling commitments.</p><h2>Accuracy and change</h2><p>We work to keep public information accurate but early-stage products and regulatory sources change. Dates and version notes are included where context matters. Contact us if a statement appears outdated or unsupported.</p><h2>Permitted use</h2><p>You may use this site for legitimate evaluation and communication. Do not interfere with site operation, attempt unauthorized access, submit malicious content, or misrepresent Avarent’s materials as regulatory approval.</p><h2>Third-party sources</h2><p>Links to regulators and standards bodies are provided for primary-source context. Those organizations do not endorse Avarent, and their content may change.</p><h2>Contact</h2><p>Questions can be sent to <a href="mailto:${site.email}">${site.email}</a>.</p></article>`,
  }),
};
