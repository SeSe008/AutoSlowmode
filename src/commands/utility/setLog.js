import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} from 'discord.js';
import { getLogChannelForGuild, setLogChannelForGuild } from '../../global.js';

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

    if (!channel) {
        return interaction.reply({
            content: `No channel specified, the current channel is ${getLogChannelForGuild(guildId)}`,
            flags: MessageFlags.Ephemeral,
        });
    }

    setLogChannelForGuild(guildId, channel);

    return interaction.reply({
        content: `The log channel has been set to ${channel}.`,
        flags: MessageFlags.Ephemeral,
    });
}
