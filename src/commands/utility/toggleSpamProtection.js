import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} from 'discord.js';
import {
    guildHasSpamProtection,
    toggleSpamProtectionForGuild,
} from '../../global.js';

export const data = new SlashCommandBuilder()
    .setName('togglespamprotection')
    .setDescription('Toggle the spam-protection for a server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
    const guildId = interaction.guild.id;

    toggleSpamProtectionForGuild(guildId);

    return interaction.reply({
        content: `The dm block was ${guildHasSpamProtection(guildId) ? 'enabled' : 'disabled'}.`,
        flags: MessageFlags.Ephemeral,
    });
}
