const { getGuilds } = require('../../global.js');
const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');

function isAdmin(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggledmblock')
        .setDescription('Toggle the dm block.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            await interaction.reply({ content: 'You do not have permission to use this command.', flags: MessageFlags.Ephemeral });
            return;
        }

        const guildId = interaction.guild.id;

        const guild = getGuilds().find(g => g[0] === guildId);

        if (!guild) {
            await interaction.reply({ content: 'Guild not found.', flags: MessageFlags.Ephemeral });
            return;
        }

        guild[1] = !guild[1];

        return interaction.reply({ content: `The dm block was ${guild[1] ? "enabled" : "disabled"}.`, flags: MessageFlags.Ephemeral });
    }
}
