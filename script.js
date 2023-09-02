// Defining the weather application, attaching my personal API key, and fetching Open Weather Map url with imperial units instead of kelvin.
let weatherApp = {
    "apiKey": "a0d11f0271bb0d4bc1457a691cebeb38",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=imperial&appid=" 
        + this.apiKey
    )
    // using .then to gather a response, parse it with json, and console log to test if weather data comes through, which it does when city paremeter is entered.
        .then((response) => response.json())
        .then((data) => this.presentWeather(data));

    },
    presentWeather: function(data) {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, temp, humidity, speed);
        
        // Adding query selectors to connect html classes to js/weather api, so when user searches for a city, correct information is shown on the screen.
        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText = "Temp: " + temp + " °F";
        document.querySelector(".wind").innerText = "Wind: " + speed + " MPH";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
        
        
    },
    // This function fetches weather data when entered into the search bar
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// Added event listener to search bar button, so when prompted with a search request, relevant data is brought up on screen.
document.querySelector(".search-btn").addEventListener("click", function() {
    weatherApp.search();
})

// Added event for keyup(pressing enter on keyboard) so data shows up just like if you pressed the "Search" button.
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weatherApp.search();
    }
});

let forecastApp = {
    apiKey: "a0d11f0271bb0d4bc1457a691cebeb38", 
    fetchForecast: function(city) { 
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${this.apiKey}`)
        .then(response => response.json())
        .then(data => this.presentForecast(data));
    },
    presentForecast: function(data) {
        const forecasts = data.list;
        const forecastContainer = document.querySelector('.forecast-container');
        forecastContainer.innerHTML = '';
        
        let dateTemps = {};
        const currentDate = new Date().toLocaleDateString();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        const futureDateString = futureDate.toLocaleDateString();
    
        for (let i = 0; i < forecasts.length; i++) {
            const forecast = forecasts[i];
            const temp = forecast.main.temp;
            const date = new Date(forecast.dt * 1000).toLocaleDateString();
    
            if (date !== futureDateString) { // Skip the sixth day's data
                if (!dateTemps[date]) {
                    dateTemps[date] = [];
                }
                
                dateTemps[date].push(temp);
            }
        }
    
        for (const [date, temps] of Object.entries(dateTemps)) {
            const high = Math.max(...temps).toFixed(1);
            const low = Math.min(...temps).toFixed(1);
            const main = forecasts.find(f => new Date(f.dt * 1000).toLocaleDateString() === date).weather[0].main;
            const description = forecasts.find(f => new Date(f.dt * 1000).toLocaleDateString() === date).weather[0].description;
            
            forecastContainer.innerHTML += `
                <div class="forecast-item">
                    <div class="date">${date}</div>
                    <div class="main">${main}</div>
                    <div class="high">High: ${high} °F</div>
                    <div class="low">Low: ${low} °F</div>
                </div>
            `;
        }
    },
    search: function() {
        this.fetchForecast(document.querySelector(".search-bar").value);  // Fixed the function name
    }
};

document.querySelector(".search-btn").addEventListener("click", function() {
    weatherApp.search();
    forecastApp.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        weatherApp.search();
        forecastApp.search();
    }
});