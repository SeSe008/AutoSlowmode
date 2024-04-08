const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const global = require('../../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeoutlength')
        .setDescription('Set new Timeout length.')
        .addIntegerOption(option => option.setName('length').setDescription('The new length of the timeout in s.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        
    async execute(interaction) {
        const length = interaction.options.getInteger('length');
        if (!length) {
            return interaction.reply({ content: `No length specified, the current length is ${global.timeoutLength}ms`, ephemeral: true });
        }

        global.timeoutLength = length;
        return interaction.reply({ content: `The timeout length has been set to ${length}ms.`, ephemeral: true });
    },
};