const fs = require('fs');
const path = require('path');

const backupFilePath = path.join(__dirname, '../guilds_backup.json');

let guilds = [];
let messages = {};
let logChannel = {};

// Save a persistent backup of configurations from guilds
function saveBackup() {
    const backupData = {
        guilds,
        messages,
        logChannel
    };
    fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2));
}

function loadBackup() {
    if (fs.existsSync(backupFilePath)) {
        const backupData = JSON.parse(fs.readFileSync(backupFilePath));
        guilds = backupData.guilds || [];
        messages = backupData.messages || {};
        logChannel = backupData.logChannel || {};
    }
}

// Load
loadBackup();

// Save
process.on('exit', saveBackup);
process.on('SIGINT', () => { saveBackup(); process.exit(); });
process.on('SIGTERM', () => { saveBackup(); process.exit(); });

module.exports = {
    timeoutLength: {},
    defaultTimeoutLength: 5,
    logChannel,
    checkingTime: {},
    defaultCheckingTime: 2,
    messages,
    getGuilds: () => guilds,
    addGuild: (guildId) => {
        if (!guilds.some(guild => guild[0] === guildId)) {
            guilds.push([guildId, false, true, false]);
            messages[guildId] = [];
        }
    }
};
