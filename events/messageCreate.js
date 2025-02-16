const { Events } = require('discord.js');
const global = require('../global.js');
var timeouts = 0;


module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        if (message.author.bot) return;

        const guildId = message.guild.id;
        const author = message.author;

        const guildMessages = global.messages[guildId];
        
        // Check if message was send in a different channel and before checkingTime ran out
        if (
            guildMessages[`${author.id}`] &&
            message.channel.id !== guildMessages[`${author.id}`][0] &&
            Date.now() - guildMessages[`${author.id}`][1] < global.checkingTime[guildId]
        ) {
            message.guild.members.fetch(author.id)
            .then(user => {
              user.timeout(global.timeoutLength[guildId] * 1000, 'Avoid spamming.')
              .then(() => {
                timeouts++
                console.log(`User ${author} has been timed out for ${global.timeoutLength} seconds for possible spamming. This was the ${(timeouts > 1) ? ((timeouts > 2) ? timeouts + "th" : 'second') : "first"} timeout by AutoSlowmode`)

                const logChannel = global.logChannel[guildId];
                if (logChannel) {
                    logChannel.send(`User ${author} has been timed out for ${global.timeoutLength} seconds for possible spamming.`);
                };
              })
              .catch(console.error)
            })
            .catch(console.error);
        }
        else {
            // Add new message
            guildMessages[`${author.id}`] = [message.channel.id, Date.now()];
        }
    },
};
