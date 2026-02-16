const SEARCH_KEY = "german_basics_search";
const CATEGORY_KEY = "german_basics_category";

const searchInput = document.querySelector("#search-word");
const categorySelect = document.querySelector("#category-filter");
const clearButton = document.querySelector("#clear-filters");
const listContainer = document.querySelector("#vocabulary-list");
const resultCount = document.querySelector("#result-count");
const modal = document.querySelector("#word-modal");
const closeModalButton = document.querySelector("#close-modal");

const modalWord = document.querySelector("#modal-word");
const modalMeaning = document.querySelector("#modal-meaning");
const modalCategory = document.querySelector("#modal-category");
const modalLevel = document.querySelector("#modal-level");
const modalExample = document.querySelector("#modal-example");

let allWords = [];

/**
 * Normalizes text input for case-insensitive matching.
 * @param {string} value
 * @returns {string}
 */
const normalize = (value) => value.toLowerCase().trim();

/**
 * Reads current UI filter values.
 * @returns {{search: string, category: string}}
 */
const getFilters = () => ({
  search: searchInput?.value ?? "",
  category: categorySelect?.value ?? "all",
});

/**
 * Persists the active filter values in localStorage.
 * @returns {void}
 */
const setStoredFilters = () => {
  if (!searchInput || !categorySelect) {
    return;
  }

  localStorage.setItem(SEARCH_KEY, searchInput.value);
  localStorage.setItem(CATEGORY_KEY, categorySelect.value);
};

/**
 * Loads saved filter values from localStorage.
 * @returns {void}
 */
const loadStoredFilters = () => {
  if (!searchInput || !categorySelect) {
    return;
  }

  const storedSearch = localStorage.getItem(SEARCH_KEY);
  const storedCategory = localStorage.getItem(CATEGORY_KEY);

  if (storedSearch) {
    searchInput.value = storedSearch;
  }

  if (storedCategory) {
    categorySelect.value = storedCategory;
  }
};

/**
 * Renders result count text.
 * @param {number} count
 * @returns {void}
 */
const renderCount = (count) => {
  if (resultCount) {
    resultCount.textContent = `${count} word${count === 1 ? "" : "s"} found`;
  }
};

/**
 * @typedef {Object} Word
 * @property {number} id
 * @property {string} german
 * @property {string} english
 * @property {string} category
 * @property {string} level
 * @property {string} example
 */

/**
 * Renders the vocabulary cards.
 * @param {Word[]} words
 * @returns {void}
 */
const renderWords = (words) => {
  if (!listContainer) {
    return;
  }

  if (!words.length) {
    listContainer.innerHTML = "<p>No matching words found.</p>";
    renderCount(0);
    return;
  }

  const cards = words
    .map(
      (word) => `
      <article class="word-card">
        <h2>${word.german}</h2>
        <p><strong>English:</strong> ${word.english}</p>
        <p><strong>Category:</strong> ${word.category}</p>
        <p><strong>Level:</strong> ${word.level}</p>
        <p><strong>Example:</strong> ${word.example}</p>
        <button type="button" class="open-modal" data-id="${word.id}">
          View details
        </button>
      </article>
    `
    )
    .join("");

  listContainer.innerHTML = cards;
  renderCount(words.length);
};

/**
 * Applies search/category filters and re-renders the list.
 * @returns {void}
 */
const applyFilters = () => {
  const { search, category } = getFilters();
  const q = normalize(search);

  const filtered = allWords.filter((word) => {
    const matchesSearch =
      !q ||
      normalize(word.german).includes(q) ||
      normalize(word.english).includes(q) ||
      normalize(word.example).includes(q);
    const matchesCategory = category === "all" || word.category === category;
    return matchesSearch && matchesCategory;
  });

  renderWords(filtered);
  setStoredFilters();
};

/**
 * Opens the detail dialog for a selected word.
 * @param {string | number | undefined} id
 * @returns {void}
 */
const openModal = (id) => {
  if (!modal) {
    return;
  }

  const selected = allWords.find((word) => String(word.id) === String(id));
  if (!selected) {
    return;
  }

  modalWord.textContent = selected.german;
  modalMeaning.textContent = selected.english;
  modalCategory.textContent = selected.category;
  modalLevel.textContent = selected.level;
  modalExample.textContent = selected.example;
  modal.showModal();
};

/**
 * Populates category filter options from vocabulary data.
 * @returns {void}
 */
const setupCategoryOptions = () => {
  if (!categorySelect) {
    return;
  }

  const categories = [...new Set(allWords.map((word) => word.category))];
  const options = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");

  categorySelect.insertAdjacentHTML("beforeend", options);
};

/**
 * Attaches DOM event handlers for filter and modal interactions.
 * @returns {void}
 */
const setupEvents = () => {
  searchInput?.addEventListener("input", applyFilters);
  categorySelect?.addEventListener("change", applyFilters);

  clearButton?.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
    }
    if (categorySelect) {
      categorySelect.value = "all";
    }
    applyFilters();
  });

  listContainer?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.matches(".open-modal")) {
      openModal(target.dataset.id);
    }
  });

  closeModalButton?.addEventListener("click", () => {
    modal?.close();
  });
};

/**
 * Renders fallback content if data loading fails.
 * @returns {void}
 */
const renderLoadError = () => {
  if (!listContainer) {
    return;
  }

  listContainer.innerHTML =
    "<p>We could not load vocabulary right now. Please refresh the page.</p>";
  renderCount(0);
};

/**
 * Initializes page data and interaction wiring.
 * @returns {Promise<void>}
 */
const init = async () => {
  try {
    const response = await fetch("data/vocabulary.json");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    allWords = await response.json();
    setupCategoryOptions();
    loadStoredFilters();
    setupEvents();
    applyFilters();
  } catch (error) {
    console.error("Vocabulary load failed:", error);
    renderLoadError();
  }
};

init();
