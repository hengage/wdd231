/**
 * Join Page Functionality
 * Handles form timestamp and dialog modal functionality
 */

// Set timestamp when page loads
function setTimestamp() {
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    const now = new Date();
    timestampField.value = now.toISOString();
  }
}

// Dialog modal functionality using HTML <dialog> element
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal && modal.showModal) {
    modal.showModal();
  }
}

// Initialize join page
document.addEventListener("DOMContentLoaded", function () {
  setTimestamp();

  // Add click event listeners to card links
  const cardLinks = document.querySelectorAll(".card-link");
  cardLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("href").substring(1); // Remove # from href
      openModal(modalId);
    });
  });
});

// Export for use in other scripts
window.joinPage = {
  setTimestamp,
  openModal,
};
