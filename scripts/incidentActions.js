const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { token } = require("../config.json");
const global = require('../global.js');

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
                'Authorization': `Bot ${token}`,
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
        }
        return response.json();
    } catch (error) {
        console.error(`Error modifying incident actions for guild ${guildId}:`, error);
        logError(guildId);
        throw error;
    }
}

async function automateIncidentActions() {
    global.guilds.forEach(async guildId => {
        const dmsDisabledUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        const response = await modifyGuildIncidentActions(guildId, dmsDisabledUntil);

        console.log(response);

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