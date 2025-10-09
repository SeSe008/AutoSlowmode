import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} from 'discord.js';
import { getLogChannelForGuild, setLogChannelForGuild } from '../../global.js';
import { getClient } from '../../index.js';

export const data = new SlashCommandBuilder()
    .setName('setlog')
    .setDescription('Set new log channel.')
    .addChannelOption((option) =>
        option
            .setName('channel')
            .setDescription('Log channel to display timeouts.'),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
export async function execute(interaction) {
    const guildId = interaction.guild.id;
    const channel = interaction.options.getChannel('channel');
    const current_channel = getLogChannelForGuild(guildId)
        ? await getClient().channels.fetch(getLogChannelForGuild(guildId))
        : 'none';

    if (!channel) {
        return interaction.reply({
            content: `No channel specified, the current channel is ${current_channel}`,
            flags: MessageFlags.Ephemeral,
        });
    }

    setLogChannelForGuild(guildId, channel.id);

    return interaction.reply({
        content: `The log channel has been set to ${channel}.`,
        flags: MessageFlags.Ephemeral,
    });
}
