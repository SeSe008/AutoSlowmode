const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const global = require('../../../global.js');

function isAdmin(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeoutlength')
        .setDescription('Set new Timeout length.')
        .addIntegerOption(option => option.setName('length').setDescription('The new length of the timeout in s.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
        
    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            await interaction.reply({ content: 'You do not have permission to use this command.', flags: MessageFlags.Ephemeral });
            return;
        }

        const length = interaction.options.getInteger('length');
        if (!length) {
            return interaction.reply({ content: `No length specified, the current length is ${global.timeoutLength}s`, flags: MessageFlags.Ephemeral });
        }

        global.timeoutLength[interaction.guild.id] = length;
        return interaction.reply({ content: `The timeout length has been set to ${length}s.`, flags: MessageFlags.Ephemeral });
    },
};