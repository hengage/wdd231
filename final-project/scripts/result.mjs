const resultWord = document.querySelector("#result-word");
const resultAnswer = document.querySelector("#result-answer");
const resultCorrect = document.querySelector("#result-correct");
const resultStatus = document.querySelector("#result-status");
const resultBanner = document.querySelector("#result-banner");

/**
 * Normalizes text for comparison.
 * @param {string} value
 * @returns {string}
 */
const normalize = (value) => value.toLowerCase().trim();

/**
 * Reads submitted query parameters from the URL.
 * @returns {{germanWord: string, userMeaning: string}}
 */
const getSubmission = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    germanWord: params.get("germanWord") ?? "",
    userMeaning: params.get("userMeaning") ?? "",
  };
};

/**
 * Loads vocabulary data from JSON.
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
 * Renders the quiz result to the page.
 * @param {{germanWord: string, userMeaning: string}} submission
 * @param {string} correctMeaning
 * @returns {void}
 */
const renderResult = (submission, correctMeaning) => {
  if (!resultWord || !resultAnswer || !resultCorrect || !resultStatus || !resultBanner) {
    return;
  }

  resultStatus.classList.remove("status-correct", "status-wrong", "status-neutral");
  resultBanner.classList.remove("status-correct", "status-wrong", "status-neutral");
  resultWord.textContent = submission.germanWord || "Not provided";
  resultAnswer.textContent = submission.userMeaning || "Not provided";
  resultCorrect.textContent = correctMeaning || "Unknown word";

  if (!submission.germanWord || !submission.userMeaning || !correctMeaning) {
    resultStatus.textContent = "Incomplete submission.";
    resultBanner.textContent = "Incomplete Submission";
    resultStatus.classList.add("status-neutral");
    resultBanner.classList.add("status-neutral");
    return;
  }

  const isCorrect = normalize(submission.userMeaning) === normalize(correctMeaning);
  resultStatus.textContent = isCorrect ? "Correct" : "Try again";
  resultBanner.textContent = isCorrect ? "Correct Answer" : "Wrong Answer";
  resultStatus.classList.add(isCorrect ? "status-correct" : "status-wrong");
  resultBanner.classList.add(isCorrect ? "status-correct" : "status-wrong");
};

/**
 * Initializes result page by reading submission and matching correct meaning.
 * @returns {Promise<void>}
 */
const init = async () => {
  const submission = getSubmission();

  try {
    const words = await getVocabulary();
    const matched = words.find((word) => word.german === submission.germanWord);
    renderResult(submission, matched?.english ?? "");
  } catch (error) {
    console.error("Result page failed:", error);
    renderResult(submission, "");
  }
};

init();
