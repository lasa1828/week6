function showCurrentTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${currentTemperature}`;
}
function showHumidity(response) {
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
}

function findCity(event) {
  event.preventDefault();
  let apiKey = "c5e1f4b02577647cb3da3a656eabc850";
  let units = "metric";
  let cityInput = document.querySelector("#city-search");
  let cityDisplay = document.querySelector("#city");
  let city = cityInput.value;
  city.toLowerCase();
  cityDisplay.innerHTML = `${city}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
  axios.get(apiUrl).then(showHumidity);
}

function showCityFromGeolocation(response) {
  let city = response.data.name;
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
}

function showPosition(position) {
  let apiKey = "c5e1f4b02577647cb3da3a656eabc850";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityFromGeolocation);
}

function displayTemperatureInCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = 10;
}

function displayTemperatureInFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = 10;
}
navigator.geolocation.getCurrentPosition(showPosition);
let form = document.querySelector("form");
form.addEventListener("submit", findCity);

navigator.geolocation.getCurrentPosition(showPosition);

let unitCelsius = document.querySelector("#celsius");
unitCelsius.addEventListener("click", displayTemperatureInCelsius);

let unitFahrenheit = document.querySelector("#fahrenheit");
unitFahrenheit.addEventListener("click", displayTemperatureInFahrenheit);

let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let h4 = document.querySelector("h4");
h4.innerHTML = `${day}, ${hour}:${minutes}`;
