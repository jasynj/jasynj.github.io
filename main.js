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
