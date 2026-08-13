
const analyticsSessionKey = "avarent_analytics_session";
let analyticsSession = crypto.randomUUID();
try {
  analyticsSession = sessionStorage.getItem(analyticsSessionKey) || analyticsSession;
  sessionStorage.setItem(analyticsSessionKey, analyticsSession);
} catch {
  // Analytics remains anonymous and non-blocking when storage is unavailable.
}

const capture = (event, properties = {}) => {
  const payload = JSON.stringify({
    event,
    distinct_id: analyticsSession,
    properties: { page: location.pathname, ...properties },
  });
  fetch("/api/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
};

capture("site page viewed");

for (const link of document.querySelectorAll("[data-conversion-cta]")) {
  link.addEventListener("click", () => capture("primary cta clicked", {
    placement: link.closest("header") ? "header" : link.closest("form") ? "form" : link.closest(".page-hero") ? "page hero" : link.closest(".hero") ? "home hero" : "page body",
    label: link.dataset.ctaLabel || link.textContent.trim().slice(0, 60),
    destination: link.getAttribute("href") || "form submit",
  }));
}

for (const link of document.querySelectorAll('a[href="/sample-evidence-packet.pdf"], [data-sample-packet]')) {
  link.addEventListener("click", () => capture("sample packet opened", {
    placement: link.closest("footer") ? "footer" : link.closest(".page-hero") ? "page hero" : link.closest(".hero") ? "home hero" : "page body",
  }));
}

const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    mobileNav.dataset.open = String(!open);
  });
}

const fallbackEmail = "sales@avarent.app";

for (const form of document.querySelectorAll("[data-contact-form]")) {
  let started = false;
  form.addEventListener("focusin", () => {
    if (started) return;
    started = true;
    capture("evaluation form started", { form: form.querySelector('[name="source"]')?.value || "website" });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    const button = form.querySelector('button[type="submit"]');
    const label = form.querySelector("[data-submit-label]");
    const data = Object.fromEntries(new FormData(form).entries());
    button.disabled = true;
    label.textContent = "Sending…";
    status.textContent = "";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send");
      form.reset();
      status.textContent = "Received. A founder will reply directly.";
      label.textContent = "Request received";
      capture("evaluation form submitted", { form: data.source || "website" });
    } catch {
      const subject = encodeURIComponent(`Avarent evaluation request from ${data.institution || data.name || "website"}`);
      const body = encodeURIComponent(`Work email: ${data.email || ""}\nInstitution: ${data.institution || ""}\n\nEvaluation question:\n${data.message || ""}`);
      status.innerHTML = `The secure form is temporarily unavailable. <a href="mailto:${fallbackEmail}?subject=${subject}&body=${body}">Send this request by email instead</a>.`;
      button.disabled = false;
      label.textContent = "Try again";
      capture("evaluation form fallback shown", { form: data.source || "website" });
    }
  });
}
