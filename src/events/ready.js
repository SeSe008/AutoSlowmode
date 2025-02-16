const { Events } = require('discord.js');
const incidentActions = require('../scripts/incidentActions.js');
const loadGuilds = require('../scripts/loadGuilds.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		// Load joined guilds
		loadGuilds.load(client)

		// Start the auto dm-ban.
		incidentActions.startScript();

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
