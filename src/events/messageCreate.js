import { Events } from 'discord.js';
import {
    getMessagesFromGuild,
    addMessageToGuild,
    removeMessageFromGuild,
    getTimeoutCheckLengthForGuild,
    getTimeoutLengthForGuild,
    getLogChannelForGuild,
    guildHasSpamProtection,
} from '../global.js';
var timeouts = 0;

export const name = Events.MessageCreate;
export function execute(message) {
    if (message.author.bot) return;

    const guildId = message.guild.id;
    const author = message.author;

    // Check if spam protection is enabled for this server
    if (!guildHasSpamProtection(guildId)) {
        return;
    }

    const guildMessages = getMessagesFromGuild(guildId);
    const timeOutCheckLength = getTimeoutCheckLengthForGuild(guildId);
    const timeOutLength = getTimeoutLengthForGuild(guildId);
    const logChannel = getLogChannelForGuild(guildId);

    // Check if message was send in a different channel and before checkingTime ran out
    if (
        guildMessages[`${author.id}`] &&
        message.channel.id !== guildMessages[`${author.id}`][0] &&
        Date.now() - guildMessages[`${author.id}`][1] < timeOutCheckLength
    ) {
        message.guild.members
            .fetch(author.id)
            .then((user) => {
                user.timeout(timeOutLength * 1000, 'Possible spam.')
                    .then(() => {
                        timeouts++;
                        console.log(
                            `[INFO] A user was timed out for possible spamming. Total timeouts: ${timeouts}`,
                        );

                        if (logChannel) {
                            logChannel.send(
                                `User ${author} has been timed out for ${timeOutLength} seconds for possible spamming.`,
                            );
                        }
                    })
                    .catch((error) => {
                        console.error(
                            `[ERROR] Error: "${error.rawError.message}" with code: "${error.code}" when timeouting on guild "${guildId}"`,
                        );
                    });
            })
            .catch(console.error);
    } else {
        // Store message
        addMessageToGuild(author.id, message.channel.id, Date.now());

        // Remove message after checkingTime
        setTimeout(() => {
            console.log(
                `[INFO] Removing message in "${message.channel.id}" from guild "${guildId}"`,
            );
            removeMessageFromGuild(guildId, author.id);
        }, timeOutCheckLength);
    }
}
