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
        if (!guilds.some(guild => guild[0] === guildId)) {
            guilds.push([guildId, false, true, false]);
            messages[guildId] = [];
        }
    }
};
