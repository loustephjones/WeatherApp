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

function showTemp(response) {
  celsiusTemperature = response.data.main.temp
  let cityName = response.data.name
  let h1 = document.querySelector('h1')
  h1.innerHTML = cityName
  let temp = document.querySelector('h2')
  temp.innerHTML = `${Math.round(response.data.main.temp)}`
  let weatherDesc = document.querySelector('h6')
  weatherDesc.innerHTML = `The weather today is...${response.data.weather[0].description}`
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

function showPosition(response) {
  let apiKey = '270ea88a43eb3b55ea7828fd11903447'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemp)
}

function currentTemps(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(showPosition)
}

let button = document.querySelector('#currentLoc')
button.addEventListener('click', currentTemps)

navigator.geolocation.getCurrentPosition(showPosition)

function showFarenheitTemp(event) {
  event.preventDefault
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32
  let temp = document.querySelector('h2')
  temp.innerHTML = Math.round(farenheitTemp)
}
let celsiusTemperature = null

let FarenheitLink = document.querySelector('#farenheit')
FarenheitLink.addEventListener('click', showFarenheitTemp)

citySearch('New York')
