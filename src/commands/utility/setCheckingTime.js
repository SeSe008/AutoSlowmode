const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    MessageFlags,
} = require('discord.js');
const global = require('../../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setcheckingtime')
        .setDescription('Set new checking time.')
        .addIntegerOption((option) =>
            option
                .setName('time')
                .setDescription('The new checking time in seconds.'),
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const time = interaction.options.getInteger('time');

        if (!time) {
            return interaction.reply({
                content: `No time specified, the current time is ${global.checkingTime}s`,
                flags: MessageFlags.Ephemeral,
            });
        }

        global.checkingTime[interaction.guild.id] = time;
        return interaction.reply({
            content: `The checking time has been set to ${time}s.`,
            flags: MessageFlags.Ephemeral,
        });
    },
};
