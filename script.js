const searchbtn = document.getElementById('searchbtn');
const inputBox = document.querySelector('.input-box');

const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.getElementById('weather-body');
const weather_img = document.getElementById('weather-img');

const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

function getWeatherIcon(desc) {
  const d = desc.toLowerCase();
  if (d.includes("clear")) return "clear.png";
  if (d.includes("overcastcloud")) return "overcastcloud.png";
  if (d.includes("cloud")) return "cloud.png";
  if (d.includes("rain")) return "rainy.png";
  if (d.includes("snow") || d.includes("thunder")) return "snow.png";
  return "default.png";
}

async function checkweather(city) {
  const api_key = "bd2764c7b31f08171b2c0fda644915eb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(url);
    const weather_data = await response.json();

    if (weather_data.cod === "404") {
      locationNotFound.style.display = "flex";
      weatherBody.style.display = "none";
      return;
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";

    const temp = Math.round(weather_data.main.temp);
    const desc = weather_data.weather[0].description;

    temperature.innerHTML = `${temp}<sup>°C</sup>`;
    description.innerHTML = desc;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;

    const imageName = getWeatherIcon(desc.replace(/\s/g, ""));
    weather_img.src = `image/${imageName}`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


searchbtn.addEventListener('click', () => {
  const city = inputBox.value.trim();
  if (city !== "") {
    checkweather(city);
  }
});
