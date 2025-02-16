const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const global = require('../../global.js');

function isAdmin(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setcheckingtime')
        .setDescription('Set new checking time.')
        .addIntegerOption(option => option.setName('time').setDescription('The new checking time in ms.')),
    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            await interaction.reply({ content: 'You do not have permission to use this command.', flags: MessageFlags.Ephemeral });
            return;
        }

        const time = interaction.options.getInteger('time');

        if (!time) {
            return interaction.reply({ content: `No time specified, the current time is ${global.checkingTime/1000}s`, flags: MessageFlags.Ephemeral });
        }

        global.checkingTime[interaction.guild.id] = time * 1000;
        return interaction.reply({ content: `The checking time has been set to ${time}s.`, flags: MessageFlags.Ephemeral });
    },
};