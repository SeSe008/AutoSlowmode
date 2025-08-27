import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} from 'discord.js';
import {
    guildHasInviteBlock,
    toggleInviteBlockForGuild,
} from '../../global.js';

export const data = new SlashCommandBuilder()
    .setName('toggleinviteblock')
    .setDescription(
        'Toggle the invite block, enforced through incident actions.',
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
    const guildId = interaction.guild.id;

    toggleInviteBlockForGuild(guildId);

    return interaction.reply({
        content: `The invite block was ${guildHasInviteBlock(guildId) ? 'enabled' : 'disabled'}.`,
        flags: MessageFlags.Ephemeral,
    });
}
