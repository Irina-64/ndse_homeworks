// Подключаем необходимые модули
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Создаем интерфейс для чтения пользовательского ввода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Получаем аргументы командной строки
const logFileName = process.argv[2];

// Проверяем наличие аргумента для лог-файла
if (!logFileName) {
    console.error('Ошибка: необходимо указать имя файла для логирования.');
    process.exit(1);
}

// Определяем полный путь к лог-файлу
const logFilePath = path.resolve(__dirname, logFileName);

// Функция для записи в лог-файл
function logToFile(content) {
    fs.appendFile(logFilePath, content + '\n', (err) => {
        if (err) {
            console.error('Ошибка записи в лог-файл:', err);
        }
    });
}

// Функция для генерации случайного числа (1 или 2)
function generateRandom() {
    return Math.floor(Math.random() * 2) + 1;  // 1 — Орел, 2 — Решка
}

// Функция для обработки игры
function playGame() {
    const randomNumber = generateRandom();  // Загаданное число

    rl.question('Угадайте: Орел (1) или Решка (2)? ', (answer) => {
        const userGuess = parseInt(answer);

        if (isNaN(userGuess) || (userGuess !== 1 && userGuess !== 2)) {
            console.log('Некорректный ввод. Введите 1 для Орла или 2 для Решки.');
            logToFile(`Некорректный ввод: ${answer}`);
            playGame();  // Запрашиваем ввод снова
        } else {
            const result = userGuess === randomNumber ? 'Угадали!' : 'Не угадали!';
            console.log(result);

            // Логирование результатов
            const logMessage = `Пользователь выбрал: ${userGuess}, Загаданное число: ${randomNumber}, Результат: ${result}`;
            logToFile(logMessage);

            rl.question('Хотите сыграть еще раз? (y/n): ', (playAgain) => {
                if (playAgain.toLowerCase() === 'y') {
                    playGame();  // Повторная игра
                } else {
                    console.log('Спасибо за игру!');
                    rl.close();
                }
            });
        }
    });
}

// Начинаем игру
playGame();
