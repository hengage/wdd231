/**
 * Discover Page JavaScript
 * Handles visitor welcome message and attraction cards display
 */

import { discoverData } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", function () {
  displayWelcomeMessage();
  displayAttractionCards();
});

/**
 * Display welcome message based on visitor's last visit
 */
function displayWelcomeMessage() {
  const welcomeElement = document.getElementById("welcome-message");
  if (!welcomeElement) return;

  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");

  let message = "";

  if (!lastVisit) {
    // First time visitor
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitTime = parseInt(lastVisit);
    const daysSinceLastVisit = Math.floor(
      (now - lastVisitTime) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastVisit < 1) {
      message = "Back so soon! Awesome!";
    } else {
      const dayText = daysSinceLastVisit === 1 ? "day" : "days";
      message = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
    }
  }

  // Update the welcome message
  welcomeElement.innerHTML = `<p>${message}</p>`;

  // Store current visit time
  localStorage.setItem("lastVisit", now.toString());
}

/**
 * Display attraction cards using data from discover.mjs
 */
function displayAttractionCards() {
  const container = document.querySelector(".discover-grid");
  if (!container) return;

  // Clear existing content
  container.innerHTML = "";

  // Create cards for each attraction
  discoverData.forEach((attraction) => {
    const card = document.createElement("div");
    card.className = "discover-card";

    card.innerHTML = `
      <h2>${attraction.name}</h2>
      <figure>
        <img src="${attraction.imageUrl}" alt="${attraction.name}" loading="lazy">
        <figcaption>${attraction.name}</figcaption>
      </figure>
      <address>${attraction.address}</address>
      <p>${attraction.description}</p>
      <a href="#" class="discover-link">Learn More</a>
    `;

    container.appendChild(card);
  });
}
