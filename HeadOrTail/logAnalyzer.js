const fs = require('fs');
const path = require('path');

// Получаем путь к файлу логов из аргументов командной строки
const logFilePath = process.argv[2];

// Проверяем наличие аргумента для лог-файла
if (!logFilePath) {
    console.error('Ошибка: необходимо указать путь к файлу логов.');
    process.exit(1);
}

// Определяем полный путь к лог-файлу
const absoluteLogFilePath = path.resolve(__dirname, logFilePath);

// Функция для анализа игрового лога
function analyzeLogs(logFilePath) {
    // Чтение файла логов
    fs.readFile(logFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:', err);
            return;
        }

        // Разбиваем лог по строкам
        const logEntries = data.trim().split('\n');

        // Инициализируем переменные для подсчета
        let totalGames = 0;
        let wins = 0;
        let losses = 0;

        // Проходим по каждой строке лога
        logEntries.forEach((entry) => {
            totalGames += 1;
            if (entry.includes('Угадали')) {
                wins += 1;
            } else if (entry.includes('Не угадали')) {
                losses += 1;
            }
        });

        // Рассчитываем процент побед
        const winPercentage = totalGames ? ((wins / totalGames) * 100).toFixed(2) : 0;

        // Вывод результатов в консоль
        console.log('Общее количество партий:', totalGames);
        console.log('Количество выигранных партий:', wins);
        console.log('Количество проигранных партий:', losses);
        console.log('Процент выигранных партий:', winPercentage + '%');
    });
}

// Анализируем лог-файл
analyzeLogs(absoluteLogFilePath);
