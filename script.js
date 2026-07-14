// DOM ELEMENTS
const temperatureUnit = document.getElementById("temperature-unit");
const cityInput = document.getElementById("city-input");
const searchForm = document.getElementById("search-form");
const API_KEY = "edb3721d7d9effa79aab31f4b5261605";

// CURRENT WEATHER
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weather-condition");
const locationElement = document.getElementById("location");
const dateElement = document.getElementById("date");
const highTemp = document.getElementById("high-temp");
const lowTemp = document.getElementById("low-temp");
const weatherIcon = document.getElementById("weather-icon");

//WEATHER DETAILS
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const precipitation = document.getElementById("precipitation");

// CONTAINERS
const dailyForecastContainer = document.getElementById("daily-forecast-body");
const hourlyForecastContainer = document.getElementById("hourly-container");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); //prevents the default behaviour of browser of auto refresh

  const city = cityInput.value.trim();

  if (city === "") {
    alert("Enter city");
    return;
  }
  getWeather(city);

  //   console.log(event);
});
async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    //   console.log(data);

    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    weatherCondition.textContent = `${data.weather[0].main}`;

    humidity.textContent = `${data.main.humidity}%`;

    windSpeed.textContent = `${data.wind.speed} km/h`;

    locationElement.textContent = data.name;

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    highTemp.textContent = `H : ${Math.round(data.main.temp_max)}°C`;

    lowTemp.textContent = `L : ${Math.round(data.main.temp_min)}°C`;

    precipitation.textContent = "--";

    const icons = {
      Clear: "fa-sun",
      Clouds: "fa-cloud",
      Rain: "fa-cloud-rain",
      Snow: "fa-snowflake",
    };

    let condition = data.weather[0].main;

    weatherIcon.innerHTML = `<i class="fa-solid ${icons[condition] || "fa-cloud-sun"}"></i>`;

    cityInput.value = "";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch weather. Please check your internet connection.");
  }
}
