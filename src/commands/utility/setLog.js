const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} = require('discord.js');
const global = require('../../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlog')
        .setDescription('Set new log channel.')
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('Log channel to display timeouts.'),
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const guildId = interaction.guild.id;

        const channel = interaction.options.getChannel('channel');
        if (!channel) {
            return interaction.reply({
                content: `No channel specified, the current channel is ${global.logChannel}`,
                flags: MessageFlags.Ephemeral,
            });
        }

        global.logChannel[guildId] = channel;
        return interaction.reply({
            content: `The log channel has been set to ${channel}.`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
