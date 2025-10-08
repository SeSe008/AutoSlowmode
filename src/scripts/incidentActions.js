import cron from 'node-cron';

import dotenv from 'dotenv';
dotenv.config();

import logger from '../utils/logger.js';

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

import {
    getGuilds,
    getLogChannelForGuild,
    guildHasDmBlock,
    guildHasInviteBlock,
} from '../global.js';
import { getClient } from '../index.js';

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
            logger.error(
                `Failed to modify incident actions for guild ${guildId}: ${response.statusText}`,
            );
        } else {
            logger.success(`Enabled security actions for ${guildId}`);
        }
        return response.json();
    } catch (error) {
        logger.error(
            `Error modifying incident actions for guild ${guildId}: ${error}`,
        );
        logError(guildId);
    }
}

export async function executeIncidentActionsForGuild(guildId) {
    const invitesDisabledUntil = guildHasInviteBlock(guildId)
        ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        : null;
    const dmsDisabledUntil = guildHasDmBlock(guildId)
        ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        : null;

    logger.info(
        `Executing ${[guildHasInviteBlock(guildId) && 'Invite Block', guildHasDmBlock(guildId) && 'Dm Block'].filter(Boolean).join(' and ')} for Guild "${(await getClient().guilds.fetch(guildId)).name}" (${guildId})`,
    );

    modifyGuildIncidentActions(guildId, dmsDisabledUntil, invitesDisabledUntil);
}

async function automateIncidentActions() {
    logger.info(`Executing incident actions`);

    Object.entries(getGuilds()).forEach(async ([guildId, guild]) => {
        if (guildHasDmBlock(guildId) || guildHasInviteBlock(guildId))
            executeIncidentActionsForGuild(guildId, guild);
    });

    logger.info('Executed incident actions');
}

export async function startScript() {
    cron.schedule(process.env.INCIDENT_ACTIONS_TIME, automateIncidentActions);
}
