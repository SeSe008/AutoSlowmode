require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const global = require('../../global.js');

function logError(guildId) {
    const logChannel = global.logChannel[guildId];

    if (logChannel) {
        logChannel.send('Could not enable security actions.');
    }
}

async function modifyGuildIncidentActions(guildId, dmsDisabledUntil) {
    try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/incident-actions`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bot ${process.env.TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                invites_disabled_until: null,
                dms_disabled_until: dmsDisabledUntil
            })
        });
        if (!response.ok) {
            logError(guildId);
            throw new Error(`Failed to modify incident actions: ${response.statusText}`);
        } else {
            console.log(`Enabled security actions for ${guildId}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error modifying incident actions for guild ${guildId}:`, error);
        logError(guildId);
    }
}

async function automateIncidentActions() {
    global.getGuilds().forEach(async guildId => {
        const dmsDisabledUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        await modifyGuildIncidentActions(guildId, dmsDisabledUntil);

        if (global.logChannel[guildId]) {
            global.logChannel[guildId].send(`DMs disabled until: ${response.dms_disabled_until}`);    
        } 
    });
}

async function startScript() {
    await automateIncidentActions();
    setInterval(automateIncidentActions, 24 * 60 * 60 * 1000);
}

module.exports = { startScript }