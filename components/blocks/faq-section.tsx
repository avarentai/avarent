import { FAQ } from "@/components/ui/faq-tabs";

const categories = {
  product:    "The Product",
  analysis:   "Analysis & Data",
  access:     "Access & Fit",
};

const faqData = {
  product: [
    {
      question: "Does Avarent require direct access to our credit model?",
      answer:
        "No. Avarent works from decision-level outputs and logs — it does not require API access to the model itself, model weights, or the underlying scoring engine.",
    },
    {
      question: "Is this a determination of discrimination or compliance?",
      answer:
        "No. Avarent produces statistical analysis and structured documentation — it is not legal review, does not make compliance determinations, and its outputs do not constitute legal advice.",
    },
    {
      question: "What analyses are included?",
      answer:
        "Disparate impact analysis against the four-fifths rule. Proxy-risk variable flagging for compliance review. Adverse action reason-code validation against Reg B and CFPB Circular 2023-03. Drift monitoring across origination periods. Methodology documentation structured for MRM exam teams.",
    },
  ],
  analysis: [
    {
      question: "What data do you store?",
      answer:
        "Avarent stores decision-level and cohort-level records only. No raw applicant PII. No bureau data. No model weights.",
    },
    {
      question: "How does data get into Avarent?",
      answer:
        "Avarent supports batch file upload (CSV, Parquet, JSON), real-time event streaming via webhook or Kafka, and direct connectors for Snowflake, BigQuery, and Redshift.",
    },
    {
      question: "How does the analysis readiness score work?",
      answer:
        "Before any analysis runs, Avarent maps your ingested fields against the statistical tests in scope and flags which analyses are fully supported, partially supported, or blocked by missing data — so there are no surprises when presenting to leadership.",
    },
  ],
  access: [
    {
      question: "Who is Avarent built for?",
      answer:
        "Compliance officers, fair-lending counsel, and model risk teams at regional banks and fintechs running automated underwriting. Avarent is not designed for community banks doing manual review or mortgage-only lenders with existing HMDA infrastructure.",
    },
    {
      question: "Can we try it before committing?",
      answer:
        "Yes, via the pilot tier. The pilot provides access to the full analysis suite on a scoped data sample with a structured readout of findings. Access is available through the waitlist — book a call with the founder to get a pilot scoped.",
    },
    {
      question: "How quickly can we get up and running?",
      answer:
        "Most teams complete data ingestion and see initial analysis within one week. The pilot scoping call takes 30 minutes.",
    },
  ],
};

export function FAQSection() {
  return (
    <FAQ
      title="Frequently Asked Questions"
      subtitle="Got questions?"
      categories={categories}
      faqData={faqData}
      className="py-12 md:py-20"
    />
  );
}
