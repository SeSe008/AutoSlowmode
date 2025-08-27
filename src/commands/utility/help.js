const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} = require('discord.js');
const { getGuilds } = require('../../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays help for AutoSlowmode.'),

    async execute(interaction) {
        return interaction.reply({
            content:
                "Check the help at the bot's [website](https://sese008.github.io/AutoSlowmode/)",
            flags: MessageFlags.Ephemeral,
        });
    },
};
