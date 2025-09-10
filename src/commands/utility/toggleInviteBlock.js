import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} from 'discord.js';
import {
    getGuild,
    guildHasInviteBlock,
    toggleInviteBlockForGuild,
} from '../../global.js';
import { executeIncidentActionsForGuild } from '../../scripts/incidentActions.js';

export const data = new SlashCommandBuilder()
    .setName('toggleinviteblock')
    .setDescription(
        'Toggle the invite block, enforced through incident actions.',
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
    const guildId = interaction.guild.id;

    await toggleInviteBlockForGuild(guildId);

    executeIncidentActionsForGuild(guildId, getGuild(guildId));

    return interaction.reply({
        content: `The invite block was ${guildHasInviteBlock(guildId) ? 'enabled' : 'disabled'}.`,
        flags: MessageFlags.Ephemeral,
    });
}
