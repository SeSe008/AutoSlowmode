const { Events } = require('discord.js');
const incidentActions = require('../scripts/incidentActions.js');
const loadGuilds = require('../utils/loadGuilds.js');
const { deployCommandsToGuild } = require('../utils/deployCommands');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
	// Load joined guilds
	loadGuilds.load(client);
	
	// Start the auto dm-ban.
	incidentActions.startScript();

	console.log(`[INFO] Ready! Logged in as ${client.user.tag}`);

	// Deploy Commands
	client.guilds.cache.forEach(guild => {
	    deployCommandsToGuild(client.user.id, guild);
	})
    },
};
