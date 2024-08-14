// ! API key
let apiKey = "560c2ccdce8d37ba1086c151dee1cff5";
// ! Get DOM Elements
let locationName = document.querySelector(".location-name");
let locationTime = document.querySelector(".location-time");
let inputhBox = document.querySelector(".search-Box");
let weathers = document.querySelector(".weathers");
let weatherIcons = document.querySelector(".weather-icons");
let minTemprature = document.querySelector(".min-temp");
let maxTemprature = document.querySelector(".max-temp");
let feels = document.querySelector(".feels-degree");
let humidity = document.querySelector(".humidity-degree");
let winds = document.querySelector(".wind-second");
let pressure = document.querySelector(".pressure-hp");
let inputField = document.getElementById("search-box");

// ? Global city declaration
let city = "Pokhara";

// ? function for searchBox
const searchBox = async (e) => {
    e.preventDefault();
    if (city) {
        city = await inputField.value;
        await api();
        inputField.value = "";
    } else {
        alert("Please Enter any location..");
    }
}

// ? function for Country Name
const countryName = async (sys) => {
    let countryCode = await sys.country;
    let country = new Intl.DisplayNames(['en'], { type: 'region' });
    let countryName = country.of(countryCode);
    locationName.textContent = `${city}, ${countryName}`;
}

// ? Function to get date and time
const countryDate = async (date) => {
    let cityDate = new Date(date * 1000);
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    let dates = new Intl.DateTimeFormat('en-US', dateOptions).format(cityDate);
    locationTime.textContent = dates;
}

// ? Weather forecast and icons
const locationWeather = async (weather) => {
    let cityWeather = weather[0].main;
    let weatherIcon = weather[0].icon;
    weathers.textContent = cityWeather;
    weatherIcons.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="Loading.."/>`;
}

// ? Function to get main and wind values
const locationInfo = async (main, wind) => {
    let lowTemp = await main.temp_max;
    let highTemp = await main.temp_min;
    let feelsLike = await main.feels_like;
    let humidityDegree = await main.humidity;
    let pressurehpa = await main.pressure;
    let cityWind = await wind.speed;


    minTemprature.textContent = `${(lowTemp - 273.15).toFixed(2)}`;
    maxTemprature.textContent = `${(highTemp - 273.15).toFixed(2)}`;
    feels.innerHTML = `${(feelsLike - 273.15).toFixed(2)}&#176c`;
    humidity.innerHTML = `${humidityDegree}%`;
    pressure.textContent = `${pressurehpa} hPa`;
    winds.textContent = `${cityWind} m/s`;
}

// ? Function to get weather API data
const api = async () => {
    try {
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        let fetchApi = await fetch(api);
        let originalApi = await fetchApi.json();
        let { dt, main, sys, weather, wind } = originalApi;
        countryName(sys);
        countryDate(dt);
        locationWeather(weather);
        locationInfo(main, wind);
    } catch (error) {
        console.log("City not found");
        locationName.textContent = "City not found";
        locationTime.textContent = "";
        weathers.textContent = "";
        weatherIcons.innerHTML = "";
        minTemprature.textContent = "";
        maxTemprature.textContent = "";
        feels.innerHTML = "";
        humidity.innerHTML = "";
        pressure.textContent = "";
        winds.textContent = "";



    }
}

window.addEventListener("load", api);
inputhBox.addEventListener("submit", searchBox);

