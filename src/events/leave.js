import { Events } from 'discord.js';
import logger from '../utils/logger.js';

export let name = Events.GuildDelete;
export async function execute(guild) {
    logger.info(`Left guild ${guild.name} (${guild.id})`);
}
