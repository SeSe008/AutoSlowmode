const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('m')
		.setDescription('Show recent messages'),
	async execute(interaction) {
		fs.readFile("./messages.json", "utf8", (error, data) => {
			if (error) {
				console.error(error);
				return;
			}
			interaction.reply({ content: data, ephemeral: true });
		});
	},
};