const axios = require("axios");

axios.get("http://localhost:3000/weather")
    .then(response => {
        console.log("Weather Data:", response.data);
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
    });
