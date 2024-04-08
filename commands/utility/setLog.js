const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const global = require('../../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlog')
        .setDescription('Set new log channel.')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to log timeouts in.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        if (!channel) {
            return interaction.reply({ content: `No channel specified, the current channel is ${global.logChannel}`, ephemeral: true });
        }

        global.logChannel = channel;
        return interaction.reply({ content: `The log channel has been set to ${channel}.`, ephemeral: true });
    },
};