import { Events } from 'discord.js';
import { startScript } from '../scripts/incidentActions.js';
import { load } from '../utils/loadGuilds.js';
import { deployCommandsToGuild } from '../utils/deployCommands.js';
import logger from '../utils/logger.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client) {
    // Load joined guilds
    load(client);

    // Start automatic incident actions
    startScript();

    logger.info(`Ready! Logged in as ${client.user.tag}`);

    const guilds = await client.guilds.fetch();

    logger.debug(`Guilds [${guilds.map((g) => `${g.name} (${g.id})`)}]`);

    // Deploy Commands
    guilds.forEach((guild) => {
        deployCommandsToGuild(client.user.id, guild);
    });
}
