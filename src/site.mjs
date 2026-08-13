export const site = {
  name: "Avarent",
  url: "https://avarent.app",
  email: "george@avarent.app",
  emails: {
    george: "george@avarent.app",
    lucas: "lucas@avarent.app",
    sales: "sales@avarent.app",
    enterprise: "enterprise@avarent.app",
    security: "security@avarent.app",
  },
  description:
    "Avarent helps lending teams find disparate outcomes, investigate findings, and produce review-ready evidence for AI and algorithmic credit decisions.",
};

export const primaryNav = [
  ["Platform", "/#platform"],
  ["Methodology", "/methodology"],
  ["Trust", "/trust"],
];

export const officialReferences = [
  {
    name: "Equal Credit Opportunity Act, Regulation B",
    owner: "Consumer Financial Protection Bureau",
    href: "https://www.consumerfinance.gov/rules-policy/regulations/1002/",
    note: "Primary regulation, including notification requirements under § 1002.9.",
  },
  {
    name: "Supervisory Guidance on Model Risk Management (SR 11-7)",
    owner: "Federal Reserve and OCC",
    href: "https://www.federalreserve.gov/supervisionreg/srletters/sr1107a1.pdf",
    note: "Model development, validation, governance, policies, and controls.",
  },
  {
    name: "Interagency Guidance on Third-Party Relationships",
    owner: "Federal Reserve, FDIC, and OCC",
    href: "https://www.fdic.gov/news/press-releases/2023/pr23047.html",
    note: "Planning, due diligence, contracting, monitoring, and termination considerations.",
  },
  {
    name: "AI Risk Management Framework 1.0",
    owner: "NIST",
    href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10",
    note: "Voluntary framework organized around govern, map, measure, and manage.",
  },
];

export const faq = [
  [
    "Does Avarent replace our underwriting model?",
    "No. Avarent is designed as an evaluation and monitoring layer around decision outputs. A pilot does not require replacing a model or changing a credit policy.",
  ],
  [
    "Do we need to begin with production data?",
    "No. The first evaluation can use synthetic or de-identified data. Any move beyond that requires an agreed data-flow, field inventory, retention period, access model, and deletion procedure.",
  ],
  [
    "Does Avarent determine whether a lender is legally compliant?",
    "No. Avarent produces measurements, findings, and evidence for qualified human review. It is not legal advice, a regulator, or a substitute for independent model validation.",
  ],
  [
    "What can a reviewer inspect before a pilot?",
    "The methodology, metric definitions, limitations, sample output, proposed data flow, pilot boundaries, and security questionnaire responses can be reviewed before non-synthetic data is introduced.",
  ],
];
