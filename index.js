const API_KEY = "949e4c52ef067a3db7ee03142743af2a";

async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("weather").innerHTML =
                `<p style="color:red">${data.message}</p>`;
            return;
        }

        document.getElementById("weather").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <p>${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
        `;
    } catch (error) {
        document.getElementById("weather").innerHTML =
            `<p style="color:red">Error loading weather data</p>`;
        console.error(error);
    }
}