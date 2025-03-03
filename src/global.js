let guilds = [];
let messages = {};
let logChannel = {};

module.exports = {
    timeoutLength: {},
    defaultTimeoutLength: 5,
    logChannel,
    checkingTime: {},
    defaultCheckingTime: 2,
    messages,
    getGuilds: () => guilds,
    addGuild: (guildId) => {
        if (!guilds.some(guild => guild[0] === guildId && (guild[1] === true || guild[1] === false))) {
            guilds.push([guildId, false, true]);
            messages[guildId] = [];
        }
    }
};