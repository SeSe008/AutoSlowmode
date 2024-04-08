const { Events } = require('discord.js');
const { time } = require('node:console');
const fs = require('node:fs');
const global = require('../global.js');

var deltimeouts = {};

function deletemessageinjson(id, messages) {
    let deltimeout = setTimeout(() => {
        delete messages[`${id}`];
        fs.writeFile("./messages.json", JSON.stringify(messages), (error) => {
            if (error) {
                console.log(error);
                return;
            }
        });
    }, 2000);
    deltimeouts[`${id}`] = deltimeout;
}

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        if (message.author.bot) return;

       fs.readFile("./messages.json", "utf8", (error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            messages = JSON.parse(data);
            let author = message.author;

            if (messages[`${author.id}`] && message.channel.id !== messages[`${author.id}`]) {
                message.guild.members.fetch(author.id)
                .then(user => {
                  user.timeout(global.timeoutLength * 1000, 'Avoid spamming.')
                  .then(() => {
                    if (global.logChannel) {
                        global.logChannel.send(`User ${author} has been timed out for ${global.timeoutLength} seconds for possible spamming.`);
                    };
                  })
                  .catch(console.error)
                })
                .catch(console.error);
            }
            else if (messages[`${author.id}`] && message.channel.id === messages[`${author.id}`]) {
                clearTimeout(deltimeouts[`${author.id}`]);
                messages[`${author.id}`].message = message.channel.id;
                deletemessageinjson(author.id, messages);
            }
            else {
                messages[`${author.id}`] = message.channel.id;
                deletemessageinjson(author.id, messages);
            }

            fs.writeFile("./messages.json", JSON.stringify(messages), (error) => {
                if (error) {
                    console.log(error);
                    return;
                }
            });
        });
    },
};
