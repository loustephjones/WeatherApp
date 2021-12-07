function citySearch(event) {
  event.preventDefault()
}

function displayCurrentTemp(response) {
  let temp = response.data.main.temp
  document.querySelection()
}

let weatherType = ['Sun', 'Rain', 'Cloud', 'Snow']

new Date()
let now = new Date()

let date = now.getDate()
let hours = now.getHours()
let minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
let seconds = now.getSeconds()
let year = now.getFullYear()

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
let day = days[now.getDay()]

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Augusut',
  'September',
  'October',
  'November',
  'December',
]
let month = months[now.getMonth()]

let h3 = document.querySelector('h3')
h3.innerHTML = `${day}, ${date} ${month}, ${year}`
let h4 = document.querySelector('h4')
h4.innerHTML = `${hours}:${minutes}`

// function convertToC() {
// let fTemp = 68
// let cTemp = Math.round(((fTemp - 32) * 5) / 9)
// let h2 = document.querySelector('h2')
// h2.innerHTML = `${cTemp}°C`
// }

// WEATHER API

function displayForecast(response) {
  let forecastElement = document.querySelector('#forecast') // selecting element
  // row
  let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  let forecastHTML = `<div class="row">`
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 19° </span>
                  <span class="weather-forecast-temperature-min"> 12° </span>
                </div>
              </div>
            `
  })
  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML
}

function getForecast(coordinates) {
  console.log(coordinates)
  let apiKey = '270ea88a43eb3b55ea7828fd11903447'
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`

  axios.get(apiUrl).then(displayForecast)
}

function showTemp(response) {
  console.log(response)
  let cityName = response.data.name
  let h1 = document.querySelector('h1')
  let countryName = response.data.sys.country
  let p = document.querySelector('p')
  p.innerHTML = countryName
  h1.innerHTML = cityName
  let iconElement = document.querySelector('#icon')
  let temp = document.querySelector('h2')
  temp.innerHTML = `${Math.round(response.data.main.temp)}°C`
  let weatherDesc = document.querySelector('h6')
  weatherDesc.innerHTML = `The weather today is...${response.data.weather[0].description}`
  let humidity = response.data.main.humidity
  let humidityDisplay = document.querySelector('#humidity')
  humidityDisplay.innerHTML = `Humidity:  ${humidity}%`
  let windSpeedData = response.data.wind.speed
  let windDisplay = document.querySelector('#windSpeed')
  windDisplay.innerHTML = `Wind speed: ${windSpeedData} km/h`
  celsiusTemp = response.data.main.temp
  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  )

  getForecast(response.data.coord)
}

function citySearch(city) {
  let apiKey = '270ea88a43eb3b55ea7828fd11903447'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp)
}

function buttonSubmit(event) {
  event.preventDefault()
  let city = document.querySelector('#search-text-input').value
  citySearch(city)
}

let form = document.querySelector('#search-bar')
form.addEventListener('submit', buttonSubmit)

function showPosition(position) {
  let apiKey = '270ea88a43eb3b55ea7828fd11903447'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemp)
}
navigator.geolocation.getCurrentPosition(showPosition)

function currentTemps(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(showPosition)
}

let button = document.querySelector('#currentLoc')
button.addEventListener('click', currentTemps)

function showFarenheitTemp(event) {
  event.preventDefault
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32
  let temp = document.querySelector('h2')
  temp.innerHTML = `${Math.round(farenheitTemp)}°F`
}
function showCelsiusTemp(event) {
  event.preventDefault
  let temp = document.querySelector('h2')
  temp.innerHTML = `${Math.round(celsiusTemp)}°C`
}

let celsiusTemp = null

let FarenheitLink = document.querySelector('#farenheit')
FarenheitLink.addEventListener('click', showFarenheitTemp)

let celsiusLink = document.querySelector('#celsius')
celsiusLink.addEventListener('click', showCelsiusTemp)

citySearch('Canterbury')
