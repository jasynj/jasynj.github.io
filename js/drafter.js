// "Your move": helps a visitor draft an email to Jason from a template.
// Nothing is sent from the page; the visitor sends it from their own mail client.

const TO = "jasoncj.dev@gmail.com";

const INTENTS = {
  hiring: {
    fields: {
      org: { label: "Company", placeholder: "e.g. Meta" },
      detail: { label: "Role or team", placeholder: "e.g. New Grad SWE 2027, Payments" },
    },
    subject: ({ org, detail }) =>
      detail && org ? `${detail} at ${org}` : org ? `Opportunity at ${org}` : detail ? `${detail} opportunity` : "Software engineering opportunity",
    body: ({ name, org, detail }) =>
      `Hi Jason,\n\nI'm ${name}${org ? ` from ${org}` : ""}. I came across your portfolio and would like to talk with you about ${detail ? `the ${detail} role` : "a software engineering role"
      }${org ? ` at ${org}` : ""}.\n\nWould you be open to a quick call this week or next? Let me know what times work for you.\n\nBest,\n${name}`,
  },
  project: {
    fields: {
      org: { label: "Business or organization", placeholder: "e.g. Craig Events" },
      detail: { label: "What you want built", placeholder: "e.g. a booking site for my studio" },
    },
    subject: ({ detail, org }) => (detail ? `Project inquiry: ${detail}` : org ? `Project inquiry from ${org}` : "Project inquiry"),
    body: ({ name, org, detail }) =>
      `Hi Jason,\n\nI'm ${name}${org ? ` with ${org}` : ""}. I saw your client work and I'm looking for help with ${detail || "a project"
      }.\n\nCould we set up a time to talk about scope, timeline, and budget?\n\nThanks,\n${name}`,
  },
  collab: {
    fields: {
      detail: { label: "Topic", placeholder: "e.g. your RAG pipeline in Reminisce" },
    },
    subject: ({ detail }) => (detail ? `Talking about ${detail}` : "Let's talk tech"),
    body: ({ name, detail }) =>
      `Hi Jason,\n\nI'm ${name}. I was looking through your projects and wanted to reach out about ${detail || "what you're building"
      }.\n\nWould love to swap notes sometime.\n\nCheers,\n${name}`,
  },
  hello: {
    fields: {},
    subject: ({ name }) => `Hello from ${name}`,
    body: ({ name }) => `Hi Jason,\n\nJust wanted to say hi and that I enjoyed your portfolio.\n\nBest,\n${name}`,
  },
};

export function initDrafter(root) {
  if (!root) return;
  const form = root.querySelector("form");
  const intentInputs = [...form.querySelectorAll("input[name='intent']")];
  const nameInput = form.elements.name;
  const orgField = form.querySelector("[data-field='org']");
  const detailField = form.querySelector("[data-field='detail']");
  const preview = {
    subject: root.querySelector("[data-preview='subject']"),
    body: root.querySelector("[data-preview='body']"),
  };
  const actions = {
    mailto: root.querySelector("[data-send='mailto']"),
    gmail: root.querySelector("[data-send='gmail']"),
    outlook: root.querySelector("[data-send='outlook']"),
    copy: root.querySelector("[data-send='copy']"),
  };
  const status = root.querySelector("[data-status]");

  const currentIntent = () => INTENTS[intentInputs.find((i) => i.checked)?.value || "hiring"];

  function configureFields(intent) {
    for (const [key, field] of [["org", orgField], ["detail", detailField]]) {
      const spec = intent.fields[key];
      field.hidden = !spec;
      if (!spec) continue;
      field.querySelector("label").textContent = spec.label;
      field.querySelector("input").placeholder = spec.placeholder;
    }
  }

  function draft() {
    const intent = currentIntent();
    const values = {
      name: nameInput.value.trim(),
      org: orgField.hidden ? "" : form.elements.org.value.trim(),
      detail: detailField.hidden ? "" : form.elements.detail.value.trim(),
    };
    const ready = Boolean(values.name);
    const shown = { ...values, name: values.name || "[your name]" };
    return { ready, subject: intent.subject(shown), body: intent.body(shown) };
  }

  function update() {
    const { ready, subject, body } = draft();
    preview.subject.textContent = subject;
    preview.body.textContent = body;

    const s = encodeURIComponent(subject);
    const b = encodeURIComponent(body);
    actions.mailto.href = `mailto:${TO}?subject=${s}&body=${b}`;
    actions.gmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${TO}&su=${s}&body=${b}`;
    actions.outlook.href = `https://outlook.office.com/mail/deeplink/compose?to=${TO}&subject=${s}&body=${b}`;

    root.classList.toggle("is-ready", ready);
    for (const el of Object.values(actions)) el.setAttribute("aria-disabled", String(!ready));
  }

  function guard(e) {
    if (draft().ready) return;
    e.preventDefault();
    status.textContent = "Add your name first. It signs the email.";
    nameInput.focus();
  }

  intentInputs.forEach((input) =>
    input.addEventListener("change", () => {
      configureFields(currentIntent());
      update();
    })
  );
  form.addEventListener("input", update);
  form.addEventListener("submit", (e) => e.preventDefault());

  for (const key of ["mailto", "gmail", "outlook"]) {
    actions[key].addEventListener("click", (e) => {
      guard(e);
      if (!e.defaultPrevented) status.textContent = "Opening your email… If nothing opens, copy the draft instead.";
    });
  }

  actions.copy.addEventListener("click", async (e) => {
    guard(e);
    if (e.defaultPrevented) return;
    const { subject, body } = draft();
    const text = `To: ${TO}\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = `Copied. Paste it into a new email to ${TO}.`;
    } catch {
      status.textContent = `Couldn't reach the clipboard. Select the preview text and copy it, then send to ${TO}.`;
    }
  });

  configureFields(currentIntent());
  update();
}
