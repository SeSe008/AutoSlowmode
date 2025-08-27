import { SlashCommandBuilder, MessageFlags } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays help for AutoSlowmode.');
export async function execute(interaction) {
    return interaction.reply({
        content:
            "Check the help at the bot's [website](https://sese008.github.io/AutoSlowmode/)",
        flags: MessageFlags.Ephemeral,
    });
}
