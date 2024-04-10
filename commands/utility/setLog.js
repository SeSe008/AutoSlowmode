const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const global = require('../../global.js');

/*const botOwnerId = '813744649440722956';


function isAdminOrOwner(member) {
    return member.permissions.has(PermissionFlagsBits.Administrator) || member.id === botOwnerId;
}*/

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlog')
        .setDescription('Set new log channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addChannelOption(option => option.setName('channel').setDescription('The channel to log timeouts in.')),
        
    async execute(interaction) {
        /*if (!isAdminOrOwner(interaction.member)) {
            await interaction.reply({content: 'You do not have permission to use this command.', ephemeral: true});
            return;
        }*/

        const channel = interaction.options.getChannel('channel');
        if (!channel) {
            return interaction.reply({ content: `No channel specified, the current channel is ${global.logChannel}`, ephemeral: true });
        }

        global.logChannel = channel;
        return interaction.reply({ content: `The log channel has been set to ${channel}.`, ephemeral: true });
    },
};