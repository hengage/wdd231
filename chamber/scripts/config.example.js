/**
 * Configuration file template for API keys
 * Copy this to config.js and add your actual API keys
 * This file (config.js) should NOT be committed to version control
 */

// OpenWeatherMap API configuration
const WEATHER_CONFIG = {
  apiKey: "your_openweather_api_key_here",
  city: "Owerri",
  country: "NG",
  units: "metric", // Use Celsius
  lang: "en",
};

// Export for use in other scripts
window.WEATHER_CONFIG = WEATHER_CONFIG;
