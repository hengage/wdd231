/**
 * Weather Widget for Owerri Chamber of Commerce
 * Uses OpenWeatherMap API to display current weather and 3-day forecast
 */

// Weather configuration is loaded from config.js
// This keeps API keys separate from main logic

// Weather icon mapping from OpenWeatherMap to Font Awesome
const WEATHER_ICONS = {
  // Clear sky
  "01d": "fa-sun", // day
  "01n": "fa-moon", // night

  // Few clouds
  "02d": "fa-cloud-sun", // day
  "02n": "fa-cloud-moon", // night

  // Scattered clouds
  "03d": "fa-cloud",
  "03n": "fa-cloud",

  // Broken clouds
  "04d": "fa-cloud",
  "04n": "fa-cloud",

  // Shower rain
  "09d": "fa-cloud-showers-heavy",
  "09n": "fa-cloud-showers-heavy",

  // Rain
  "10d": "fa-cloud-sun-rain", // day
  "10n": "fa-cloud-moon-rain", // night

  // Thunderstorm
  "11d": "fa-bolt",
  "11n": "fa-bolt",

  // Snow
  "13d": "fa-snowflake",
  "13n": "fa-snowflake",

  // Mist
  "50d": "fa-smog",
  "50n": "fa-smog",
};

/**
 * Convert OpenWeatherMap icon code to Font Awesome class
 */
function getWeatherIcon(iconCode) {
  return WEATHER_ICONS[iconCode] || "fa-question";
}

/**
 * Format temperature with proper unit
 */
function formatTemperature(temp) {
  return `${Math.round(temp)}C`;
}

/**
 * Format date for forecast
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
}

/**
 * Update current weather display
 */
function updateCurrentWeather(weatherData) {
  const tempElement = document.querySelector(".temperature");
  const descElement = document.querySelector(".description");
  const iconElement = document.querySelector(".weather-icon i");

  if (tempElement) {
    tempElement.textContent = formatTemperature(weatherData.main.temp);
  }

  if (descElement) {
    descElement.textContent = weatherData.weather[0].description;
  }

  if (iconElement) {
    // Remove all existing weather icon classes
    iconElement.className =
      "fas " + getWeatherIcon(weatherData.weather[0].icon);
  }
}

/**
 * Update 3-day forecast display
 */
function updateForecast(forecastData) {
  const forecastContainer = document.querySelector(".weather-forecast");
  if (!forecastContainer) return;

  // Get one forecast per day (at noon)
  const dailyForecasts = [];
  const processedDates = new Set();

  for (const forecast of forecastData.list) {
    const date = new Date(forecast.dt * 1000);
    const dateStr = date.toDateString();

    if (!processedDates.has(dateStr) && date.getHours() >= 12) {
      dailyForecasts.push(forecast);
      processedDates.add(dateStr);

      if (dailyForecasts.length >= 3) break;
    }
  }

  // Update forecast cards
  const forecastCards = forecastContainer.querySelectorAll(".forecast-day");
  dailyForecasts.forEach((forecast, index) => {
    if (forecastCards[index]) {
      const dayElement = forecastCards[index].querySelector(".day");
      const iconElement = forecastCards[index].querySelector("i");
      const tempElement = forecastCards[index].querySelector(".temp");

      if (dayElement) {
        dayElement.textContent = formatDate(forecast.dt * 1000);
      }

      if (iconElement) {
        iconElement.className =
          "fas " + getWeatherIcon(forecast.weather[0].icon);
      }

      if (tempElement) {
        tempElement.textContent = formatTemperature(forecast.main.temp);
      }
    }
  });
}

/**
 * Show error message for weather widget
 */
function showWeatherError(message) {
  const tempElement = document.querySelector(".temperature");
  const descElement = document.querySelector(".description");

  if (tempElement) {
    tempElement.textContent = "--C";
  }

  if (descElement) {
    descElement.textContent = "Weather unavailable";
  }

  console.warn("Weather API Error:", message);
}

/**
 * Fetch weather data from OpenWeatherMap API
 */
async function fetchWeatherData() {
  try {
    // Current weather
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CONFIG.city},${WEATHER_CONFIG.country}&appid=${WEATHER_CONFIG.apiKey}&units=${WEATHER_CONFIG.units}&lang=${WEATHER_CONFIG.lang}`;
    const currentResponse = await fetch(currentUrl);

    if (!currentResponse.ok) {
      throw new Error(`Current weather API error: ${currentResponse.status}`);
    }

    const currentData = await currentResponse.json();
    updateCurrentWeather(currentData);

    // 5-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${WEATHER_CONFIG.city},${WEATHER_CONFIG.country}&appid=${WEATHER_CONFIG.apiKey}&units=${WEATHER_CONFIG.units}&lang=${WEATHER_CONFIG.lang}`;
    const forecastResponse = await fetch(forecastUrl);

    if (!forecastResponse.ok) {
      throw new Error(`Forecast API error: ${forecastResponse.status}`);
    }

    const forecastData = await forecastResponse.json();
    updateForecast(forecastData);
  } catch (error) {
    showWeatherError(error.message);
  }
}

/**
 * Initialize weather widget
 */
function initializeWeather() {
  // Only run weather widget on pages that have weather section
  if (!document.querySelector(".weather-section")) {
    return;
  }

  // Fetch weather data
  fetchWeatherData();

  // Update weather every 30 minutes
  setInterval(fetchWeatherData, 30 * 60 * 1000);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeWeather);

// Export for potential manual updates
window.weatherWidget = {
  refresh: fetchWeatherData,
  updateCurrent: updateCurrentWeather,
  updateForecast: updateForecast,
};
