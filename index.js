#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

// Получение текущей даты и времени
const getCurrentDate = () => new Date();

// Функции для добавления или вычитания времени
const addTime = (date, unit, value) => {
    const newDate = new Date(date);
    switch (unit) {
        case 'year':
            newDate.setFullYear(newDate.getFullYear() + value);
            break;
        case 'month':
            newDate.setMonth(newDate.getMonth() + value);
            break;
        case 'day':
            newDate.setDate(newDate.getDate() + value);
            break;
        default:
            break;
    }
    return newDate;
};

const subTime = (date, unit, value) => addTime(date, unit, -value);

// Определение аргументов командной строки с помощью yargs
yargs(hideBin(process.argv))
    .command(
        'current',
        'Get the current date and time',
        (yargs) => {
            return yargs
                .option('year', {
                    alias: 'y',
                    describe: 'Get the current year',
                    type: 'boolean',
                })
                .option('month', {
                    alias: 'm',
                    describe: 'Get the current month',
                    type: 'boolean',
                })
                .option('date', {
                    alias: 'd',
                    describe: 'Get the current date',
                    type: 'boolean',
                });
        },
        (argv) => {
            const currentDate = getCurrentDate();
            if (argv.year) {
                console.log(currentDate.getFullYear());
            } else if (argv.month) {
                console.log(currentDate.getMonth() + 1); // Месяцы считаются с 0
            } else if (argv.date) {
                console.log(currentDate.getDate());
            } else {
                console.log(currentDate.toISOString());
            }
        }
    )
    .command(
        'add',
        'Add time to the current date',
        (yargs) => {
            return yargs
                .option('year', {
                    alias: 'y',
                    describe: 'Add years',
                    type: 'number',
                })
                .option('month', {
                    alias: 'm',
                    describe: 'Add months',
                    type: 'number',
                })
                .option('day', {
                    alias: 'd',
                    describe: 'Add days',
                    type: 'number',
                });
        },
        (argv) => {
            let date = getCurrentDate();
            if (argv.year) {
                date = addTime(date, 'year', argv.year);
            }
            if (argv.month) {
                date = addTime(date, 'month', argv.month);
            }
            if (argv.day) {
                date = addTime(date, 'day', argv.day);
            }
            console.log(date.toISOString());
        }
    )
    .command(
        'sub',
        'Subtract time from the current date',
        (yargs) => {
            return yargs
                .option('year', {
                    alias: 'y',
                    describe: 'Subtract years',
                    type: 'number',
                })
                .option('month', {
                    alias: 'm',
                    describe: 'Subtract months',
                    type: 'number',
                })
                .option('day', {
                    alias: 'd',
                    describe: 'Subtract days',
                    type: 'number',
                });
        },
        (argv) => {
            let date = getCurrentDate();
            if (argv.year) {
                date = subTime(date, 'year', argv.year);
            }
            if (argv.month) {
                date = subTime(date, 'month', argv.month);
            }
            if (argv.day) {
                date = subTime(date, 'day', argv.day);
            }
            console.log(date.toISOString());
        }
    )
    .help()
    .argv;