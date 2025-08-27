import { Events } from 'discord.js';
import { deployCommandsToGuild } from '../utils/deployCommands.js';

export const name = Events.GuildCreate;
export async function execute(guild, client) {
    console.log(`[INFO] Joined new guild: ${guild.name} (${guild.id})`);

    // Deploy commands
    await deployCommandsToGuild(client.user.id, guild);
}
