function updateWeatherStats(response) {
  let temperatureItem = document.querySelector("#temperature-item");
  let temp = response.data.temperature.current;
  let cityItem = document.querySelector("#city-item");
  let descriptionItem = document.querySelector("#description");
  let humidityItem = document.querySelector("#humidity");
  let windSpeedItem = document.querySelector("#wind-speed");
  let timeItem = document.querySelector(`#time`);
  let emojiItem = document.querySelector("#emoji");

  let date = new Date(response.data.time * 1000);

  temperatureItem.innerHTML = Math.round(temp);
  cityItem.innerHTML = response.data.city;
  descriptionItem.innerHTML = response.data.condition.description;
  humidityItem.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedItem.innerHTML = `${response.data.wind.speed}km p/h`;
  timeItem.innerHTML = formatDate(date);
  emojiItem.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "7300c6775obt0415fe6635cd0da0d3fe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherStats);
}
function manageSearchRequest(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-bar");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "7300c6775obt0415fe6635cd0da0d3fe";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastItem = document.querySelector("#forecast");
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="day">
            <div>
              <img src="${day.condition.icon_url}" class="forecast-emoji"/>
            </div>
            <div class="forecast-temperatures">
              <div class="forecast-temperature"><strong>${Math.round(
                day.temperature.maximum
              )}°C</strong></div>
              <div class="forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°C</div>
            </div>
            <div class="day-text">${formatDay(day.time)}</div>
          </div>
  `;
    }
  });

  forecastItem.innerHTML = forecastHtml;
}

let searchFormItem = document.querySelector("#search-form");
searchFormItem = addEventListener("submit", manageSearchRequest);

searchCity("Brisbane");
