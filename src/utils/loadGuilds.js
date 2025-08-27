import { addGuild } from '../global.js';

// Load joined guilds
export function load(client) {
    const Guilds = client.guilds.cache.map((guild) => guild.id);
    Guilds.forEach((guildId) => {
        addGuild(guildId);
    });
}
