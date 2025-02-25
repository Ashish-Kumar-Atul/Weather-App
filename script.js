document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('search_input');
    const searchIcon = document.getElementById('search_icon');
    const displayWeather = document.getElementById('weather_report');
    const sunny = document.getElementById('sunny');
    const cloudyRain = document.getElementById('cloudy_rain');
    const cloudy = document.getElementById('cloudy');
    const temperature = document.getElementById('temperature');
    const cityName = document.getElementById('city_name');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind_speed');
    const displayError = document.getElementById('error');

    const apiKey = "92a543aa2358f0898e3d029a67069bd4";

    searchIcon.addEventListener('click', async () => {
        const city = searchInput.value.trim();
        if (!city) {
            alert("Enter a city");
            return;
        }
        try {
            const weatherData = await getWeather(city);
            showWeather(weatherData);
        } catch (error) {
            console.error("Error fetching weather:", error);
            showError();
        }
    });

    searchInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const city = searchInput.value.trim();
            if (!city) {
                alert("Enter a city");
                return;
            }
            try {
                const weatherData = await getWeather(city);
                showWeather(weatherData);
            } catch (error) {
                console.error("Error fetching weather:", error);
                showError();
            }
        }
    });
    

    async function getWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    }

    function showWeather(data) {
        // console.log("Weather Data:", data);   // Full data comming from API server
        const { name, weather, main, wind } = data;

        cityName.textContent = name;
        temperature.textContent = `${main.temp}°C`;
        humidity.textContent = `${main.humidity}%`;
        windSpeed.textContent = `${wind.speed} Km/h`;

        displayWeather.classList.remove('hidden');
        displayError.classList.add('hidden');

        if(weather[0].main==="rain"){
            cloudyRain.classList.remove('hidden');
            cloudyRain.classList.add('hidden');
            sunny.classList.add('hidden');
        }else if(weather[0].main==="Clouds" || weather[0].main==="haze" || weather[0].main==="Mist"){
            sunny.classList.add('hidden');
            cloudyRain.classList.add('hidden');
            cloudy.classList.remove('hidden');
        }
        else{
            sunny.classList.remove('hidden');
            cloudyRain.classList.add('hidden');
            cloudy.classList.add('hidden');
        }
    }

    function showError() {
        displayWeather.classList.add('hidden');
        displayError.classList.remove('hidden');
    }
});