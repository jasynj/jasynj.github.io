document.addEventListener("DOMContentLoaded", () => {
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
