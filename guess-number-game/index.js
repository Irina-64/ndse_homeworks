#!/usr/bin/env node

const readline = require('readline');

// Создаем интерфейс для ввода и вывода в консоль
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для генерации случайного числа в заданном диапазоне
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Начало игры
const startGame = () => {
    const min = 0;
    const max = 100;
    const secretNumber = getRandomNumber(min, max);

    console.log(`Загадано число в диапазоне от ${min} до ${max}. Попробуйте угадать!`);

    // Функция для запроса числа у пользователя
    const askGuess = () => {
        rl.question('Введите ваше число: ', (input) => {
            const guess = parseInt(input, 10);

            if (isNaN(guess)) {
                console.log('Пожалуйста, введите корректное число.');
                askGuess();
            } else if (guess < secretNumber) {
                console.log('Больше');
                askGuess();
            } else if (guess > secretNumber) {
                console.log('Меньше');
                askGuess();
            } else {
                console.log(`Поздравляю! Вы угадали число: ${secretNumber}`);
                rl.close();
            }
        });
    };

    // Начинаем игру с первого запроса числа
    askGuess();
};

// Запускаем игру
startGame();
