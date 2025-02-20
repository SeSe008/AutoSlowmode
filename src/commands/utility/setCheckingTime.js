const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const global = require('../../global.js');

function isAdmin(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setcheckingtime')
        .setDescription('Set new checking time.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addIntegerOption(option => option.setName('time').setDescription('The new checking time in seconds.')),
    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            await interaction.reply({ content: 'You do not have permission to use this command.', flags: MessageFlags.Ephemeral });
            return;
        }

        const time = interaction.options.getInteger('time');

        if (!time) {
            return interaction.reply({ content: `No time specified, the current time is ${global.checkingTime}s`, flags: MessageFlags.Ephemeral });
        }

        global.checkingTime[interaction.guild.id] = time;
        return interaction.reply({ content: `The checking time has been set to ${time}s.`, flags: MessageFlags.Ephemeral });
    },
};