const wordSelect = document.querySelector("#germanWord");

/**
 * Loads vocabulary data and returns parsed JSON.
 * @returns {Promise<Array<{german: string, english: string}>>}
 */
const getVocabulary = async () => {
  const response = await fetch("data/vocabulary.json");
  if (!response.ok) {
    throw new Error(`Failed to load vocabulary: ${response.status}`);
  }
  return response.json();
};

/**
 * Populates the quiz dropdown with German words.
 * @param {Array<{german: string, english: string}>} words
 * @returns {void}
 */
const populateWordOptions = (words) => {
  if (!wordSelect) {
    return;
  }

  const options = words
    .map((word) => `<option value="${word.german}">${word.german}</option>`)
    .join("");

  wordSelect.insertAdjacentHTML("beforeend", options);
};

/**
 * Initializes quiz page data.
 * @returns {Promise<void>}
 */
const init = async () => {
  try {
    const words = await getVocabulary();
    populateWordOptions(words);
  } catch (error) {
    console.error("Quiz setup failed:", error);
  }
};

init();
