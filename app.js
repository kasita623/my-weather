function formatTime(time) {
  let hour = time.getHours();
  let minute = time.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function formatDate(time) {
  let date = time.getDate();
  let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let month = months[now.getMonth()];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return `today, ${day} ${date}/${month}`;
}

let now = new Date();
let currentHour = document.querySelector("#current-hour");
currentHour.innerHTML = formatTime(now);
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let description = response.data.weather[0].main;

  let showTemperature = document.querySelector("#temperature-number");
  showTemperature.innerHTML = `${temperature}`;
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `${windSpeed}`;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;
  let showMaxTemp = document.querySelector("#max-temp");
  showMaxTemp.innerHTML = `${maxTemp}`;
  let showMinTemp = document.querySelector("#min-temp");
  showMinTemp.innerHTML = `${minTemp}`;
  let showDescription = document.querySelector("#weather-description");
  showDescription.innerHTML = `${description}`;
  let showCity = document.querySelector("#city");
  showCity.innerHTML = `${cityName}`;
  let icon = document.querySelector("#sun");
  icon.innerHTML = null;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputPassword5");
  let city = searchInput.value;
  let units = "metric";
  let apiKey = "940cab7f2dffe0039b455473a663a1f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity);

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "metric";
  let apiKey = "940cab7f2dffe0039b455473a663a1f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentWeatherButton = document.querySelector("#current-weather-button");
currentWeatherButton.addEventListener("click", showCurrentWeather);
