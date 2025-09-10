import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} from 'discord.js';
import {
    getGuild,
    guildHasDmBlock,
    toggleDmBlockForGuild,
} from '../../global.js';
import { executeIncidentActionsForGuild } from '../../scripts/incidentActions.js';

export const data = new SlashCommandBuilder()
    .setName('toggledmblock')
    .setDescription('Toggle the dm block, enforced through incident actions.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
    const guildId = interaction.guild.id;

    await toggleDmBlockForGuild(guildId);

    executeIncidentActionsForGuild(guildId, getGuild(guildId));

    return interaction.reply({
        content: `The dm block was ${guildHasDmBlock(guildId) ? 'enabled' : 'disabled'}.`,
        flags: MessageFlags.Ephemeral,
    });
}
