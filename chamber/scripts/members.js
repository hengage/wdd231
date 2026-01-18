// Directory functionality
document.addEventListener("DOMContentLoaded", function () {
  const membersContainer = document.getElementById("members-container");
  const listViewBtn = document.getElementById("list-view");
  const gridViewBtn = document.getElementById("grid-view");

  // Load members from JSON
  async function loadMembers() {
    try {
      const response = await fetch("data/members.json");
      const members = await response.json();
      window.currentMembers = members;
      displayMembers(members);
    } catch (error) {
      console.error("Error loading members:", error);
      membersContainer.innerHTML =
        "<p>Error loading members. Please try again later.</p>";
    }
  }

  // Display members based on current view
  function displayMembers(members) {
    const isGridView = membersContainer.classList.contains("grid-view");

    membersContainer.innerHTML = "";

    members.forEach((member) => {
      const memberCard = createMemberCard(member, isGridView);
      membersContainer.appendChild(memberCard);
    });
  }

  // Create member card element
  function createMemberCard(member, isGridView) {
    const card = document.createElement("div");
    card.className = "member-card";

    const membershipLevel =
      member.membershipLevel === 3
        ? "gold"
        : member.membershipLevel === 2
        ? "silver"
        : "member";

    if (isGridView) {
      // Grid view - compact card
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <span class="membership-level ${membershipLevel}">${membershipLevel.toUpperCase()}</span>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${
          member.website
        }" target="_blank">${member.website}</a></p>
      `;
    } else {
      // List view - detailed card
      card.innerHTML = `
        <h3>${member.name}</h3>
        <span class="membership-level ${membershipLevel}">${membershipLevel.toUpperCase()}</span>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${
          member.website
        }" target="_blank">${member.website}</a></p>
        <p><strong>Description:</strong> ${member.description}</p>
      `;
    }

    return card;
  }

  // View toggle functionality
  listViewBtn.addEventListener("click", () => {
    membersContainer.classList.remove("grid-view");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
    displayMembers(window.currentMembers);
  });

  gridViewBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
    displayMembers(window.currentMembers);
  });

  // Initialize
  loadMembers();
});
