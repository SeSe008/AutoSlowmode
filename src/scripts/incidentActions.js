const cron = require('node-cron');
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const global = require('../global.js');

function logError(guildId) {
    const logChannel = global.logChannel[guildId];

    if (logChannel) {
        logChannel.send('Could not enable security actions.');
    }
}

async function modifyGuildIncidentActions(guildId, dmsDisabledUntil, invitesDisabledUntil) {
    try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/incident-actions`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bot ${process.env.TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                invites_disabled_until: invitesDisabledUntil,
                dms_disabled_until: dmsDisabledUntil
            })
        });
        if (!response.ok) {
            logError(guildId);
            throw new Error(`[ERROR] Failed to modify incident actions: ${response.statusText}`);
        } else {
            console.log(`[SUCCES] Enabled security actions for ${guildId}`);
        }
        return response.json();
    } catch (error) {
        console.error(`[ERROR] Error modifying incident actions for guild ${guildId}: `, error);
        logError(guildId);
    }
}

async function automateIncidentActions() {
    console.log(`[INFO] Executing incident actions, ${global.getGuilds()}`);
    global.getGuilds().forEach(async guild => {
    	if (guild[1] || guild[3]) {
	    console.log(`[INFO] Executing for Guild ${guild[0]}`);
            const guildId = guild[0];
            const dmsDisabledUntil = guild[1] ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null;
	    const invitesDisabledUntil = guild[3] ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null;
	    await modifyGuildIncidentActions(guildId, dmsDisabledUntil, invitesDisabledUntil);
        }
    });
    console.log('[INFO] Executed incident actions');
}

async function startScript() {
    cron.schedule(
    	'* * * * *',
        automateIncidentActions,
    );
}

module.exports = { startScript }
