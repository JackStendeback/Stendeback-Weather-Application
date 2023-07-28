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
        
        
    }
};

