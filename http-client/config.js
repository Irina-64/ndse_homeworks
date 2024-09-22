const dotenv = require('dotenv');
const path = require('path');

require('dotenv').config(); // Загружаем переменные окружения из .env файла

module.exports = {
	apiKey: process.env.API_KEY || 'default_api_key', // API токен из переменных окружения
	apiUrl: 'http://api.openweathermap.org/data/2.5/weather', // Базовый URL API
	defaultCity: 'Amsterdam', // Город по умолчанию
	units: 'metric' // Единицы измерения (метрическая система)
};
