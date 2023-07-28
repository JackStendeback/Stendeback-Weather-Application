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
        .then((data) => console.log(data));

    },
    displayWeather: function(data) {

    }
};

