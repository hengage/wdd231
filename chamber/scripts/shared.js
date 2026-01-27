/**
 * Shared Header and Footer Injection
 * Provides consistent header and footer across all chamber pages
 */

// Header HTML template
function getHeaderHTML() {
  return `
    <header>
      <div class="header-container">
        <div class="logo-section">
          <img
            src="images/favicon.png"
            alt="Owerri Chamber of Commerce"
            class="logo"
          />
          <span class="site-name">Owerri Chamber of Commerce</span>
        </div>

        <div class="nav-theme-container">
          <button id="menu-button" aria-label="Toggle Navigation">
            <i class="fas fa-bars"></i>
          </button>

          <nav>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="directory.html">Directory</a></li>
              <li><a href="join.html">Join</a></li>
              <li><a href="discover.html">Discover</a></li>
            </ul>
          </nav>

          <button class="theme-toggle" aria-label="Toggle dark mode">
            <i class="fas fa-moon"></i>
          </button>
        </div>
      </div>
    </header>
  `;
}

// Footer HTML template
function getFooterHTML() {
  return `
    <footer>
      <div class="footer-container">
        <div class="contact-info">
          <h2>Owerri Chamber of Commerce</h2>
          <p>123 Main Street</p>
          <p>Owerri, Nigeria 999</p>
          <p>info@owerrichamber.com</p>
          <p>(234) 123-456-7890</p>
        </div>

        <div class="social-links">
          <a href="https://youtube.com" target="_blank" aria-label="YouTube">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="https://twitter.com" target="_blank" aria-label="Twitter">
            <i class="fab fa-twitter"></i>
          </a>
          <a
            href="https://linkedin.com/in/henrychizoba"
            target="_blank"
            aria-label="LinkedIn"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </div>

        <div class="project-info">
          <p>WDD231 Class Project</p>
          <p>Henry Chizoba Udeh</p>
          <p>
            &copy; <span id="currentyear"></span> Owerri Chamber of Commerce
          </p>
          <p>Last Modification: <span id="last-modified"></span></p>
        </div>
      </div>
    </footer>
  `;
}

// Inject header into the page
function loadHeader() {
  const headerElement = document.querySelector("header");
  if (headerElement) {
    headerElement.innerHTML = getHeaderHTML();
  }
}

// Inject footer into the page
function loadFooter() {
  const footerElement = document.querySelector("footer");
  if (footerElement) {
    footerElement.innerHTML = getFooterHTML();
  }
}

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// Initialize shared components
function initializeShared() {
  loadHeader();
  loadFooter();
  setActiveNavLink();
}

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeShared);

// Export functions for use in other scripts
window.sharedComponents = {
  loadHeader,
  loadFooter,
  setActiveNavLink,
  initializeShared,
};
