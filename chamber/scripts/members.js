// Directory functionality
document.addEventListener("DOMContentLoaded", function () {
  const membersContainer = document.getElementById("members-container");
  const listViewBtn = document.getElementById("list-view");
  const gridViewBtn = document.getElementById("grid-view");

  membersContainer.classList.add("list-view");

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
    membersContainer.innerHTML = "";

    members.forEach((member) => {
      const memberCard = createMemberCard(member);
      membersContainer.appendChild(memberCard);
    });
  }

  // Create member card element
  function createMemberCard(member) {
    const card = document.createElement("div");
    card.className = "member-card";

    const membershipLevel =
      member.membershipLevel === 3
        ? "gold"
        : member.membershipLevel === 2
        ? "silver"
        : "member";

    // Generate unique image for each member using picsum.photos
    const imageUrl = `https://picsum.photos/seed/${member.name.replace(
      /\s+/g,
      ""
    )}/300/200.jpg`;

    card.innerHTML = `
      <img src="${imageUrl}" alt="${member.name}" loading="lazy">
      <div class="member-details">
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

  // View toggle functionality
  listViewBtn.addEventListener("click", () => {
    membersContainer.classList.remove("grid-view");
    membersContainer.classList.add("list-view");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  });

  gridViewBtn.addEventListener("click", () => {
    membersContainer.classList.remove("list-view");
    membersContainer.classList.add("grid-view");
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  });

  // Initialize
  loadMembers();
});
