// Current: temp_c, feelsLike_c, wind_kph, condition:, text, icon
// Location: country, localtime, name

async function getWeatherData (search) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f3ec47f4f1d0499f94e195153230304&q=${search}&aqi=no`, { mode: 'cors' })
  const weatherData = await response.json()
  weatherDataNeeded(weatherData)
}

function weatherDataNeeded (data) {
  const dataNeeded = {
    temp: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    wind: data.current.wind_kph,
    text: data.current.condition.text,
    icon: data.current.condition.icon,
    country: data.location.country,
    time: data.location.localtime,
    city: data.location.name
  }
  console.log(dataNeeded)
  return displayData(dataNeeded)
}

function userSearch () {
  const userInput = document.querySelector('input').value
  userInput.toString()
  getWeatherData(userInput)
}

function displayData (data) {
  document.querySelector('.location__city').innerText = data.city
  document.querySelector('.location__country').innerText = data.country
  document.querySelector('.location__time').innerText = 'Current time: ' + data.time
  document.querySelector('.weather__icon').src = data.icon
  document.querySelector('.weather__text').innerText = data.text
  document.querySelector('.weather__temp').innerText = data.temp + ' °C'
  document.querySelector('.weather__feelslike').innerText = 'Feels like: ' + data.feelsLike + ' °C'
  document.querySelector('.weather__wind').innerText = 'Wind: ' + data.wind + ' Km/h'
}

(function searchListener () {
  document.querySelector('button').addEventListener('click', userSearch)
})()
