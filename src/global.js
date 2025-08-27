import { writeFileSync, existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getuid } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BACKUP_PATH = join(__dirname, '../guilds_backup.json');

// Guilds-Structure
/*
    {
        guild {
     	    messages: {
	        authorId: [channelId, date]
	    },
	    logChannel: string,
	    timeoutCheckLength: number,
	    timeoutLength: number,

	    spamProtection: boolean,
	    inviteBlock: boolean,
	    dmBlock: boolean
        }
    }
*/
let guilds = {};

const defaultTimeoutLength = 5000;
const defaultTimeoutCheckLength = 2000;

// Save a persistent backup of configurations from guilds
function saveBackup() {
    const backupData = {
        guilds,
    };
    writeFileSync(
        BACKUP_PATH,
        JSON.stringify(
            backupData,
            (key, value) => {
                if (key === 'messages') return undefined; // skip messages
                return value;
            },
            2,
        ),
    );
}

function loadBackup() {
    if (existsSync(BACKUP_PATH)) {
        const backupData = JSON.parse(readFileSync(BACKUP_PATH));
        guilds = backupData.guilds ?? {};
    }
}

// Load
loadBackup();

// Save
process.on('exit', saveBackup);
process.on('SIGINT', () => {
    saveBackup();
    process.exit();
});

process.on('SIGTERM', () => {
    saveBackup();
    process.exit();
});

export const getGuilds = () => guilds;
export const getGuild = (guildId) => guilds[guildId];
export const addGuild = (guildId) => {
    if (!guilds[guildId]) {
        guilds[guildId] = {
            spamProtection: true,
        };
    }
};

export const getMessagesFromGuild = (guildId) =>
    guilds[guildId]?.messages || {};
export const addMessageToGuild = (guildId, authorId, channelId, date) => {
    if (guilds[guildId]) {
        guilds[guildId].messages = {
            ...(guilds[guildId].messages || {}),
            [authorId]: [channelId, date],
        };
    }
};
export const removeMessageFromGuild = (guildId, authorId) =>
    delete guilds[guildId]?.messages?.[authorId];

export const getLogChannelForGuild = (guildId) => guilds[guildId]?.logChannel;
export const setLogChannelForGuild = (guildId, channel) =>
    guilds[guildId] && (guilds[guildId].logChannel = channel);

export const getTimeoutCheckLengthForGuild = (guildId) =>
    guilds[guildId]?.timeoutCheckLength ?? defaultTimeoutCheckLength;
export const setTimeoutCheckLengthForGuild = (guildId, length) =>
    guilds[guildId] && (guilds[guildId].timeoutCheckLength = length);

export const getTimeoutLengthForGuild = (guildId) =>
    guilds[guildId]?.timeoutLength || defaultTimeoutLength;
export const setTimeoutLengthForGuild = (guildId, length) =>
    guilds[guildId] && (guilds[guildId].timeoutLength = length);

export const guildHasSpamProtection = (guildId) =>
    guilds[guildId]?.spamProtection;
export const toggleSpamProtectionForGuild = (guildId) =>
    guilds[guildId] &&
    (guilds[guildId].spamProtection = !guilds[guildId].spamProtection);

export const guildHasInviteBlock = (guildId) => guilds[guildId]?.inviteBlock;
export const toggleInviteBlockForGuild = (guildId) =>
    guilds[guildId] &&
    (guilds[guildId].inviteBlock = !guilds[guildId].inviteBlock);

export const guildHasDmBlock = (guildId) => guilds[guildId]?.dmBlock;
export const toggleDmBlockForGuild = (guildId) =>
    guilds[guildId] && (guilds[guildId].dmBlock = !guilds[guildId].dmBlock);
