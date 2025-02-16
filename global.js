let guilds = [
    '1226071049691594764'
];
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