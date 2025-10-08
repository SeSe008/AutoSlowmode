import { Events } from 'discord.js';
import { deployCommandsToGuild } from '../utils/deployCommands.js';
import ļogger from '../utils/logger.js';

export const name = Events.GuildCreate;
export async function execute(guild, client) {
    logger.info(`Joined new guild: "${guild.name}" (${guild.id})`);

    // Deploy commands
    await deployCommandsToGuild(client.user.id, guild);
}
