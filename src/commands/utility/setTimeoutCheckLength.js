import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} from 'discord.js';
import {
    getTimeoutCheckLengthForGuild,
    setTimeoutCheckLengthForGuild,
} from '../../global.js';

export const data = new SlashCommandBuilder()
    .setName('settimeoutchecklength')
    .setDescription(
        'Set the time-interval needed for enacting spam protection.',
    )
    .addIntegerOption((option) =>
        option
            .setName('time')
            .setDescription('The new checking time in seconds.'),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
    const guildId = interaction.guild.id;
    const time = interaction.options.getInteger('time');

    if (!time) {
        return interaction.reply({
            content: `No time specified, the current time is ${getTimeoutCheckLengthForGuild(guildId) / 1000} seconds`,
            flags: MessageFlags.Ephemeral,
        });
    }

    setTimeoutCheckLengthForGuild(guildId, time * 1000);
    return interaction.reply({
        content: `The checking time has been set to ${time}s.`,
        flags: MessageFlags.Ephemeral,
    });
}
