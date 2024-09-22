const http = require('http');
const url = require('url');
const config = require('./config');
const apiKey = config.apiToken;
const baseUrl = config.baseUrl;

// Получаем название города из аргументов командной строки
const city = process.argv[2];

if (!city) {
	console.error('Ошибка: необходимо указать название города.');
	process.exit(1);
}

// Формируем URL для запроса к API погоды
const requestUrl = `${baseUrl}?q=${city}&appid=${apiKey}&units=${config.units}`;

// Отправляем запрос к API погоды
http.get(requestUrl, (res) => {
	let data = '';

	// Получаем данные по частям
	res.on('data', (chunk) => {
		data += chunk;
	});

	// Обрабатываем полученные данные после завершения запроса
	res.on('end', () => {
		try {
			const weatherData = JSON.parse(data);

			if (weatherData.cod !== 200) {
				console.error(`Ошибка: ${weatherData.message}`);
				return;
			}

			// Выводим информацию о погоде в указанном городе
			console.log(`Прогноз погоды для города: ${weatherData.name}`);
			console.log(`Температура: ${weatherData.main.temp}°C`);
			console.log(`Погодные условия: ${weatherData.weather[0].description}`);
			console.log(`Влажность: ${weatherData.main.humidity}%`);
			console.log(`Скорость ветра: ${weatherData.wind.speed} м/с`);
		} catch (error) {
			console.error('Ошибка обработки данных:', error.message);
		}
	});
}).on('error', (err) => {
	console.error('Ошибка соединения:', err.message);
});
