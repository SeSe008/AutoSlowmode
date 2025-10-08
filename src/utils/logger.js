import dotenv from 'dotenv';
dotenv.config();

const ANSI = {
    Reset: '\x1b[0m',

    Red: '\x1b[31m',
    Green: '\x1b[32m',
    Yellow: '\x1b[33m',
    Blue: '\x1b[34m',
};

function log(message, color) {
    console.log(
        `[${new Date(Date.now()).toLocaleString()}] ${color}${message}${ANSI.Reset}`,
    );
}

export function error(message) {
    log(`[ERROR] ${message}`, ANSI.Red);
}

export function warning(message) {
    log(`[WARNING] ${message}`, ANSI.Yellow);
}

export function success(message) {
    log(`[SUCESS] ${message}`, ANSI.Green);
}

export function info(message) {
    log(`[INFO] ${message}`, ANSI.Blue);
}

export function debug(message) {
    if (process.env.DEBUG === 'true') log(`[DEBUG] ${message}`, '');
}

export default {
    error,
    warning,
    success,
    info,
    debug,
};
