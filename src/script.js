let now = new Date();
//currrent day of the week
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let day = days[now.getDay()];
document.querySelector('#day').innerHTML = day;

//currrent month
let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let month = months[now.getMonth()];
document.querySelector('#month').innerHTML = month;

//currrent date
let date = now.getDate();
document.querySelector('#date').innerHTML = date;

//currrent year
let year = now.getFullYear();
document.querySelector('#year').innerHTML = year;

//currrent time
let hours = now.getHours();
if (hours <= 9) {
  document.querySelector('#hours').innerHTML = '0' + hours;
  document.querySelector('#hours').style.fontWeight = '300';
} else {
  document.querySelector('#hours').innerHTML = hours;
  document.querySelector('#hours').style.fontWeight = '300';
}
let minutes = now.getMinutes();
if (minutes <= 9) {
  document.querySelector('#minutes').innerHTML = '0' + minutes;
  document.querySelector('#minutes').style.fontWeight = '300';
} else {
  document.querySelector('#minutes').innerHTML = minutes;
  document.querySelector('#minutes').style.fontWeight = '300';
}

// Changing units
function convertToFahrenheit(event) {
  let celsiusTemperature = Number(
    document.querySelector('#current-temperature').textContent
  );
  event.preventDefault();
  let currentTemperature = document.querySelector('#current-temperature');
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  let fahrenheitTemperature = Number(
    document.querySelector('#current-temperature').textContent
  );
  event.preventDefault();
  let currentTemperature = document.querySelector('#current-temperature');
  celsiusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector('#fahrenheit');
fahrenheitLink.addEventListener('click', convertToFahrenheit);

let celsiusLink = document.querySelector('#celsius');
celsiusLink.addEventListener('click', convertToCelsius);

// handle icons
function displayImage(icon) {
  let iconPath = "";
  if (icon === `01d`) {
    iconPath = "icons/01d.svg";
  } else if (icon === `01n`) {
    iconPath = 'icons/01n.svg';
  } else if (icon === `02d`) {
    iconPath = 'icons/02d.svg';
  } else if (icon === `02n`) {
    iconPath = 'icons/02n.svg';
  } else if (icon === `03d` || icon === `03n`) {
    iconPath = 'icons/03d.svg';
  } else if (icon === `04d` || icon === `04n`) {
    iconPath = 'icons/04d.svg';
  } else if (icon === `09d` || icon === `09n`) {
    iconPath = 'icons/09d.svg';
  } else if (icon === `10d`) {
    iconPath = 'icons/10d.svg';
  } else if (icon === `10n`) {
    iconPath = 'icons/10n.svg';
  } else if (icon === `11d`) {
    iconPath = 'icons/11d.svg';
  } else if (icon === `11n`) {
    iconPath = 'icons/11n.svg';
  } else if (icon === `13d`) {
    iconPath = 'icons/13d.svg';
  } else if (icon === `13n`) {
    iconPath = 'icons/13n.svg';
  } else if (icon === `50d`) {
    iconPath = 'icons/50d.svg';
  } else if (icon === `50n`) {
    iconPath = 'icons/50n.svg';
  } else {
    iconPath = 'icons/01d.svg';
  }

  return iconPath;
}

//current position:  changing city, country, temperature, condition, humidity, wind speed,, sunrise, sunset
function showTemperature(response) {
  let cityElem = document.querySelector('#city');
  cityElem.innerHTML = `${response.data.name}`;
  cityElem.style.textTransform = 'capitalize';

  let countryElem = document.querySelector('#country');
  countryElem.innerHTML = `${response.data.sys.country}`;

  let tempElem = document.querySelector('#current-temperature');
  tempElem.innerHTML = `${Math.round(response.data.main.temp)}`;

  let descriptionElem = document.querySelector('#description');
  descriptionElem.innerHTML = `${response.data.weather[0].description}`;
  descriptionElem.style.textTransform = 'capitalize';

  let humidityElem = document.querySelector('#humidity');
  humidityElem.innerHTML = `${response.data.main.humidity}`;

  let windElem = document.querySelector('#wind-speed');
  windElem.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let iconElem = document.querySelector('#icon');
  let iconResponse = response.data.weather[0].icon;
  iconElem.setAttribute('src', displayImage(iconResponse));
  iconElem.setAttribute('alt', response.data.weather[0].description);

  //sunrise
  let sunriseElem = document.querySelector('#sunrise');
  function sunrise() {
    let unix_timestamp = response.data.sys.sunrise;
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();
    let formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  }
  let sunriseTime = sunrise();
  sunriseElem.innerHTML = sunriseTime;

  //sunset
  let sunsetElem = document.querySelector('#sunset');
  function sunset() {
    let unix_timestamp = response.data.sys.sunset;
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();
    let formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  }
  let sunsetTime = sunset();
  sunsetElem.innerHTML = sunsetTime;
  console.log(response);
}

function current() {
  function handlePosition(position) {
    let apiKey = 'cde11fcb254a1b6acf6cc464209d076f';
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlCurrent).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentButton = document.querySelector('#current-button');
currentButton.addEventListener('click', current);

//search of a city
function searchCity(city) {
  let apiKey = 'cde11fcb254a1b6acf6cc464209d076f';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#search-input');
  searchCity(searchInput.value);
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSubmit);