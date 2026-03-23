document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            try {
                const res = await fetch(contactForm.action, {
                    method: "POST",
                    body: data,
                    headers: { Accept: "application/json" },
                });
                if (res.ok) {
                    contactForm.innerHTML =
                        '<p class="form-success">Thanks for reaching out! I\'ll get back to you soon.</p>';
                } else {
                    contactForm.innerHTML =
                        '<p class="form-error">Something went wrong. Please try emailing me directly.</p>';
                }
            } catch {
                contactForm.innerHTML =
                    '<p class="form-error">Something went wrong. Please try emailing me directly.</p>';
            }
        });
    }

    const tabButtons = document.querySelectorAll(".experience-tab");
    const tabPanels = document.querySelectorAll(".experience-panel");

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const tabName = button.getAttribute("data-tab");

            tabButtons.forEach((btn) => btn.classList.remove("is-active"));
            button.classList.add("is-active");

            tabPanels.forEach((panel) => {
                const panelName = panel.getAttribute("data-tab-panel");
                if (panelName === tabName) {
                    panel.classList.add("is-active");
                } else {
                    panel.classList.remove("is-active");
                }
            });
        });
    });
});

const modalTriggers = document.querySelectorAll(".experience-more");
const modals = document.querySelectorAll(".experience-modal");

modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const targetId = trigger.getAttribute("data-modal-target");
        const modal = document.getElementById(targetId);
        if (modal) {
            modal.classList.add("is-open");
            // document.body.classList.add("modal-open");
        }
    });
});

modals.forEach((modal) => {
    const closeBtn = modal.querySelector(".experience-modal-close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("is-open");
            // document.body.classList.remove("modal-open");
        });
    }

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("is-open");
            // document.body.classList.remove("modal-open");
        }
    });
});

// Lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = '<img class="lightbox-img" /><button class="lightbox-close" aria-label="Close">✕</button>';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox-img");

document.addEventListener("click", (e) => {
    if (e.target.matches(".modal-media-img")) {
        lightboxImg.src = e.target.src;
        lightboxImg.alt = e.target.alt;
        lightbox.classList.add("is-open");
    }
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.matches(".lightbox-close")) {
        lightbox.classList.remove("is-open");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox.classList.remove("is-open");
});
