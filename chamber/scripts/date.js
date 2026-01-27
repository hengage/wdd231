/**
 * Date functionality for chamber pages
 * Updates current year and last modified date
 */
function updateDates() {
  const currentYearElement = document.getElementById("currentyear");
  const lastModifiedElement = document.getElementById("last-modified");

  if (currentYearElement) {
    currentYearElement.innerHTML = new Date().getFullYear();
  }

  if (lastModifiedElement) {
    lastModifiedElement.innerHTML = document.lastModified;
  }
}

// Wait for DOM to be ready and for shared.js to inject content
document.addEventListener("DOMContentLoaded", function () {
  // Small delay to ensure shared.js has injected the footer
  setTimeout(updateDates, 100);
});

// Also update dates when shared components are loaded
if (window.sharedComponents) {
  const originalInitialize = window.sharedComponents.initializeShared;
  window.sharedComponents.initializeShared = function () {
    originalInitialize();
    setTimeout(updateDates, 50);
  };
}
