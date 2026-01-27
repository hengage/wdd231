/**
 * Company Spotlights for Chamber Home Page
 * Loads member data and displays random gold/silver members
 */

/**
 * Create spotlight card HTML for a member
 */
function createSpotlightCard(member) {
  const card = document.createElement("div");
  card.className = "spotlight-card";

  const membershipLevel =
    member.membershipLevel === 3
      ? "gold"
      : member.membershipLevel === 2
      ? "silver"
      : "member";

  const imageUrl = `https://picsum.photos/seed/${member.name.replace(
    /\s+/g,
    ""
  )}/300/200.jpg`;

  card.innerHTML = `
    <img src="${imageUrl}" alt="${member.name}" loading="lazy">
    <div class="spotlight-info">
      <h3>${member.name}</h3>
      <span class="membership-level ${membershipLevel}">${membershipLevel.toUpperCase()}</span>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${
        member.website
      }" target="_blank">${member.website}</a></p>
      <p><strong>Description:</strong> ${member.description}</p>
    </div>
  `;

  return card;
}

/**
 * Get random spotlights from member list (gold and silver only)
 */
function getRandomSpotlights(members, count = 3) {
  // Filter for gold and silver members only
  const premiumMembers = members.filter(
    (member) => member.membershipLevel === 3 || member.membershipLevel === 2
  );

  // Shuffle and take random members
  const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Display spotlights in the container
 */
function displaySpotlights(members) {
  const container = document.querySelector(".spotlights-container");
  if (!container) return;

  // Clear loading message
  container.innerHTML = "";

  // Get random spotlights
  const spotlights = getRandomSpotlights(members, 3);

  if (spotlights.length === 0) {
    container.innerHTML =
      '<p class="loading-message">No premium members available</p>';
    return;
  }

  // Create and append spotlight cards
  spotlights.forEach((member) => {
    const card = createSpotlightCard(member);
    container.appendChild(card);
  });
}

/**
 * Show error message for spotlights
 */
function showSpotlightsError(message) {
  const container = document.querySelector(".spotlights-container");
  if (container) {
    container.innerHTML = `<p class="loading-message">Unable to load member spotlights</p>`;
  }
  console.warn("Spotlights Error:", message);
}

/**
 * Load member data and display spotlights
 */
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Failed to load members: ${response.status}`);
    }

    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    showSpotlightsError(error.message);
  }
}

/**
 * Initialize spotlights when DOM is ready
 */
function initializeSpotlights() {
  // Only run on pages that have spotlights section
  if (!document.querySelector(".spotlights-section")) {
    return;
  }

  // Load spotlights
  loadSpotlights();
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeSpotlights);

// Export for potential manual updates
window.spotlightsWidget = {
  refresh: loadSpotlights,
  display: displaySpotlights,
};
