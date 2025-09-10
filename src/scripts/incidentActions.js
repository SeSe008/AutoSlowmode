import cron from 'node-cron';

import dotenv from 'dotenv';
dotenv.config();

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

import {
    getGuilds,
    getLogChannelForGuild,
    guildHasDmBlock,
    guildHasInviteBlock,
} from '../global.js';

function logError(guildId) {
    const logChannel = getLogChannelForGuild(guildId);

    if (logChannel) {
        logChannel.send('Could not enable security actions.');
    }
}

async function modifyGuildIncidentActions(
    guildId,
    dmsDisabledUntil,
    invitesDisabledUntil,
) {
    try {
        const response = await fetch(
            `https://discord.com/api/v10/guilds/${guildId}/incident-actions`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    invites_disabled_until: invitesDisabledUntil,
                    dms_disabled_until: dmsDisabledUntil,
                }),
            },
        );
        if (!response.ok) {
            logError(guildId);
            throw new Error(
                `[ERROR] Failed to modify incident actions: ${response.statusText}`,
            );
        } else {
            console.log(`[SUCCES] Enabled security actions for ${guildId}`);
        }
        return response.json();
    } catch (error) {
        console.error(
            `[ERROR] Error modifying incident actions for guild ${guildId}: `,
            error,
        );
        logError(guildId);
    }
}

export async function executeIncidentActionsForGuild(guildId, guild) {
    console.log(`[INFO] Executing for Guild ${guildId}`);

    const invitesDisabledUntil = guildHasInviteBlock(guildId)
        ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        : null;
    const dmsDisabledUntil = guildHasDmBlock(guildId)
        ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        : null;

    modifyGuildIncidentActions(guildId, dmsDisabledUntil, invitesDisabledUntil);
}

async function automateIncidentActions() {
    console.log(`[INFO] Executing incident actions`);

    Object.entries(getGuilds()).forEach(async ([guildId, guild]) => {
        if (guildHasDmBlock(guildId) || guildHasInviteBlock(guildId))
            executeIncidentActionsForGuild(guildId, guild);
    });
    console.log('[INFO] Executed incident actions');
}

export async function startScript() {
    cron.schedule(process.env.INCIDENT_ACTIONS_TIME, automateIncidentActions);
}
