const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

if (menuButton && primaryNav) {
  const desktopQuery = window.matchMedia("(min-width: 681px)");

  /**
   * Syncs nav visibility and expanded state for mobile/desktop breakpoints.
   * @returns {void}
   */
  const syncNavState = () => {
    if (desktopQuery.matches) {
      primaryNav.dataset.open = "true";
      menuButton.setAttribute("aria-expanded", "true");
      return;
    }

    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    primaryNav.dataset.open = isOpen ? "true" : "false";
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    syncNavState();
  });

  desktopQuery.addEventListener("change", syncNavState);
  syncNavState();
}

const pageMap = {
  "index.html": "home",
  "": "home",
  "vocabulary.html": "vocabulary",
  "resources.html": "resources",
};

const currentPage = window.location.pathname.split("/").pop();
const currentKey = pageMap[currentPage];

/**
 * Marks the matching nav link with aria-current for wayfinding.
 * @param {string} key
 * @returns {void}
 */
const setActiveNavLink = (key) => {
  if (!key) {
    return;
  }

  const activeLink = document.querySelector(`a[data-page="${key}"]`);
  if (activeLink) {
    activeLink.setAttribute("aria-current", "page");
  }
};

setActiveNavLink(currentKey);
