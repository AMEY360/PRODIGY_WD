const apiKey = '850f0ff1af16e6176428284cc68aa0d9'; // Replace with your own OpenWeatherMap API key
const weatherDisplay = document.getElementById('weatherDisplay');
const forecastDisplay = document.getElementById('forecastDisplay');
const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('locationInput');
const loader = document.getElementById('loader');
const appContainer = document.getElementById('appContainer');

document.addEventListener('DOMContentLoaded', getUserLocation);
searchBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function showLoader() {
    loader.classList.remove('hidden');
    weatherDisplay.innerHTML = '';
    forecastDisplay.innerHTML = '';
}

function hideLoader() {
    loader.classList.add('hidden');
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, () => {
            weatherDisplay.innerHTML = '<p>Unable to fetch your location. Please search manually.</p>';
        });
    } else {
        weatherDisplay.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
    }
}

function fetchWeather(location) {
    showLoader();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message);
            }
            displayWeather(data);
            fetchForecast(data.coord.lat, data.coord.lon);
        })
        .catch(error => {
            hideLoader();
            weatherDisplay.innerHTML = `<p>${error.message}</p>`;
        });
}

function fetchWeatherByCoords(lat, lon) {
    showLoader();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            fetchForecast(lat, lon);
        })
        .catch(error => {
            hideLoader();
            weatherDisplay.innerHTML = `<p>Error fetching weather data.</p>`;
        });
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const animation = getWeatherAnimation(weather[0].main);
    updateBackground(weather[0].main);

    weatherDisplay.innerHTML = `
        <div class="weather-card">
            <h2>${name}</h2>
            <lottie-player src="${animation}" background="transparent" speed="1" loop autoplay></lottie-player>
            <p>${weather[0].main} - ${weather[0].description}</p>
            <p>Temperature: ${main.temp} °C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        </div>
    `;
}

function fetchForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
            hideLoader();
        })
        .catch(error => {
            hideLoader();
            forecastDisplay.innerHTML = `<p>Error fetching forecast data.</p>`;
        });
}

function displayForecast(data) {
    forecastDisplay.innerHTML = '<h3>5-Day Forecast</h3>';
    const forecastContainer = document.createElement('div');
    forecastContainer.className = 'forecast-scroll';

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const animation = getWeatherAnimation(forecast.weather[0].main);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <h4>${date.toDateString().split(' ')[0]}</h4>
            <lottie-player src="${animation}" background="transparent" speed="1" loop autoplay></lottie-player>
            <p>${forecast.weather[0].main}</p>
            <p>${forecast.main.temp} °C</p>
        `;
        forecastDisplay.appendChild(card);
    });
}

function updateBackground(condition) {
    let bgColor;

    switch (condition.toLowerCase()) {
        case 'clear':
            bgColor = 'linear-gradient(to right, #56ccf2, #2f80ed)';
            break;
        case 'clouds':
            bgColor = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
            break;
        case 'rain':
        case 'drizzle':
            bgColor = 'linear-gradient(to right, #00c6ff, #0072ff)';
            break;
        case 'thunderstorm':
            bgColor = 'linear-gradient(to right, #373b44, #4286f4)';
            break;
        case 'snow':
            bgColor = 'linear-gradient(to right, #e0eafc, #cfdef3)';
            break;
        default:
            bgColor = 'linear-gradient(to right, #4facfe, #00f2fe)';
    }

    document.body.style.background = bgColor;
}

function getWeatherAnimation(condition) {
    switch (condition.toLowerCase()) {
        case 'clear':
            return 'https://assets1.lottiefiles.com/packages/lf20_tljjah3b.json';
        case 'clouds':
            return 'https://assets4.lottiefiles.com/private_files/lf30_obidsi0t.json';
        case 'rain':
        case 'drizzle':
            return 'https://assets2.lottiefiles.com/packages/lf20_jmBauI.json';
        case 'thunderstorm':
            return 'https://assets4.lottiefiles.com/private_files/lf30_jmgekfqg.json';
        case 'snow':
            return 'https://assets9.lottiefiles.com/packages/lf20_Wo64nG.json';
        default:
            return 'https://assets1.lottiefiles.com/packages/lf20_tljjah3b.json';
    }
}

function updateBackground(condition) {
    let bgColor;

    switch (condition.toLowerCase()) {
        case 'clear':
            bgColor = 'linear-gradient(270deg, #f7971e, #ffd200)';
            break;
        case 'clouds':
            bgColor = 'linear-gradient(270deg, #bdc3c7, #2c3e50)';
            break;
        case 'rain':
        case 'drizzle':
            bgColor = 'linear-gradient(270deg, #00c6ff, #0072ff)';
            break;
        case 'thunderstorm':
            bgColor = 'linear-gradient(270deg, #373b44, #4286f4)';
            break;
        case 'snow':
            bgColor = 'linear-gradient(270deg, #e0eafc, #cfdef3)';
            break;
        default:
            bgColor = 'linear-gradient(270deg, #4facfe, #00f2fe)';
    }

    document.body.style.background = bgColor;
    document.body.style.backgroundSize = '800% 800%';
    document.body.style.animation = 'gradientShift 20s ease infinite';
}
