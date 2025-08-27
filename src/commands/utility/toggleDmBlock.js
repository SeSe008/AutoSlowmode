const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} = require('discord.js');
const { getGuilds } = require('../../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggledmblock')
        .setDescription('Toggle the dm block.')
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

        guild[1] = !guild[1];

        return interaction.reply({
            content: `The dm block was ${guild[1] ? 'enabled' : 'disabled'}.`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
