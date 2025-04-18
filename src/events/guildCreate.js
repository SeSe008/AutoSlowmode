const { Events } = require('discord.js');
const { deployCommandsToGuild } = require('../utils/deployCommands');

module.exports = {
    name: Events.GuildCreate,
    async execute(guild, client) {
	console.log(`[INFO] Joined new guild: ${guild.name} (${guildId})`);

	// Deploy commands
	await deployCommandsToGuild(client.user.id, guild);
    }
};
