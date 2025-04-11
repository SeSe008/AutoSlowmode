const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const { getGuilds } = require('../../global.js');

function isAdmin(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggleinviteblock')
        .setDescription('Toggle the invite block.')
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

        guild[3] = !guild[3];i

        return interaction.reply({ content: `The invite block was ${guild[3] ? "enabled" : "disabled"}.`, flags: MessageFlags.Ephemeral });
    }
}
