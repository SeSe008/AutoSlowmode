const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} = require('discord.js');
const { getGuilds } = require('../../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggleinviteblock')
        .setDescription('Toggle the invite block.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const guildId = interaction.guild.id;
        const guild = getGuilds().find((g) => g[0] === guildId);

        if (!guild) {
            await interaction.reply({
                content: 'Guild not found.',
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        guild[3] = !guild[3];

        return interaction.reply({
            content: `The invite block was ${guild[3] ? 'enabled' : 'disabled'}.`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
