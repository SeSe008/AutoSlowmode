const { Events } = require('discord.js');
const { time } = require('node:console');
const fs = require('node:fs');
const global = require('../global.js');
var timeouts = 0;


module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        if (message.author.bot) return;


        let author = message.author;
        if (global.messages[`${author.id}`] && message.channel.id !== global.messages[`${author.id}`][0] && Date.now() - global.messages[`${author.id}`][1] < global.checkingTime) {
            message.guild.members.fetch(author.id)
            .then(user => {
              user.timeout(global.timeoutLength * 1000, 'Avoid spamming.')
              .then(() => {
                timeouts++
                console.log(`User ${author} has been timed out for ${global.timeoutLength} seconds for possible spamming. This was the ${(timeouts > 1) ? ((timeouts > 2) ? timeouts + "th" : 'second') : "first"} timeout by AutoSlowmode`)
                if (global.logChannel) {
                    timeouts++;
                    global.logChannel.send(`User ${author} has been timed out for ${global.timeoutLength} seconds for possible spamming.`);
                };
              })
              .catch(console.error)
            })
            .catch(console.error);
        }
        else {
            global.messages[`${author.id}`] = [message.channel.id, Date.now()];
        }
    },
};
