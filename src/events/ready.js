import { Events } from 'discord.js';
import { startScript } from '../scripts/incidentActions.js';
import { load } from '../utils/loadGuilds.js';
import { deployCommandsToGuild } from '../utils/deployCommands.js';

export const name = Events.ClientReady;
export const once = true;
export function execute(client) {
    // Load joined guilds
    load(client);

    // Start automatic incident actions
    startScript();

    console.log(`[INFO] Ready! Logged in as ${client.user.tag}`);

    // Deploy Commands
    client.guilds.cache.forEach((guild) => {
        deployCommandsToGuild(client.user.id, guild);
    });
}
