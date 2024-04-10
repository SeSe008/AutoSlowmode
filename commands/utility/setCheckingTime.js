const { SlashCommandBuilder } = require('@discordjs/builders');
const global = require('../../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setcheckingtime')
        .setDescription('Set new checking time.')
        .addIntegerOption(option => option.setName('time').setDescription('The new checking time in ms.')),
    async execute(interaction) {
        const time = interaction.options.getInteger('time');
        if (!time) {
            return interaction.reply({ content: `No time specified, the current time is ${global.checkingTime/1000}s`, ephemeral: true });
        }

        global.checkingTime = time * 1000;
        return interaction.reply({ content: `The checking time has been set to ${time}s.`, ephemeral: true });
    },
};