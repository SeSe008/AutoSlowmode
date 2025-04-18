const { Events } = require('discord.js');
const global = require('../global.js');
var timeouts = 0;


module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        if (message.author.bot) return;

        const guildId = message.guild.id;
        const author = message.author;

        // Check if spam protection is enabled for this server
        if (!global.getGuilds().find(g => g[0] === guildId)){
            return;
        }

        const guildMessages = global.messages[guildId];
        const checkingTime = global.checkingTime[guildId] ? global.checkingTime[guildId] : global.defaultCheckingTime;
        const timeoutLength = global.timeoutLength[guildId] ? global.checkingTime.timeoutLength[guildId] : global.defaultTimeoutLength;

        // Check if message was send in a different channel and before checkingTime ran out
        if (
            guildMessages[`${author.id}`] &&
            message.channel.id !== guildMessages[`${author.id}`][0] &&
            Date.now() - guildMessages[`${author.id}`][1] < checkingTime * 1000
        ) {
            message.guild.members.fetch(author.id)
            .then(user => {
		user.timeout(timeoutLength * 1000, 'Possible spam.')
		    .then(() => {
			timeouts++
			console.log(`[INFO] A user was timed out for possible spamming. Total timeouts: ${timeouts}`)

			const logChannel = global.logChannel[guildId];
			if (logChannel) {
			    logChannel.send(`User ${author} has been timed out for ${timeoutLength} seconds for possible spamming.`);
			};
		    })
		    .catch(error => {
			console.error(`[ERROR] Error: "${error.rawError.message}" with code: "${error.code}" when timeouting on guild "${guildId}"`)
		    });
	    })
	    .catch(console.error);
        }
        else {
            // Store message
            guildMessages[`${author.id}`] = [message.channel.id, Date.now()];

	    // Remove message after checkingTime
	    setTimeout(() => {
		console.log(`[INFO] Removing message in "${channel.id}" from guild "${guildId}"`); 
		guildMessages.shift();
	    }, checkingTime * 1000);
        }
    },
};
