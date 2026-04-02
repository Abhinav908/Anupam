// OpenWeatherMap API integration
const apiKey = 'YOUR_API_KEY';

// Fetch weather data based on location
async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        handleError(error);
    }
}

// Display weather data on the dashboard
function displayWeather(data) {
    if (data && data.weather) {
        console.log(`Weather in ${data.name}: ${data.weather[0].description}`);
    } else {
        console.log('No weather data available.');
    }
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(`${lat},${lon}`);
        }, handleError);
    } else {
        handleError(new Error('Geolocation is not supported by this browser.'));
    }
}

// Error handling function
function handleError(error) {
    console.error('Error:', error);
}