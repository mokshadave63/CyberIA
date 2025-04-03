require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const WEATHER_API_KEY = process.env.WEATHER_API_KEY; 

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        if (!city) return res.status(400).json({ error: 'City name is required' });

        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER_API_KEY}`;
        const geoResponse = await axios.get(geoUrl);
        
        if (!geoResponse.data.length) return res.status(404).json({ error: 'City not found' });

        const { lat, lon } = geoResponse.data[0];

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
        const weatherResponse = await axios.get(weatherUrl);

        res.json(weatherResponse.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
