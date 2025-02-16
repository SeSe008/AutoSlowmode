const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const global = require('../../global.js');

function isAdmin(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlog')
        .setDescription('Set new log channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addChannelOption(option => option.setName('channel').setDescription('The channel to log timeouts in.')),
        
    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            await interaction.reply({ content: 'You do not have permission to use this command.', flags: MessageFlags.Ephemeral });
            return;
        }

        const guildId = interaction.guild.id;

        const channel = interaction.options.getChannel('channel');
        if (!channel) {
            return interaction.reply({ content: `No channel specified, the current channel is ${global.logChannel}`, flags: MessageFlags.Ephemeral });
        }

        global.logChannel[guildId] = channel;
        return interaction.reply({ content: `The log channel has been set to ${channel}.`, flags: MessageFlags.Ephemeral });
    },
};