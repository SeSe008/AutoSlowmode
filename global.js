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
        if (!guilds.includes(guildId)) {
            guilds.push(guildId);
            messages[guildId] = [];
        }
    }
};