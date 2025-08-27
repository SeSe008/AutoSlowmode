import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} from 'discord.js';
import {
    getTimeoutLengthForGuild,
    setTimeoutLengthForGuild,
} from '../../global.js';

export const data = new SlashCommandBuilder()
    .setName('timeoutlength')
    .setDescription('Set new timeout length enforced on possible spammers.')
    .addIntegerOption((option) =>
        option
            .setName('length')
            .setDescription('The new length of the timeout in seconds.'),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
    const guildId = interaction.guild.id;
    const length = interaction.options.getInteger('length');

    if (!length) {
        return interaction.reply({
            content: `No length specified, the current length is ${getTimeoutLengthForGuild(guildId)}s`,
            flags: MessageFlags.Ephemeral,
        });
    }

    setTimeoutLengthForGuild(guildId, length);

    return interaction.reply({
        content: `The timeout length has been set to ${length}s.`,
        flags: MessageFlags.Ephemeral,
    });
}
