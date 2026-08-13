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
    title: "Avarent | Find lending disparities and package the evidence",
    description: "Find disparate lending outcomes, investigate the drivers behind a finding, and give compliance and model-risk teams review-ready evidence.",
    path: "/",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#software`,
        name: "Avarent",
        url: site.url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: site.description,
        provider: { "@id": `${site.url}/#organization` },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Banks, credit unions, and lending fintechs",
        },
        featureList: [
          "Fair-lending outcome measurement",
          "Disparity finding investigation",
          "Adverse-action reason review support",
          "Review-ready evidence packet export",
        ],
      },
      faqSchema,
    ],
    body: `
      <div id="avarent-hero-root">
        <section class="hero-card-section" aria-label="Avarent overview">
          <div class="hero-card">
            <div class="hero-shader-fallback" aria-hidden="true"></div>
            <div class="hero-card-content"><a class="hero-badge" href="/" aria-label="Avarent home"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 5H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h3M21 5h3a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3h-3"/><path class="hero-badge-decision" d="m16 11 5 5-5 5-5-5 5-5Z"/></svg><span>Avarent</span></a><h1>Find disparate lending outcomes. Package the evidence.</h1><p>Measure where decisions diverge, investigate the drivers behind a finding, and give compliance and model-risk teams a review-ready record.</p><div class="hero-card-actions"><a class="hero-card-cta" href="/sample-evidence-packet.pdf" data-sample-packet><span>See the evidence</span><span aria-hidden="true">→</span></a><a class="hero-card-link" href="#request" data-conversion-cta data-cta-label="Hero request">Scope one review <span aria-hidden="true">→</span></a></div><div class="hero-card-outcomes" aria-label="Avarent outcomes"><span>Spot disparate outcomes</span><span>Investigate the finding</span><span>Export review-ready evidence</span></div></div>
          </div>
        </section>
      </div>

      <section class="system-section" aria-labelledby="system-title">
        <div class="shell system-frame">
          <div class="system-heading">
            <p class="section-index">Why it matters</p>
            <h2 id="system-title">A disparity only matters if your team can act on it.</h2>
            <p>Avarent turns one decision question into a finding your teams can understand, challenge, and use.</p>
          </div>
          <div class="system-flow">
            <article><span>01</span><small>Detect</small><strong>See where lending outcomes diverge.</strong><i aria-hidden="true">→</i></article>
            <article><span>02</span><small>Investigate</small><strong>Trace the population, window, inputs, and candidate reasons.</strong><i aria-hidden="true">→</i></article>
            <article><span>03</span><small>Deliver</small><strong>Give reviewers a reproducible evidence packet.</strong></article>
          </div>
        </div>
      </section>

      <div class="proof-rail" aria-label="Fixed-scope evaluation"><span>One evaluation question</span><span>One reproducible finding</span><span>One evidence packet</span><span>Ten-business-day delivery</span></div>

      <section class="split-section shell" id="platform">
        <div class="section-heading"><p class="section-index">01 / What it does</p><h2>Move from a signal to a defensible next action.</h2></div>
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

      <nav class="page-directory shell" aria-label="Explore Avarent">
        <span class="page-directory__label">Go deeper when you need to</span>
        <a href="#platform"><small>01</small><span>Platform</span><b aria-hidden="true">↑</b></a>
        <a href="/methodology"><small>02</small><span>Methodology</span><b aria-hidden="true">→</b></a>
        <a href="/trust"><small>03</small><span>Trust</span><b aria-hidden="true">→</b></a>
        <a href="/pilot"><small>04</small><span>Pilot</span><b aria-hidden="true">→</b></a>
        <a href="/security"><small>05</small><span>Security</span><b aria-hidden="true">→</b></a>
        <a href="/diligence"><small>06</small><span>Diligence</span><b aria-hidden="true">→</b></a>
      </nav>

      <section class="audience-section shell">
        <div class="section-heading"><p class="section-index">03 / Built for the buying committee</p><h2>Give every reviewer the answer they need.</h2></div>
        <div class="audience-list">
          <article><h3>Compliance</h3><p>What happened, which rule or policy is implicated, what is uncertain, and who reviewed it?</p><a href="/methodology">Inspect definitions</a></article>
          <article><h3>Model risk</h3><p>Which population, reference group, metric, version, threshold, and validation boundary produced the result?</p><a href="/methodology">Inspect methods</a></article>
          <article><h3>Security and IT</h3><p>What data is needed, where does it move, who can access it, when is it deleted, and how does the pilot end?</p><a href="/security">Inspect security scope</a></article>
          <article><h3>Procurement</h3><p>What is being purchased, what can fail, what evidence is available, and how does the institution exit?</p><a href="/diligence">Open the diligence packet</a></article>
        </div>
      </section>

      <section class="pilot-band">
        <div class="shell pilot-band-grid"><div><p class="section-index">04 / The first engagement</p><h2>Start narrow. Prove value. Then expand.</h2></div><ol><li><span>1</span><div><strong>Choose the question</strong><p>Define the workflow, outcome, population, comparison, and useful decision.</p></div></li><li><span>2</span><div><strong>Run the review</strong><p>Test whether the finding is reproducible, clear, and useful to your team.</p></div></li><li><span>3</span><div><strong>Receive the evidence</strong><p>Leave with the packet, exports, limitations, and a concrete next decision.</p></div></li></ol>${button("See the full pilot plan", "/pilot", "light")}</div>
      </section>

      <section class="faq-section shell"><div class="section-heading"><p class="section-index">05 / Direct answers</p><h2>What buyers ask before moving forward.</h2></div><div class="faq-list">${faqMarkup}</div></section>

      <section class="contact-section shell" id="request"><div><p class="section-index">06 / A concrete next step</p><h2>Bring one real evaluation question.</h2><p>Tell us the lending workflow and the decision you need to make. We will return a proposed method, minimum inputs, deliverables, and a clear next step.</p></div>${inquiryForm("homepage")}</section>`,
  }),

  "/ai-credit-fair-lending-review": layout({
    title: "Evaluate AI credit decisions for fair-lending risk | Avarent",
    description: "A practical guide to reviewing AI and algorithmic credit decisions for disparate outcomes, decision reasons, governance, and reproducible evidence.",
    path: "/ai-credit-fair-lending-review",
    schemas: [{
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "How to evaluate AI credit decisions for fair-lending risk",
      description: "A practical guide to reviewing AI and algorithmic credit decisions for disparate outcomes, decision reasons, governance, and reproducible evidence.",
      author: { "@id": `${site.url}/#organization` },
      publisher: { "@id": `${site.url}/#organization` },
      datePublished: "2026-08-13",
      dateModified: site.contentUpdated,
      mainEntityOfPage: `${site.url}/ai-credit-fair-lending-review`,
      about: ["Fair lending", "Artificial intelligence", "Credit decisioning", "Model risk management"],
    }],
    body: `<section class="page-hero shell"><p class="eyebrow">AI credit fair-lending review guide</p><h1>How should lenders evaluate AI credit decisions for fair-lending risk?</h1><p>A useful review does more than calculate a disparity metric. It defines the decision population, tests outcomes across documented cohorts, investigates the context behind material findings, checks whether stated decision reasons are supported, and preserves a record a qualified reviewer can reproduce.</p><p class="updated">Avarent guide · reviewed ${site.contentUpdated}</p></section>
      <article class="document shell"><nav class="document-nav" aria-label="Guide contents"><strong>Contents</strong><a href="#answer">Direct answer</a><a href="#measure">What to measure</a><a href="#evidence">Evidence packet</a><a href="#sequence">Review sequence</a><a href="#owners">Who should review</a><a href="#sources">Primary sources</a></nav><div class="document-body">
        <section id="answer"><h2>Direct answer</h2><p>An AI credit-decision review should answer five questions: What decision was made? Which population and comparison groups were evaluated? Where did outcomes diverge? What data and candidate reasons help explain the finding? What evidence and human action were recorded afterward?</p><div class="answer-grid" aria-label="Five review questions"><div><strong>Decision</strong><span>Which workflow, outcome, product, and period are in scope?</span></div><div><strong>Population</strong><span>Which applicants or accounts are included, excluded, and compared?</span></div><div><strong>Outcome</strong><span>Which rates, gaps, thresholds, and uncertainty checks were calculated?</span></div><div><strong>Context</strong><span>Which inputs, policy choices, and alternative explanations require review?</span></div><div><strong>Evidence</strong><span>Can a qualified reviewer reproduce the finding and see the next action?</span></div></div></section>
        <section id="measure"><h2>What should be measured?</h2><p>Start with the actual decision outcome, not a generic model score. Depending on the workflow, useful measures can include favorable-outcome rates, adverse impact ratio, statistical parity difference, pricing or term differences, exception patterns, and the stability of results across time windows. Every measure should retain its population definition, comparison group, denominator, exclusions, configuration, and interpretation limits.</p><p>A threshold crossing is a screening signal. It does not identify cause or establish a legal conclusion by itself. Sample size, missing or inferred demographic attributes, reference-group selection, policy context, and statistical uncertainty can materially change the interpretation.</p><p><a href="/methodology">See Avarent's formulas and interpretation limits.</a></p></section>
        <section id="evidence"><h2>What belongs in a reviewable evidence packet?</h2><ul class="plain-list"><li>The evaluation question, workflow, outcome, population, comparison group, and time window.</li><li>The data fields used, excluded, derived, missing, or inferred.</li><li>The metric definitions, thresholds, configuration, software version, and calculation output.</li><li>Material findings with supporting records and alternative explanations to investigate.</li><li>Candidate adverse-action reasons and the fields supporting or contradicting them.</li><li>Reviewer identity, review date, disposition, next action, and unresolved limitations.</li><li>An export manifest that lets another reviewer locate and reproduce the artifacts.</li></ul><p><a href="/sample-evidence-packet.pdf" data-sample-packet>Inspect Avarent's four-page synthetic example.</a></p></section>
        <section id="sequence"><h2>A practical review sequence</h2><ol class="stage-list"><li><span>01</span><div><h3>Define one decision question</h3><p>Name the workflow, outcome, population, comparison, time window, and decision the review must support.</p></div></li><li><span>02</span><div><h3>Reproduce a baseline</h3><p>Confirm that the supplied inputs and agreed method reproduce a known measure within an accepted tolerance.</p></div></li><li><span>03</span><div><h3>Investigate material findings</h3><p>Review population design, sample size, inputs, policy context, reason codes, and plausible alternative explanations.</p></div></li><li><span>04</span><div><h3>Record the human decision</h3><p>Document what was concluded, what remains uncertain, who owns the next action, and when the finding will be revisited.</p></div></li></ol></section>
        <section id="owners"><h2>Who should participate?</h2><div class="evidence-table"><div><strong>Compliance and fair lending</strong><span>Define the policy question, review implications, and own escalation.</span></div><div><strong>Model risk</strong><span>Challenge methodology, data, configuration, validation boundaries, and reproducibility.</span></div><div><strong>Lending and product</strong><span>Explain the workflow, policy intent, exceptions, and operational context.</span></div><div><strong>Data and engineering</strong><span>Verify source fields, transformations, versions, lineage, and access.</span></div><div><strong>Legal counsel</strong><span>Provide qualified legal interpretation when the facts require it.</span></div><div><strong>Security and procurement</strong><span>Review data handling, provider risk, contracting, retention, deletion, and exit.</span></div></div></section>
        <section id="sources"><h2>Primary sources</h2><p>This guide is an operational framework, not legal advice. Review the underlying requirements and guidance directly:</p><div class="reference-list">${officialReferences.map((item) => `<a href="${item.href}" rel="noopener"><span><strong>${item.name}</strong><small>${item.owner}</small></span><p>${item.note}</p><b aria-hidden="true">↗</b></a>`).join("")}</div></section>
      </div></article>`,
  }),

  "/glossary": layout({
    title: "AI credit and fair-lending glossary | Avarent",
    description: "Plain-language definitions for adverse impact ratio, statistical parity difference, evidence packets, synthetic-first reviews, and AI credit-decision oversight.",
    path: "/glossary",
    schemas: [{
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "Avarent AI credit and fair-lending glossary",
      url: `${site.url}/glossary`,
      description: "Definitions used in Avarent's fair-lending evidence workflow.",
      hasDefinedTerm: ["Adverse impact ratio", "Statistical parity difference", "Evidence packet", "Synthetic-first review", "Finding record", "Human review"].map((name) => ({ "@type": "DefinedTerm", name })),
    }],
    body: `<section class="page-hero shell"><p class="eyebrow">Plain-language definitions</p><h1>AI credit and fair-lending glossary.</h1><p>These definitions describe how Avarent uses common fair-lending, model-risk, and evidence-review terms. Institutional policy and qualified legal interpretation remain authoritative.</p><p class="updated">Reviewed ${site.contentUpdated}</p></section>
      <article class="glossary shell" aria-label="Avarent glossary">
        <dl class="glossary-list">
          <div id="adverse-impact-ratio"><dt><dfn>Adverse impact ratio (AIR)</dfn></dt><dd>The favorable-outcome rate for a comparison group divided by the favorable-outcome rate for a reference group. A value below a configured screening threshold can prompt investigation, but does not establish cause or a legal conclusion by itself.</dd></div>
          <div id="statistical-parity-difference"><dt><dfn>Statistical parity difference (SPD)</dfn></dt><dd>The comparison group's favorable-outcome rate minus the reference group's favorable-outcome rate. It expresses an absolute percentage-point gap and should be reviewed with sample size, uncertainty, and business context.</dd></div>
          <div id="favorable-outcome-rate"><dt><dfn>Favorable-outcome rate</dfn></dt><dd>The share of an explicitly defined population receiving the favorable outcome under review, such as an approval. The numerator, denominator, exclusions, and time window must be documented.</dd></div>
          <div id="comparison-group"><dt><dfn>Comparison group</dfn></dt><dd>The cohort whose outcome rate is compared with a documented reference group. Group definitions may depend on available, permitted, or institution-approved demographic attributes.</dd></div>
          <div id="reference-group"><dt><dfn>Reference group</dfn></dt><dd>The cohort used as the denominator or baseline for a disparity comparison. Its selection can materially affect the result and should be documented rather than assumed.</dd></div>
          <div id="review-threshold"><dt><dfn>Review threshold</dfn></dt><dd>A configured level that triggers additional investigation or human review. It is a workflow rule, not an automatic legal verdict.</dd></div>
          <div id="adverse-action-reason-review"><dt><dfn>Adverse-action reason review</dfn></dt><dd>A check that stated reasons are accurate, specific, and supported by factors actually considered or scored in the decision. Avarent can organize candidate reasons and supporting fields for qualified human review.</dd></div>
          <div id="finding-record"><dt><dfn>Finding record</dfn></dt><dd>A traceable record connecting a material result to its question, population, comparison, time window, configuration, supporting evidence, interpretation, reviewer, and next action.</dd></div>
          <div id="evidence-packet"><dt><dfn>Evidence packet</dfn></dt><dd>A reproducible collection of scope, method, inputs, configuration, findings, reviewer actions, limitations, and exports assembled for internal or third-party review.</dd></div>
          <div id="synthetic-first-review"><dt><dfn>Synthetic-first review</dfn></dt><dd>An evaluation that begins with representative synthetic or institution-approved de-identified data to test usefulness and evidence quality before production access is considered.</dd></div>
          <div id="human-review"><dt><dfn>Human review</dfn></dt><dd>A documented decision by qualified staff who examine the result, context, uncertainty, and next action. Software can support the review but does not own the institution's decision authority.</dd></div>
          <div id="model-risk-evidence"><dt><dfn>Model-risk evidence</dfn></dt><dd>Artifacts that help reviewers understand and challenge a model-related workflow, including data lineage, methodology, configuration, version context, validation boundaries, findings, limitations, and governance actions.</dd></div>
        </dl>
        <p class="glossary-source">For formulas, limitations, and regulatory references, see the <a href="/methodology">public methodology</a>.</p>
      </article>`,
  }),

  "/about": layout({
    title: "About Avarent | Fair-lending evidence for AI credit decisions",
    description: "Avarent is an early-stage lending technology company building reviewable fair-lending and model-risk evidence for AI credit decisions.",
    path: "/about",
    body: `<section class="page-hero shell"><p class="eyebrow">About Avarent</p><h1>Make algorithmic lending decisions easier to inspect.</h1><p>Avarent is an early-stage lending technology company founded by George and Lucas. We help banks, credit unions, and lending fintechs turn credit-decision outputs into findings and evidence that compliance, model-risk, lending, security, and procurement teams can review.</p><p class="updated">Company information · reviewed ${site.contentUpdated}</p></section>
      <article class="document shell"><nav class="document-nav" aria-label="About Avarent"><strong>Company</strong><a href="#product">Product</a><a href="#customers">Who it serves</a><a href="#engagement">First engagement</a><a href="#transparency">Transparency</a><a href="#contact">Contact</a></nav><div class="document-body">
        <section id="product"><h2>What Avarent builds</h2><p>Avarent is an evaluation and evidence layer for AI and algorithmic credit decisioning. It measures outcome differences across documented cohorts, helps reviewers investigate material findings and candidate decision reasons, and preserves the scope, configuration, limitations, human actions, and exports behind the review.</p></section>
        <section id="customers"><h2>Who Avarent serves</h2><p>Avarent is designed for credit unions, community banks, banks, and lending fintechs. The primary users and evaluators are fair-lending and compliance officers, model-risk teams, lending and product leaders, security reviewers, IT teams, and procurement staff.</p></section>
        <section id="engagement"><h2>The first engagement</h2><p>The founding evaluation is a $2,500 fixed-scope review of one workflow and one agreed evaluation question. It targets delivery within ten business days after accepted inputs and includes a reproducible finding, evidence packet, exports, limitations, and stakeholder readout.</p><p><a href="/pilot">Review the current scope, deliverables, and commercial terms.</a></p></section>
        <section id="transparency"><h2>Company transparency</h2><p>Avarent publishes its methodology, sample output, website data flow, service providers, security-review starting point, open assurance gaps, and credentials it does not claim. The trust center contains company-risk disclosures that do not belong in the main product pitch but remain available to evaluators.</p><p><a href="/trust">Inspect the trust center.</a></p></section>
        <section id="contact"><h2>Contact Avarent</h2><div class="contact-directory"><a href="mailto:${site.emails.sales}?subject=Avarent%20evaluation"><strong>Sales</strong><span>${site.emails.sales}</span></a><a href="mailto:${site.emails.enterprise}?subject=Avarent%20enterprise%20review"><strong>Enterprise and procurement</strong><span>${site.emails.enterprise}</span></a><a href="mailto:${site.emails.security}?subject=Avarent%20security%20review"><strong>Security</strong><span>${site.emails.security}</span></a><a href="mailto:${site.emails.george}?cc=${site.emails.lucas}&subject=Avarent%20company%20question"><strong>Founders</strong><span>George and Lucas</span></a></div></section>
      </div></article>`,
  }),

  "/pilot": layout({
    title: "Avarent synthetic fair-lending review | Fixed-scope pilot",
    description: "Bring one lending evaluation question. Receive a reproducible finding, evidence packet, and stakeholder readout through a $2,500 synthetic-first review.",
    path: "/pilot",
    schemas: [{
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${site.url}/pilot#service`,
      name: "Avarent fixed-scope fair-lending evidence review",
      url: `${site.url}/pilot`,
      description: "A ten-business-day review of one lending workflow and one agreed evaluation question, delivered with a reproducible finding, evidence packet, exports, limitations, and stakeholder readout.",
      provider: { "@id": `${site.url}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Banks, credit unions, and lending fintechs",
      },
      offers: {
        "@type": "Offer",
        price: "2500",
        priceCurrency: "USD",
        url: `${site.url}/pilot`,
        availability: "https://schema.org/InStock",
        description: "Founding evaluation terms: 50% at written scope acceptance and 50% at delivery.",
      },
    }],
    body: `<section class="page-hero page-hero--conversion shell"><p class="eyebrow">Synthetic fair-lending evidence review</p><h1>One question. One evidence packet. Ten business days.</h1><p>Test whether Avarent produces evidence your compliance and model-risk teams can challenge and use, without replacing the decision model or beginning with production integration.</p><div class="button-row">${button("Inspect the sample output", "/sample-evidence-packet.pdf")}${button("Scope one question", "#request", "secondary")}</div><div class="offer-summary" aria-label="Fixed-scope review terms"><div><strong>Scope</strong><span>One workflow and one agreed evaluation question.</span></div><div><strong>Delivery</strong><span>Evidence packet and readout within 10 business days of accepted inputs.</span></div><div><strong>Founding evaluation terms</strong><span>$2,500 fixed during Avarent’s initial institutional evaluation period. Half at scope acceptance and half at delivery.</span></div></div></section>
      <section class="document shell"><div class="document-nav"><strong>Review terms</strong><a href="#stages">What happens</a><a href="#boundaries">Scope and deliverables</a><a href="#success">Success criteria</a><a href="#request">Scope a question</a></div><div class="document-body">
        <section id="stages"><h2>A finite review, with an exit at each stage.</h2><ol class="stage-list"><li><span>01</span><div><h3>Scope the question</h3><p>In a no-charge conversation, define one workflow, outcome, population, comparison, time window, and useful decision. Avarent returns the proposed method, minimum inputs, exclusions, and success criteria before requesting data or payment.</p><strong>Exit condition:</strong> the question or method is not a fit.</div></li><li><span>02</span><div><h3>Run the evidence review</h3><p>Use one synthetic or institution-approved de-identified extract. Avarent documents the configuration, reproduces the agreed measures, records findings, and makes limitations visible.</p><strong>Exit condition:</strong> the inputs are unsuitable or the output is not reproducible.</div></li><li><span>03</span><div><h3>Deliver and decide</h3><p>Receive the evidence packet, agreed exports, and a 45-minute stakeholder readout. Your team decides whether a limited next-stage pilot is justified.</p><strong>Exit condition:</strong> delivery completes the review; expansion is never automatic.</div></li></ol></section>
        <section id="boundaries"><h2>Scope and deliverables</h2><div class="evidence-table"><div><strong>Inputs</strong><span>One agreed tabular extract, data dictionary, outcome definition, comparison cohorts, and time window</span></div><div><strong>Starting data</strong><span>Synthetic or institution-approved de-identified data</span></div><div><strong>Deliverables</strong><span>Configuration note, disparity screen, finding record, limitations, evidence packet, export, and stakeholder readout</span></div><div><strong>Production integration</strong><span>Not included or required</span></div><div><strong>Decision authority</strong><span>Remains with the institution</span></div><div><strong>Commercial terms</strong><span>$2,500 fixed; 50% at written scope acceptance and 50% at delivery</span></div><div><strong>Public reference</strong><span>Never assumed; separate written permission is required</span></div></div></section>
        <section id="success"><h2>Success is observable, not rhetorical.</h2><p>Before work begins, choose two or three tests: reproduce one baseline measure within an agreed tolerance; trace each finding to its population and configuration; export a packet a qualified reviewer can challenge; or identify a known limitation clearly. “Become compliant,” “eliminate bias,” and “receive regulatory approval” are not valid success criteria.</p></section>
        <section id="request"><h2>Scope one evaluation question</h2><p>No data belongs in this form. A founder will respond with the proposed boundary, required inputs, deliverables, exclusions, and next decision.</p>${inquiryForm("pilot")}</section>
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
    schemas: [{
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Avarent fair-lending measurement methodology",
      description: "Measurement concepts, adverse impact ratio and statistical parity definitions, interpretation boundaries, and official references used by Avarent.",
      author: { "@id": `${site.url}/#organization` },
      publisher: { "@id": `${site.url}/#organization` },
      datePublished: "2026-08-12",
      dateModified: site.contentUpdated,
      mainEntityOfPage: `${site.url}/methodology`,
      about: ["Adverse impact ratio", "Statistical parity difference", "Fair lending", "Adverse action reasons"],
      citation: officialReferences.map((item) => item.href),
    }],
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
